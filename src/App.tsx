import {
  createContext,
  lazy,
  Suspense,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import {
  invitationContent,
  type InvitationContent,
} from "./content/invitation";
import ornamentNusantara from "./assets/ornament-nusantara.svg";
import {
  clearStoredDashboardContent,
  cloneInvitationContent,
  DASHBOARD_MAX_VERSIONS,
  persistDashboardContent,
  persistDashboardVersions,
  readStoredDashboardContent,
  readStoredDashboardVersions,
  type DashboardVersion,
} from "./lib/dashboard";
import {
  firebaseAuth,
  getFirebaseDb,
  isFirebaseConfigured,
} from "./lib/firebase";

const loadDashboardModule = () => import("./components/AdminDashboard");

const DashboardLoginPage = lazy(async () => {
  const module = await loadDashboardModule();

  return { default: module.DashboardLoginPage };
});

const DashboardPage = lazy(async () => {
  const module = await loadDashboardModule();

  return { default: module.DashboardPage };
});

type RsvpFormData = {
  guestName: string;
  email: string;
  attendance: string;
  guestCount: string;
  mealPreference: string;
  dietaryNotes: string;
  songRequest: string;
};

type FormErrors = Partial<Record<keyof RsvpFormData, string>>;

type RsvpSubmission = {
  formData: RsvpFormData;
  submissionMode: "firebase" | "local";
};

type AppShellProps = {
  authLoading: boolean;
  currentContent: InvitationContent;
  currentUser: User | null;
  contentRevision: number;
  onDashboardLogin: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  onDashboardLogout: () => Promise<void>;
  onPublishContent: (nextContent: InvitationContent) => void;
  onResetContent: () => void;
  onRestoreVersion: (versionId: string) => void;
  onSaveVersion: (nextContent: InvitationContent, note: string) => void;
  versions: DashboardVersion[];
};

const RSVP_DRAFT_KEY = "wedding-invitation.rsvp-draft";
const RSVP_SUBMITTED_KEY = "wedding-invitation.rsvp-submitted";
const InvitationContentContext =
  createContext<InvitationContent>(invitationContent);

const defaultRsvpForm: RsvpFormData = {
  guestName: "",
  email: "",
  attendance:
    invitationContent.rsvp.attendanceOptions[0]?.value ?? "joyfully-accepts",
  guestCount: "1",
  mealPreference:
    invitationContent.rsvp.mealOptions[0]?.value ?? "chef-selection",
  dietaryNotes: "",
  songRequest: "",
};

function useInvitationContent() {
  return useContext(InvitationContentContext);
}

function buildRsvpMailto(details: RsvpFormData, content: InvitationContent) {
  if (!content.rsvp.contactEmail.trim()) {
    return null;
  }

  const attendanceLabel =
    content.rsvp.attendanceOptions.find(
      (item) => item.value === details.attendance,
    )?.label ?? details.attendance;
  const mealLabel =
    content.rsvp.mealOptions.find(
      (item) => item.value === details.mealPreference,
    )?.label ?? details.mealPreference;

  const subject = `Konfirmasi Kehadiran - ${details.guestName}`;
  const body = [
    `Nama: ${details.guestName}`,
    `Email: ${details.email}`,
    `Kehadiran: ${attendanceLabel}`,
    `Jumlah Tamu: ${details.guestCount}`,
    `Pilihan Menu: ${mealLabel}`,
    `Catatan Makanan: ${details.dietaryNotes || "Tidak ada"}`,
    `Permintaan Lagu: ${details.songRequest || "Tidak ada"}`,
  ].join("\n");

  return `mailto:${content.rsvp.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function readStoredRsvp(key: string): RsvpFormData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return null;
  }

  try {
    return {
      ...defaultRsvpForm,
      ...(JSON.parse(raw) as Partial<RsvpFormData>),
    };
  } catch {
    return null;
  }
}

function readStoredRsvpSubmission() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(RSVP_SUBMITTED_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as RsvpSubmission | Partial<RsvpFormData>;

    if ("formData" in parsed && parsed.formData) {
      return {
        formData: {
          ...defaultRsvpForm,
          ...parsed.formData,
        },
        submissionMode:
          parsed.submissionMode === "firebase" ? "firebase" : "local",
      } satisfies RsvpSubmission;
    }

    return {
      formData: {
        ...defaultRsvpForm,
        ...(parsed as Partial<RsvpFormData>),
      },
      submissionMode: "local",
    } satisfies RsvpSubmission;
  } catch {
    return null;
  }
}

function useCountdownParts(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const distance = Math.max(new Date(targetIso).getTime() - now, 0);
  const totalSeconds = Math.floor(distance / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function currentStepLabel(pathname: string, content: InvitationContent) {
  if (pathname === "/dashboard") {
    return "Dasbor";
  }

  if (pathname === "/dashboard/login") {
    return "Masuk Dasbor";
  }

  return (
    content.navigation.find((item) => item.to === pathname)?.label ?? "Beranda"
  );
}

function CountdownCell({ label, value }: { label: string; value: number }) {
  return (
    <article className="countdown-cell">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </article>
  );
}

function WelcomePage() {
  const content = useInvitationContent();
  const countdown = useCountdownParts(content.event.isoDate);
  const venueLines = [
    content.event.venue.name,
    ...content.event.venue.addressLines,
  ].filter(Boolean);
  const summaryHighlights =
    content.invitationSummary.highlights.filter(Boolean);
  const summaryHeadline =
    content.invitationSummary.headline || "Detail acara akan segera diperbarui";

  return (
    <main className="page-grid">
      <section className="hero-layout page-span">
        <div className="hero-panel panel">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <img
            className="hero-ornament"
            src={ornamentNusantara}
            alt="Ornamen geometris bernuansa Nusantara dan islami"
          />
          <h2 className="hero-heading">
            {content.couple.partnerOne.first}{" "}
            <span>{content.hero.titleAccent}</span>{" "}
            {content.couple.partnerTwo.first}
          </h2>
          <p className="lede">{content.hero.lede}</p>
          <div className="hero-actions">
            <Link className="primary-action" to={content.hero.primaryCta.href}>
              {content.hero.primaryCta.label}
            </Link>
            <Link
              className="secondary-action"
              to={content.hero.secondaryCta.href}
            >
              {content.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <aside className="invitation-card panel">
          <p className="card-label">{content.invitationSummary.label}</p>
          <div className="card-divider"></div>
          <p className="card-date">{content.event.dateLabel}</p>
          <h3>{summaryHeadline}</h3>
          {venueLines.length > 0 ? (
            <p>{venueLines.join(", ")}</p>
          ) : (
            <p className="panel-note">
              Detail lokasi akan kami perbarui dalam waktu dekat.
            </p>
          )}
          {summaryHighlights.length > 0 ? (
            <ul className="moment-list">
              {summaryHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </aside>
      </section>

      <section className="panel countdown-panel">
        <p className="section-tag">{content.countdown.sectionTag}</p>
        <h2>{content.countdown.title}</h2>
        <p>{content.countdown.body}</p>
        <div className="countdown-grid">
          <CountdownCell label="Hari" value={countdown.days} />
          <CountdownCell label="Jam" value={countdown.hours} />
          <CountdownCell label="Menit" value={countdown.minutes} />
          <CountdownCell label="Detik" value={countdown.seconds} />
        </div>
      </section>

      <section className="panel story-panel">
        <p className="section-tag">{content.story.sectionTag}</p>
        <h2>{content.story.title}</h2>
        <p>{content.story.body}</p>
      </section>
    </main>
  );
}

function CelebrationPage() {
  const content = useInvitationContent();

  return (
    <main className="page-grid">
      <section className="panel details-panel">
        <p className="section-tag">{content.details.sectionTag}</p>
        <h2>{content.details.title}</h2>
        <div className="detail-grid">
          {content.details.items.map((item) => (
            <article key={item.id}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="panel schedule-panel">
        <p className="section-tag">{content.schedule.sectionTag}</p>
        <h2>{content.schedule.title}</h2>
        <ol className="schedule-list">
          {content.schedule.items.map((item) => (
            <li key={item.id}>
              <p className="schedule-time">{item.time}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel gallery-panel page-span">
        <p className="section-tag">{content.gallery.sectionTag}</p>
        <h2>{content.gallery.title}</h2>
        <p>{content.gallery.body}</p>
        <div className="gallery-grid">
          {content.gallery.items.map((item) => (
            <article key={item.id} className="gallery-card">
              <div className="gallery-swatch" aria-hidden="true"></div>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function GuestGuidePage() {
  const content = useInvitationContent();
  const hasVenueDetails = Boolean(
    content.event.venue.name.trim() || content.event.venue.city.trim(),
  );
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${content.event.venue.name} ${content.event.venue.city}`,
  )}`;

  return (
    <main className="page-grid">
      <section className="panel map-panel page-span">
        <p className="section-tag">{content.guestGuide.sectionTag}</p>
        <h2>{content.guestGuide.title}</h2>
        <p>{content.guestGuide.body}</p>
        {hasVenueDetails && content.guestGuide.mapLabel ? (
          <a
            className="primary-action inline-action"
            href={mapHref}
            target="_blank"
            rel="noreferrer"
          >
            {content.guestGuide.mapLabel}
          </a>
        ) : (
          <p className="panel-note">
            Tautan peta akan kami tambahkan setelah lokasi dipastikan.
          </p>
        )}
        <div className="guide-grid">
          {content.guestGuide.groups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul className="guide-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel registry-panel">
        <p className="section-tag">{content.registry.sectionTag}</p>
        <h2>{content.registry.title}</h2>
        <p>{content.registry.body}</p>
        <div className="registry-grid">
          {content.registry.items.map((item) => (
            <article key={item.id}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel contact-panel">
        <p className="section-tag">Bantuan</p>
        <h2>Memerlukan bantuan sebelum hari acara?</h2>
        <p>
          Pertanyaan mengenai lokasi, busana, atau pembaruan konfirmasi dapat
          disampaikan melalui kontak panitia berikut.
        </p>
        {content.rsvp.questionEmail.trim() ? (
          <a
            className="secondary-action inline-action"
            href={`mailto:${content.rsvp.questionEmail}?subject=Pertanyaan%20Undangan`}
          >
            Hubungi Panitia
          </a>
        ) : (
          <p className="panel-note">
            Kontak panitia akan kami tambahkan kemudian.
          </p>
        )}
      </section>
    </main>
  );
}

function RsvpPage() {
  const content = useInvitationContent();
  const navigate = useNavigate();
  const hasQuestionEmail = Boolean(content.rsvp.questionEmail.trim());
  const [formData, setFormData] = useState<RsvpFormData>(() => {
    return readStoredRsvp(RSVP_DRAFT_KEY) ?? defaultRsvpForm;
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(RSVP_DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!formData.guestName.trim()) {
      nextErrors.guestName = "Mohon isi nama lengkap Anda.";
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      nextErrors.email = "Mohon isi alamat email yang valid.";
    }

    if (!formData.attendance) {
      nextErrors.attendance = "Mohon pilih konfirmasi kehadiran.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const normalized = {
      ...formData,
      guestCount:
        formData.attendance === "regretfully-declines"
          ? "0"
          : formData.guestCount,
    };

    setErrors({});
    setSubmissionError(null);
    setIsSubmitting(true);

    let submissionMode: RsvpSubmission["submissionMode"] = "local";

    try {
      if (isFirebaseConfigured) {
        await addDoc(collection(getFirebaseDb(), "rsvps"), {
          ...normalized,
          couple: content.couple.displayName,
          eventDate: content.event.fullDateLabel,
          createdAt: serverTimestamp(),
        });
        submissionMode = "firebase";
      }

      const storedSubmission: RsvpSubmission = {
        formData: normalized,
        submissionMode,
      };

      window.localStorage.setItem(
        RSVP_SUBMITTED_KEY,
        JSON.stringify(storedSubmission),
      );
      navigate("/thanks", { state: storedSubmission });
    } catch (error) {
      console.error(error);
      setSubmissionError(
        "Konfirmasi belum dapat dikirim ke daftar tamu bersama. Silakan selesaikan pengaturan Firebase pada .env dan Firestore, lalu coba kembali.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-grid">
      <section className="panel rsvp-panel page-span">
        <p className="section-tag">{content.rsvp.sectionTag}</p>
        <h2>{content.rsvp.title}</h2>
        {content.rsvp.deadlineLabel ? (
          <p className="panel-note">{content.rsvp.deadlineLabel}</p>
        ) : null}
        <p>{content.rsvp.body}</p>
        <p className="panel-note">{content.rsvp.formNote}</p>
        {submissionError ? (
          <p className="panel-note">{submissionError}</p>
        ) : null}

        <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Nama Tamu</span>
            <input
              type="text"
              value={formData.guestName}
              onChange={(event) =>
                setFormData({ ...formData, guestName: event.target.value })
              }
            />
            {errors.guestName ? <small>{errors.guestName}</small> : null}
          </label>

          <label>
            <span>Alamat Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>

          <label>
            <span>Kehadiran</span>
            <select
              value={formData.attendance}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  attendance: event.target.value,
                  guestCount:
                    event.target.value === "regretfully-declines"
                      ? "0"
                      : formData.guestCount,
                })
              }
            >
              {content.rsvp.attendanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Jumlah Tamu</span>
            <select
              value={formData.guestCount}
              disabled={formData.attendance === "regretfully-declines"}
              onChange={(event) =>
                setFormData({ ...formData, guestCount: event.target.value })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>

          <label>
            <span>Pilihan Menu</span>
            <select
              value={formData.mealPreference}
              onChange={(event) =>
                setFormData({ ...formData, mealPreference: event.target.value })
              }
            >
              {content.rsvp.mealOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field-span">
            <span>Catatan Makanan</span>
            <textarea
              rows={4}
              value={formData.dietaryNotes}
              onChange={(event) =>
                setFormData({ ...formData, dietaryNotes: event.target.value })
              }
            />
          </label>

          <label>
            <span>Permintaan Lagu</span>
            <input
              type="text"
              value={formData.songRequest}
              onChange={(event) =>
                setFormData({ ...formData, songRequest: event.target.value })
              }
            />
          </label>

          <label>
            <span>Kontak Penerima RSVP</span>
            <input
              type="text"
              value={content.rsvp.contactEmail || "Belum diatur"}
              readOnly
            />
          </label>

          <div className="form-actions field-span">
            <button
              className="primary-action button-reset"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim konfirmasi..." : "Lanjut ke Ringkasan"}
            </button>
            {hasQuestionEmail ? (
              <a
                className="secondary-action"
                href={`mailto:${content.rsvp.questionEmail}?subject=Pertanyaan%20Undangan`}
              >
                Ajukan Pertanyaan
              </a>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}

function ThanksPage() {
  const content = useInvitationContent();
  const location = useLocation();
  const submission =
    (location.state as RsvpSubmission | null) ?? readStoredRsvpSubmission();
  const details = submission?.formData ?? null;
  const submissionHref =
    submission?.submissionMode === "local" && details
      ? buildRsvpMailto(details, content)
      : null;

  return (
    <main className="page-grid">
      <section className="panel thanks-panel page-span">
        <p className="section-tag">Ringkasan</p>
        <h2>Terima kasih atas konfirmasinya</h2>
        <p>
          {submission?.submissionMode === "firebase"
            ? "Konfirmasi kehadiran Anda telah dikirim ke daftar tamu bersama dan juga tersimpan di perangkat ini untuk ditinjau kembali."
            : "Ringkasan konfirmasi Anda telah tersimpan di perangkat ini. Hubungkan formulir ke layanan RSVP terpusat sebelum undangan dipublikasikan agar data tamu terkumpul di satu tempat."}
        </p>

        {submissionHref ? (
          <p className="panel-note">
            Mode demo: gunakan email otomatis berikut untuk mengirim ringkasan
            konfirmasi ke {content.rsvp.contactEmail}.
          </p>
        ) : null}

        {details ? (
          <div className="summary-grid">
            <article>
              <span>Nama</span>
              <strong>{details.guestName}</strong>
            </article>
            <article>
              <span>Email</span>
              <strong>{details.email}</strong>
            </article>
            <article>
              <span>Kehadiran</span>
              <strong>
                {
                  content.rsvp.attendanceOptions.find(
                    (item) => item.value === details.attendance,
                  )?.label
                }
              </strong>
            </article>
            <article>
              <span>Jumlah Tamu</span>
              <strong>{details.guestCount}</strong>
            </article>
            <article>
              <span>Menu</span>
              <strong>
                {
                  content.rsvp.mealOptions.find(
                    (item) => item.value === details.mealPreference,
                  )?.label
                }
              </strong>
            </article>
            <article>
              <span>Catatan Makanan</span>
              <strong>{details.dietaryNotes || "Tidak ada catatan"}</strong>
            </article>
          </div>
        ) : (
          <p className="panel-note">
            Belum ada ringkasan konfirmasi yang tersimpan. Silakan kirim
            formulir terlebih dahulu.
          </p>
        )}

        <div className="hero-actions">
          {submissionHref ? (
            <a className="primary-action" href={submissionHref}>
              Kirim Email Konfirmasi
            </a>
          ) : null}
          <Link className="primary-action" to="/guest-guide">
            Lanjut ke Panduan Tamu
          </Link>
          <Link className="secondary-action" to="/rsvp">
            Ubah Konfirmasi
          </Link>
        </div>
      </section>
    </main>
  );
}

function RequireDashboardAuth({
  authLoading,
  children,
  currentUser,
}: {
  authLoading: boolean;
  children: ReactNode;
  currentUser: User | null;
}) {
  const location = useLocation();

  if (authLoading) {
    return (
      <main className="page-grid dashboard-page-grid">
        <section className="panel page-span">
          <p className="section-tag">Dasbor</p>
          <h2>Memeriksa akses</h2>
          <p className="panel-note">Sedang memeriksa sesi dasbor saat ini.</p>
        </section>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/dashboard/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}

function DashboardRouteFallback() {
  return (
    <main className="page-grid dashboard-page-grid">
      <section className="panel page-span">
        <p className="section-tag">Dasbor</p>
        <h2>Menyiapkan halaman admin</h2>
        <p className="panel-note">
          Dasbor sedang dimuat terpisah agar halaman undangan publik tetap
          ringan saat pertama dibuka.
        </p>
      </section>
    </main>
  );
}

function AppShell({
  authLoading,
  contentRevision,
  currentContent,
  currentUser,
  onDashboardLogin,
  onDashboardLogout,
  onPublishContent,
  onResetContent,
  onRestoreVersion,
  onSaveVersion,
  versions,
}: AppShellProps) {
  const content = useInvitationContent();
  const location = useLocation();
  const dashboardEntryPath = currentUser ? "/dashboard" : "/dashboard/login";
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="page-shell">
      <header className="site-header panel">
        <div>
          <p className="eyebrow">
            {isDashboardRoute ? "Ruang kerja dasbor" : "Undangan Publik"}
          </p>
          <h1 className="site-title">{content.couple.displayName}</h1>
          <p className="site-subtitle">{content.event.fullDateLabel}</p>
        </div>

        <div className="site-header-actions">
          <img
            className="site-ornament"
            src={ornamentNusantara}
            alt="Ornamen batik geometris bernuansa islami"
          />
          <nav className="site-nav" aria-label="Halaman undangan">
            {content.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="secondary-action" to={dashboardEntryPath}>
            {currentUser ? "Buka Dasbor" : "Masuk Dasbor"}
          </Link>
        </div>

        <p className="route-indicator">
          Halaman saat ini: {currentStepLabel(location.pathname, content)}
        </p>
      </header>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/celebration" element={<CelebrationPage />} />
        <Route path="/guest-guide" element={<GuestGuidePage />} />
        <Route path="/rsvp" element={<RsvpPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route
          path="/dashboard/login"
          element={
            <Suspense fallback={<DashboardRouteFallback />}>
              <DashboardLoginPage
                authLoading={authLoading}
                isFirebaseConfigured={isFirebaseConfigured}
                user={currentUser}
                onLogin={onDashboardLogin}
              />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<DashboardRouteFallback />}>
              <RequireDashboardAuth
                authLoading={authLoading}
                currentUser={currentUser}
              >
                <DashboardPage
                  key={contentRevision}
                  currentContent={currentContent}
                  user={currentUser as User}
                  versions={versions}
                  onPublishContent={onPublishContent}
                  onSaveVersion={onSaveVersion}
                  onRestoreVersion={onRestoreVersion}
                  onResetContent={onResetContent}
                  onLogout={onDashboardLogout}
                />
              </RequireDashboardAuth>
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="footer-note">{content.footerNote}</footer>
    </div>
  );
}

export default function App() {
  const [currentContent, setCurrentContent] = useState<InvitationContent>(
    () => {
      const storedContent = readStoredDashboardContent();

      return storedContent ?? cloneInvitationContent(invitationContent);
    },
  );
  const [versions, setVersions] = useState<DashboardVersion[]>(() =>
    readStoredDashboardVersions(),
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(() => Boolean(firebaseAuth));
  const [contentRevision, setContentRevision] = useState(0);

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setCurrentUser(nextUser);
      setAuthLoading(false);
    });
  }, []);

  function handlePublishContent(nextContent: InvitationContent) {
    const normalized = cloneInvitationContent(nextContent);

    setCurrentContent(normalized);
    setContentRevision((currentValue) => currentValue + 1);
    persistDashboardContent(normalized);
  }

  function handleSaveVersion(nextContent: InvitationContent, note: string) {
    const snapshot: DashboardVersion = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      note: note.trim() || `Draf ${versions.length + 1}`,
      content: cloneInvitationContent(nextContent),
    };
    const nextVersions = [snapshot, ...versions].slice(
      0,
      DASHBOARD_MAX_VERSIONS,
    );

    setVersions(nextVersions);
    persistDashboardVersions(nextVersions);
  }

  function handleRestoreVersion(versionId: string) {
    const nextVersion = versions.find((version) => version.id === versionId);

    if (!nextVersion) {
      return;
    }

    handlePublishContent(nextVersion.content);
  }

  function handleResetContent() {
    const resetContent = cloneInvitationContent(invitationContent);

    clearStoredDashboardContent();
    setCurrentContent(resetContent);
    setContentRevision((currentValue) => currentValue + 1);
  }

  async function handleDashboardLogin(credentials: {
    email: string;
    password: string;
  }) {
    if (!firebaseAuth) {
      throw new Error(
        "Firebase Auth belum siap digunakan. Tambahkan terlebih dahulu nilai proyek Firebase Anda ke .env.",
      );
    }

    await signInWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password,
    );
  }

  async function handleDashboardLogout() {
    if (!firebaseAuth) {
      return;
    }

    await signOut(firebaseAuth);
  }

  return (
    <InvitationContentContext.Provider value={currentContent}>
      <AppShell
        authLoading={authLoading}
        contentRevision={contentRevision}
        currentContent={currentContent}
        currentUser={currentUser}
        onDashboardLogin={handleDashboardLogin}
        onDashboardLogout={handleDashboardLogout}
        onPublishContent={handlePublishContent}
        onResetContent={handleResetContent}
        onRestoreVersion={handleRestoreVersion}
        onSaveVersion={handleSaveVersion}
        versions={versions}
      />
    </InvitationContentContext.Provider>
  );
}
