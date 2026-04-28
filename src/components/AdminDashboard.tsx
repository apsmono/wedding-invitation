import { type FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import type { InvitationContent } from "../content/invitation";
import {
  applyDashboardEditor,
  createDashboardEditor,
  type DashboardEditor,
  type DashboardVersion,
} from "../lib/dashboard";

type DashboardLoginPageProps = {
  authLoading: boolean;
  isFirebaseConfigured: boolean;
  user: User | null;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
};

type DashboardPageProps = {
  currentContent: InvitationContent;
  user: User;
  versions: DashboardVersion[];
  onPublishContent: (nextContent: InvitationContent) => void;
  onSaveVersion: (nextContent: InvitationContent, note: string) => void;
  onRestoreVersion: (versionId: string) => void;
  onResetContent: () => void;
  onLogout: () => Promise<void>;
};

function formatVersionDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}

function updateEditorField(
  editor: DashboardEditor,
  field: keyof DashboardEditor,
  value: string,
) {
  return {
    ...editor,
    [field]: value,
  };
}

export function DashboardLoginPage({
  authLoading,
  isFirebaseConfigured,
  user,
  onLogin,
}: DashboardLoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFirebaseConfigured) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await onLogin({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Tidak dapat masuk menggunakan akun yang diberikan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-grid dashboard-page-grid">
      <section className="panel dashboard-auth-panel page-span">
        <p className="section-tag">Akses Admin</p>
        <h2>Masuk ke dasbor</h2>
        <p>
          Gunakan akun Firebase Authentication untuk mengakses dasbor dan
          mengelola isi undangan.
        </p>

        {!isFirebaseConfigured ? (
          <div className="dashboard-status-card">
            <strong>Pengaturan Firebase diperlukan</strong>
            <p>
              Tambahkan konfigurasi Firebase Web ke `.env` lalu aktifkan metode
              masuk Email/Password di Firebase Authentication sebelum memakai
              dasbor ini.
            </p>
          </div>
        ) : null}

        <form className="dashboard-login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isFirebaseConfigured || authLoading || isSubmitting}
            />
          </label>

          <label>
            <span>Kata Sandi</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isFirebaseConfigured || authLoading || isSubmitting}
            />
          </label>

          {errorMessage ? (
            <p className="dashboard-error">{errorMessage}</p>
          ) : null}

          <div className="dashboard-toolbar">
            <button
              className="primary-action button-reset"
              type="submit"
              disabled={!isFirebaseConfigured || authLoading || isSubmitting}
            >
              {isSubmitting ? "Sedang masuk..." : "Masuk ke Dasbor"}
            </button>
            <Link className="secondary-action" to="/">
              Kembali ke Undangan
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export function DashboardPage({
  currentContent,
  user,
  versions,
  onPublishContent,
  onSaveVersion,
  onRestoreVersion,
  onResetContent,
  onLogout,
}: DashboardPageProps) {
  const [editor, setEditor] = useState(() =>
    createDashboardEditor(currentContent),
  );
  const [versionNote, setVersionNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const previewContent = applyDashboardEditor(currentContent, editor);

  function handleApplyDraft() {
    onPublishContent(previewContent);
    setStatusMessage("Draf berhasil diterapkan pada pratinjau undangan lokal.");
  }

  function handleSaveVersion() {
    onPublishContent(previewContent);
    onSaveVersion(previewContent, versionNote);
    setVersionNote("");
    setStatusMessage("Cadangan versi baru berhasil disimpan.");
  }

  function handleRestore(versionId: string) {
    onRestoreVersion(versionId);
    setStatusMessage("Versi tersimpan berhasil dipulihkan ke draf aktif.");
  }

  async function handleLogout() {
    await onLogout();
  }

  return (
    <main className="page-grid dashboard-page-grid">
      <section className="panel dashboard-overview page-span">
        <div>
          <p className="section-tag">Dasbor</p>
          <h2>Pusat kendali undangan</h2>
          <p>
            Ubah isi undangan, tinjau draf terbaru secara lokal, dan simpan
            versi cadangan yang bisa dipulihkan sewaktu-waktu.
          </p>
        </div>

        <div className="dashboard-meta-grid">
          <article className="dashboard-status-card">
            <span>Masuk sebagai</span>
            <strong>{user.email ?? "Pengguna dasbor"}</strong>
          </article>
          <article className="dashboard-status-card">
            <span>Nama pasangan</span>
            <strong>{previewContent.couple.displayName}</strong>
          </article>
          <article className="dashboard-status-card">
            <span>Versi tersimpan</span>
            <strong>{versions.length}</strong>
          </article>
        </div>

        <div className="dashboard-toolbar">
          <button
            className="primary-action button-reset"
            type="button"
            onClick={handleApplyDraft}
          >
            Terapkan draf
          </button>
          <button
            className="secondary-action button-reset"
            type="button"
            onClick={handleLogout}
          >
            Keluar
          </button>
          <Link className="secondary-action" to="/">
            Buka Undangan Publik
          </Link>
        </div>

        {statusMessage ? <p className="panel-note">{statusMessage}</p> : null}
        <p className="panel-note">
          Perubahan pada dasbor dan versi cadangan saat ini masih tersimpan di
          peramban ini sampai Anda menghubungkannya ke layanan backend.
        </p>
      </section>

      <section className="panel page-span">
        <p className="section-tag">Konten yang Dapat Diedit</p>
        <div className="dashboard-form-grid">
          <label>
            <span>Nama depan mempelai putri</span>
            <input
              type="text"
              value={editor.partnerOneFirst}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "partnerOneFirst",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Nama lengkap mempelai putri</span>
            <input
              type="text"
              value={editor.partnerOneDisplay}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "partnerOneDisplay",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Nama depan mempelai putra</span>
            <input
              type="text"
              value={editor.partnerTwoFirst}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "partnerTwoFirst",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Nama lengkap mempelai putra</span>
            <input
              type="text"
              value={editor.partnerTwoDisplay}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "partnerTwoDisplay",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Judul pasangan</span>
            <input
              type="text"
              value={editor.displayName}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "displayName", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Tanggal ISO acara</span>
            <input
              type="text"
              value={editor.isoDate}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "isoDate", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Tanggal singkat</span>
            <input
              type="text"
              value={editor.dateLabel}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "dateLabel", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Tanggal lengkap</span>
            <input
              type="text"
              value={editor.fullDateLabel}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "fullDateLabel",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Teks pembuka atas</span>
            <input
              type="text"
              value={editor.heroEyebrow}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "heroEyebrow", event.target.value),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Pesan pembuka</span>
            <textarea
              rows={4}
              value={editor.heroLede}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "heroLede", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Nama lokasi</span>
            <input
              type="text"
              value={editor.venueName}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "venueName", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Kota lokasi</span>
            <input
              type="text"
              value={editor.venueCity}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "venueCity", event.target.value),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Baris alamat lokasi</span>
            <textarea
              rows={3}
              value={editor.venueAddress}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "venueAddress", event.target.value),
                )
              }
            />
          </label>
          <label>
            <span>Judul undangan</span>
            <input
              type="text"
              value={editor.summaryHeadline}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "summaryHeadline",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Email panitia</span>
            <input
              type="email"
              value={editor.questionEmail}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "questionEmail",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label>
            <span>Email penerima RSVP</span>
            <input
              type="email"
              value={editor.contactEmail}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "contactEmail", event.target.value),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Ringkasan undangan</span>
            <textarea
              rows={4}
              value={editor.invitationHighlights}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "invitationHighlights",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Bagian kisah</span>
            <textarea
              rows={5}
              value={editor.storyBody}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "storyBody", event.target.value),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Pembuka panduan tamu</span>
            <textarea
              rows={4}
              value={editor.guestGuideBody}
              onChange={(event) =>
                setEditor(
                  updateEditorField(
                    editor,
                    "guestGuideBody",
                    event.target.value,
                  ),
                )
              }
            />
          </label>
          <label className="dashboard-field-span">
            <span>Catatan penutup</span>
            <textarea
              rows={3}
              value={editor.footerNote}
              onChange={(event) =>
                setEditor(
                  updateEditorField(editor, "footerNote", event.target.value),
                )
              }
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <p className="section-tag">Versi</p>
        <h2>Simpan cadangan</h2>
        <label className="dashboard-version-note">
          <span>Catatan versi</span>
          <input
            type="text"
            value={versionNote}
            onChange={(event) => setVersionNote(event.target.value)}
            placeholder="Apa yang berubah pada versi ini?"
          />
        </label>
        <div className="dashboard-toolbar">
          <button
            className="primary-action button-reset"
            type="button"
            onClick={handleSaveVersion}
          >
            Simpan versi
          </button>
          <button
            className="secondary-action button-reset"
            type="button"
            onClick={onResetContent}
          >
            Kembalikan ke konten awal
          </button>
        </div>
      </section>

      <section className="panel">
        <p className="section-tag">Pratinjau Langsung</p>
        <h2>{previewContent.couple.displayName}</h2>
        <p className="panel-note">{previewContent.event.fullDateLabel}</p>
        <p>{previewContent.hero.lede}</p>
        <div className="dashboard-preview-list">
          <article className="dashboard-status-card">
            <span>Lokasi</span>
            <strong>{previewContent.event.venue.name || "Belum diatur"}</strong>
          </article>
          <article className="dashboard-status-card">
            <span>Email panitia</span>
            <strong>
              {previewContent.rsvp.questionEmail || "Belum diatur"}
            </strong>
          </article>
          <article className="dashboard-status-card">
            <span>Email RSVP</span>
            <strong>
              {previewContent.rsvp.contactEmail || "Belum diatur"}
            </strong>
          </article>
        </div>
      </section>

      <section className="panel page-span">
        <p className="section-tag">Versi Tersimpan</p>
        <h2>Pulihkan cadangan sebelumnya</h2>
        {versions.length > 0 ? (
          <div className="dashboard-version-list">
            {versions.map((version) => (
              <article key={version.id} className="dashboard-version-item">
                <div>
                  <strong>{version.note || "Versi tanpa judul"}</strong>
                  <p className="panel-note">
                    {formatVersionDate(version.createdAt)}
                  </p>
                </div>
                <button
                  className="secondary-action button-reset"
                  type="button"
                  onClick={() => handleRestore(version.id)}
                >
                  Pulihkan
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="panel-note">
            Belum ada versi tersimpan. Terapkan draf lalu simpan cadangan
            pertama Anda.
          </p>
        )}
      </section>
    </main>
  );
}
