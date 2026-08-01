import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PATREON_MEMBERSHIP_URL } from "@/lib/config";

const SUPPORT_TIERS = [
  {
    key: "maison",
    name: "Maison",
    description: "Support MOOSTYLE by contributing a small tip!",
    price: "1USD",
    theme: "light",
  },
  {
    key: "chateau",
    name: "Château",
    description:
      "Support MOOSTYLE by contributing a small tip! Gain Access to behind the scene updates and access to Quicklink downloads and more!",
    price: "2USD",
    theme: "dark",
  },
];

export const SupportMyWork = () => (
  <section className="support-my-work">
    <p className="support-my-work__intro">
      The official website of MOOSTYLES and Partnered Brands.
      <br />
      All contents made for inZOI.
    </p>

    <h1 className="support-my-work__heading">Support My Work</h1>
    <p className="support-my-work__body">
      All contents are made with sincerity and as much detail as possible. These contents usually
      take some time and your support would be greatly appreciated!{" "}
      <strong>Consider joining the Membership and Support my work.</strong>
    </p>

    <div className="support-my-work__cards">
      {SUPPORT_TIERS.map((tier) => (
        <div key={tier.key} className={`support-card support-card--${tier.theme}`}>
          <h3 className="support-card__name">{tier.name}</h3>
          <p className="support-card__description">{tier.description}</p>
          <div className="support-card__footer">
            <p className="support-card__price">{tier.price}</p>
            <Link
              to={`/redirector?to=${encodeURIComponent(PATREON_MEMBERSHIP_URL)}`}
              className="support-card__cta"
            >
              Join Now
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
);
