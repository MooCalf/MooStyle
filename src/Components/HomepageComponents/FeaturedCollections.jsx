import { PromotionalCarousel } from "./PromotionalCarousel";

// Full width banner(s) per major collection, per Section 1.2 item 5. Reuses
// the existing PromotionalCarousel (real MOOSTYLES promotional images, not a
// bank42n asset). Video banners are supported by MediaGallery for mod pages
// but no video is authored in this PR, per Section 6 decision 8.
export const FeaturedCollections = () => (
  <section className="featured-collections">
    <PromotionalCarousel />
  </section>
);
