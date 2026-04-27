import {
  invitationContent,
  type InvitationContent,
} from "../content/invitation";
import "./hero-section.css";

type HeroSectionProps = {
  content?: InvitationContent;
};

function HeroSection({ content = invitationContent }: HeroSectionProps) {
  const { couple, event, hero, invitationSummary } = content;

  return (
    <header className="hero-section">
      <div className="hero-section__copy">
        <p className="hero-section__eyebrow">{hero.eyebrow}</p>

        <h1 className="hero-section__title">
          <span>{couple.partnerOne.first}</span>
          <span className="hero-section__accent">{hero.titleAccent}</span>
          <span>{couple.partnerTwo.first}</span>
        </h1>

        <p className="hero-section__lede">{hero.lede}</p>

        <dl className="hero-section__meta" aria-label="Event summary">
          <div>
            <dt>Date</dt>
            <dd>{event.fullDateLabel}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{event.venue.name}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{event.venue.city}</dd>
          </div>
        </dl>

        <div className="hero-section__actions">
          <a
            className="hero-section__action hero-section__action--primary"
            href={hero.primaryCta.href}
          >
            {hero.primaryCta.label}
          </a>
          <a
            className="hero-section__action hero-section__action--secondary"
            href={hero.secondaryCta.href}
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <aside
        className="hero-section__card"
        aria-label="Wedding invitation summary"
      >
        <p className="hero-section__card-label">{invitationSummary.label}</p>
        <div className="hero-section__divider" />
        <p className="hero-section__card-date">{event.dateLabel}</p>
        <h2 className="hero-section__card-title">
          {invitationSummary.headline}
        </h2>
        <p className="hero-section__venue-name">{event.venue.name}</p>
        <address className="hero-section__address">
          {event.venue.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>

        <ul className="hero-section__highlights">
          {invitationSummary.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </aside>
    </header>
  );
}

export default HeroSection;
