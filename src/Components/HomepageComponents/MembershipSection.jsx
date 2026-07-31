import { TierCard } from "@/Components/mods/TierCard";

// Two tier cards side by side, per Section 1.2 item 3. Real tier names,
// pricing, feature lists, and per-tier Patreon links are not yet known
// (marked "(Ask after completion)" in the redesign spec), so both cards
// render in their honest "Coming Soon" state rather than a fabricated price
// or a generic Patreon link mislabeled as a specific tier.
export const MembershipSection = () => (
  <section className="membership-section">
    <h2 className="membership-section__heading newdesign-heading">Membership</h2>
    <div className="membership-section__cards">
      <TierCard name="Tier 1" features={[]} />
      <TierCard name="Tier 2" features={[]} />
    </div>
    <p className="membership-section__fine-print">
      Membership tiers and billing details will be published here once finalized.
    </p>
  </section>
);
