import { invitationContent } from '../content/invitation'
import './details-section.css'

function DetailsSection() {
  const { story, details, schedule, rsvp } = invitationContent

  return (
    <section className="details-section">
      <div className="details-section__grid">
        <article className="details-section__panel details-section__panel--story">
          <p className="details-section__tag">{story.sectionTag}</p>
          <h2>{story.title}</h2>
          <p>{story.body}</p>
        </article>

        <article className="details-section__panel">
          <p className="details-section__tag">{details.sectionTag}</p>
          <h2>{details.title}</h2>

          <div className="details-section__cards">
            {details.items.map((item) => (
              <article key={item.id} className="details-section__detail-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="details-section__panel">
          <p className="details-section__tag">{schedule.sectionTag}</p>
          <h2>{schedule.title}</h2>

          <ol className="details-section__schedule-list">
            {schedule.items.map((item) => (
              <li key={item.id}>
                <p className="details-section__schedule-time">{item.time}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="details-section__panel details-section__panel--rsvp">
          <p className="details-section__tag">{rsvp.sectionTag}</p>
          <h2>{rsvp.title}</h2>
          <p className="details-section__deadline">{rsvp.deadlineLabel}</p>
          <p>{rsvp.body}</p>

          <div className="details-section__actions">
            <a className="primary-action" href={rsvp.primaryCta.href}>
              {rsvp.primaryCta.label}
            </a>
            <a className="secondary-action" href={rsvp.secondaryCta.href}>
              {rsvp.secondaryCta.label}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DetailsSection