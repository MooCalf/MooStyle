import { Handshake } from "lucide-react";
import { ObfuscatedEmail } from "@/Components/ObfuscatedEmail";

export const PartnershipCallout = () => (
  <section className="partnership-callout">
    <div className="partnership-callout__card">
      <div className="partnership-callout__main">
        <Handshake size={28} className="partnership-callout__icon" aria-hidden="true" />
        <div>
          <h2 className="partnership-callout__title">Looking for Partnerships</h2>
          <p className="partnership-callout__note">
            Open to brand collaborations and sponsorships, reach out any time.
          </p>
        </div>
      </div>
      <ObfuscatedEmail
        encoded="YnVzaW5lc3NAbW9vc3R5bGVzLmNvbQ=="
        className="partnership-callout__email"
      />
    </div>
  </section>
);
