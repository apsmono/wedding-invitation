import { type FormEvent, useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './App.css'
import { invitationContent } from './content/invitation'

type RsvpFormData = {
  guestName: string
  email: string
  attendance: string
  guestCount: string
  mealPreference: string
  dietaryNotes: string
  songRequest: string
}

type FormErrors = Partial<Record<keyof RsvpFormData, string>>

const RSVP_DRAFT_KEY = 'wedding-invitation.rsvp-draft'
const RSVP_SUBMITTED_KEY = 'wedding-invitation.rsvp-submitted'

const defaultRsvpForm: RsvpFormData = {
  guestName: '',
  email: '',
  attendance: invitationContent.rsvp.attendanceOptions[0]?.value ?? 'joyfully-accepts',
  guestCount: '1',
  mealPreference: invitationContent.rsvp.mealOptions[0]?.value ?? 'chef-selection',
  dietaryNotes: '',
  songRequest: '',
}

function buildRsvpMailto(details: RsvpFormData) {
  const attendanceLabel =
    invitationContent.rsvp.attendanceOptions.find((item) => item.value === details.attendance)
      ?.label ?? details.attendance
  const mealLabel =
    invitationContent.rsvp.mealOptions.find((item) => item.value === details.mealPreference)
      ?.label ?? details.mealPreference

  const subject = `Wedding RSVP - ${details.guestName}`
  const body = [
    `Name: ${details.guestName}`,
    `Email: ${details.email}`,
    `Attendance: ${attendanceLabel}`,
    `Guest Count: ${details.guestCount}`,
    `Meal Preference: ${mealLabel}`,
    `Dietary Notes: ${details.dietaryNotes || 'None'}`,
    `Song Request: ${details.songRequest || 'None'}`,
  ].join('\n')

  return `mailto:${invitationContent.rsvp.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function readStoredRsvp(key: string): RsvpFormData | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(key)

  if (!raw) {
    return null
  }

  try {
    return { ...defaultRsvpForm, ...(JSON.parse(raw) as Partial<RsvpFormData>) }
  } catch {
    return null
  }
}

function useCountdownParts(targetIso: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const distance = Math.max(new Date(targetIso).getTime() - now, 0)
  const totalSeconds = Math.floor(distance / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function currentStepLabel(pathname: string) {
  return invitationContent.navigation.find((item) => item.to === pathname)?.label ?? 'Welcome'
}

function CountdownCell({ label, value }: { label: string; value: number }) {
  return (
    <article className="countdown-cell">
      <strong>{String(value).padStart(2, '0')}</strong>
      <span>{label}</span>
    </article>
  )
}

function WelcomePage() {
  const countdown = useCountdownParts(invitationContent.event.isoDate)

  return (
    <main className="page-grid">
      <section className="hero-layout page-span">
        <div className="hero-panel panel">
          <p className="eyebrow">{invitationContent.hero.eyebrow}</p>
          <h2 className="hero-heading">
            {invitationContent.couple.partnerOne.first}{' '}
            <span>{invitationContent.hero.titleAccent}</span>{' '}
            {invitationContent.couple.partnerTwo.first}
          </h2>
          <p className="lede">{invitationContent.hero.lede}</p>
          <div className="hero-actions">
            <Link className="primary-action" to={invitationContent.hero.primaryCta.href}>
              {invitationContent.hero.primaryCta.label}
            </Link>
            <Link className="secondary-action" to={invitationContent.hero.secondaryCta.href}>
              {invitationContent.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <aside className="invitation-card panel">
          <p className="card-label">{invitationContent.invitationSummary.label}</p>
          <div className="card-divider"></div>
          <p className="card-date">{invitationContent.event.dateLabel}</p>
          <h3>{invitationContent.invitationSummary.headline}</h3>
          <p>
            {invitationContent.event.venue.name}
            <br />
            {invitationContent.event.venue.addressLines.join(', ')}
          </p>
          <ul className="moment-list">
            {invitationContent.invitationSummary.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="panel countdown-panel">
        <p className="section-tag">{invitationContent.countdown.sectionTag}</p>
        <h2>{invitationContent.countdown.title}</h2>
        <p>{invitationContent.countdown.body}</p>
        <div className="countdown-grid">
          <CountdownCell label="Days" value={countdown.days} />
          <CountdownCell label="Hours" value={countdown.hours} />
          <CountdownCell label="Minutes" value={countdown.minutes} />
          <CountdownCell label="Seconds" value={countdown.seconds} />
        </div>
      </section>

      <section className="panel story-panel">
        <p className="section-tag">{invitationContent.story.sectionTag}</p>
        <h2>{invitationContent.story.title}</h2>
        <p>{invitationContent.story.body}</p>
      </section>
    </main>
  )
}

function CelebrationPage() {
  return (
    <main className="page-grid">
      <section className="panel details-panel">
        <p className="section-tag">{invitationContent.details.sectionTag}</p>
        <h2>{invitationContent.details.title}</h2>
        <div className="detail-grid">
          {invitationContent.details.items.map((item) => (
            <article key={item.id}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="panel schedule-panel">
        <p className="section-tag">{invitationContent.schedule.sectionTag}</p>
        <h2>{invitationContent.schedule.title}</h2>
        <ol className="schedule-list">
          {invitationContent.schedule.items.map((item) => (
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
        <p className="section-tag">{invitationContent.gallery.sectionTag}</p>
        <h2>{invitationContent.gallery.title}</h2>
        <p>{invitationContent.gallery.body}</p>
        <div className="gallery-grid">
          {invitationContent.gallery.items.map((item) => (
            <article key={item.id} className="gallery-card">
              <div className="gallery-swatch" aria-hidden="true"></div>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function GuestGuidePage() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${invitationContent.event.venue.name} ${invitationContent.event.venue.city}`,
  )}`

  return (
    <main className="page-grid">
      <section className="panel map-panel page-span">
        <p className="section-tag">{invitationContent.guestGuide.sectionTag}</p>
        <h2>{invitationContent.guestGuide.title}</h2>
        <p>{invitationContent.guestGuide.body}</p>
        <a className="primary-action inline-action" href={mapHref} target="_blank" rel="noreferrer">
          {invitationContent.guestGuide.mapLabel}
        </a>
        <div className="guide-grid">
          {invitationContent.guestGuide.groups.map((group) => (
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
        <p className="section-tag">{invitationContent.registry.sectionTag}</p>
        <h2>{invitationContent.registry.title}</h2>
        <p>{invitationContent.registry.body}</p>
        <div className="registry-grid">
          {invitationContent.registry.items.map((item) => (
            <article key={item.id}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel contact-panel">
        <p className="section-tag">Support</p>
        <h2>Need help before the event?</h2>
        <p>
          Questions about the venue, dress code, or RSVP updates can be sent to the planning
          inbox below.
        </p>
        <a
          className="secondary-action inline-action"
          href={`mailto:${invitationContent.rsvp.questionEmail}?subject=Wedding%20Questions`}
        >
          Email The Planner
        </a>
      </section>
    </main>
  )
}

function RsvpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RsvpFormData>(() => {
    return readStoredRsvp(RSVP_DRAFT_KEY) ?? defaultRsvpForm
  })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    window.localStorage.setItem(RSVP_DRAFT_KEY, JSON.stringify(formData))
  }, [formData])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (!formData.guestName.trim()) {
      nextErrors.guestName = 'Please enter your full name.'
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.attendance) {
      nextErrors.attendance = 'Please choose an attendance option.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const normalized = {
      ...formData,
      guestCount:
        formData.attendance === 'regretfully-declines' ? '0' : formData.guestCount,
    }

    window.localStorage.setItem(RSVP_SUBMITTED_KEY, JSON.stringify(normalized))
    setErrors({})
    navigate('/thanks', { state: normalized })
  }

  return (
    <main className="page-grid">
      <section className="panel rsvp-panel page-span">
        <p className="section-tag">{invitationContent.rsvp.sectionTag}</p>
        <h2>{invitationContent.rsvp.title}</h2>
        <p className="panel-note">{invitationContent.rsvp.deadlineLabel}</p>
        <p>{invitationContent.rsvp.body}</p>
        <p className="panel-note">{invitationContent.rsvp.formNote}</p>

        <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Guest Name</span>
            <input
              type="text"
              value={formData.guestName}
              onChange={(event) => setFormData({ ...formData, guestName: event.target.value })}
            />
            {errors.guestName ? <small>{errors.guestName}</small> : null}
          </label>

          <label>
            <span>Email Address</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>

          <label>
            <span>Attendance</span>
            <select
              value={formData.attendance}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  attendance: event.target.value,
                  guestCount:
                    event.target.value === 'regretfully-declines' ? '0' : formData.guestCount,
                })
              }
            >
              {invitationContent.rsvp.attendanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Guest Count</span>
            <select
              value={formData.guestCount}
              disabled={formData.attendance === 'regretfully-declines'}
              onChange={(event) => setFormData({ ...formData, guestCount: event.target.value })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>

          <label>
            <span>Meal Preference</span>
            <select
              value={formData.mealPreference}
              onChange={(event) => setFormData({ ...formData, mealPreference: event.target.value })}
            >
              {invitationContent.rsvp.mealOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field-span">
            <span>Dietary Notes</span>
            <textarea
              rows={4}
              value={formData.dietaryNotes}
              onChange={(event) => setFormData({ ...formData, dietaryNotes: event.target.value })}
            />
          </label>

          <label>
            <span>Song Request</span>
            <input
              type="text"
              value={formData.songRequest}
              onChange={(event) => setFormData({ ...formData, songRequest: event.target.value })}
            />
          </label>

          <label>
            <span>Contact Host</span>
            <input type="text" value={invitationContent.rsvp.contactEmail} readOnly />
          </label>

          <div className="form-actions field-span">
            <button className="primary-action button-reset" type="submit">
              Continue To Confirmation
            </button>
            <a
              className="secondary-action"
              href={`mailto:${invitationContent.rsvp.questionEmail}?subject=Wedding%20Questions`}
            >
              Ask A Question
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}

function ThanksPage() {
  const location = useLocation()
  const details = (location.state as RsvpFormData | null) ?? readStoredRsvp(RSVP_SUBMITTED_KEY)
  const submissionHref = details ? buildRsvpMailto(details) : null

  return (
    <main className="page-grid">
      <section className="panel thanks-panel page-span">
        <p className="section-tag">Confirmation</p>
        <h2>Thank you for responding</h2>
        <p>
          Your RSVP summary has been saved on this device for review. Connect the form to a
          central RSVP service before going live if you want guest responses collected in one
          place.
        </p>

        {submissionHref ? (
          <p className="panel-note">
            Demo handoff: use the generated email below to send this RSVP summary to{' '}
            {invitationContent.rsvp.contactEmail}.
          </p>
        ) : null}

        {details ? (
          <div className="summary-grid">
            <article>
              <span>Name</span>
              <strong>{details.guestName}</strong>
            </article>
            <article>
              <span>Email</span>
              <strong>{details.email}</strong>
            </article>
            <article>
              <span>Attendance</span>
              <strong>
                {
                  invitationContent.rsvp.attendanceOptions.find(
                    (item) => item.value === details.attendance,
                  )?.label
                }
              </strong>
            </article>
            <article>
              <span>Guest Count</span>
              <strong>{details.guestCount}</strong>
            </article>
            <article>
              <span>Meal</span>
              <strong>
                {
                  invitationContent.rsvp.mealOptions.find(
                    (item) => item.value === details.mealPreference,
                  )?.label
                }
              </strong>
            </article>
            <article>
              <span>Dietary Notes</span>
              <strong>{details.dietaryNotes || 'None added'}</strong>
            </article>
          </div>
        ) : (
          <p className="panel-note">No RSVP summary is saved yet. Submit the form first.</p>
        )}

        <div className="hero-actions">
          {submissionHref ? (
            <a className="primary-action" href={submissionHref}>
              Send RSVP Email
            </a>
          ) : null}
          <Link className="primary-action" to="/guest-guide">
            Continue To Guest Guide
          </Link>
          <Link className="secondary-action" to="/rsvp">
            Edit RSVP
          </Link>
        </div>
      </section>
    </main>
  )
}

function AppShell() {
  const location = useLocation()

  return (
    <div className="page-shell">
      <header className="site-header panel">
        <div>
          <p className="eyebrow">Public Invitation Flow</p>
          <h1 className="site-title">{invitationContent.couple.displayName}</h1>
          <p className="site-subtitle">{invitationContent.event.fullDateLabel}</p>
        </div>

        <nav className="site-nav" aria-label="Invitation pages">
          {invitationContent.navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="route-indicator">Current step: {currentStepLabel(location.pathname)}</p>
      </header>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/celebration" element={<CelebrationPage />} />
        <Route path="/guest-guide" element={<GuestGuidePage />} />
        <Route path="/rsvp" element={<RsvpPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="footer-note">{invitationContent.footerNote}</footer>
    </div>
  )
}

export default function App() {
  return <AppShell />
}
