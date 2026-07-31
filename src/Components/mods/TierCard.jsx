import { Link } from "react-router-dom";
import { Check } from "lucide-react";

// Used twice on the homepage membership block. ctaUrl is expected to be a
// Patreon tier link; the CTA always routes through /redirector rather than
// linking offsite directly. When ctaUrl is not yet known (membership tier
// content is pending), the card renders a disabled "Coming Soon" state
// instead of a dead or fabricated link.
export const TierCard = ({ name, price, features = [], ctaLabel = "Join Now", ctaUrl }) => (
  <div className="tier-card">
    {name && <h3 className="tier-card__name">{name}</h3>}
    {price && <p className="tier-card__price">{price}</p>}
    <ul className="tier-card__features">
      {features.map((feature) => (
        <li key={feature} className="tier-card__feature">
          <Check size={16} aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    {ctaUrl ? (
      <Link className="tier-card__cta" to={`/redirector?to=${encodeURIComponent(ctaUrl)}`}>
        {ctaLabel}
      </Link>
    ) : (
      <button type="button" className="tier-card__cta tier-card__cta--disabled" disabled>
        Coming Soon
      </button>
    )}
  </div>
);
