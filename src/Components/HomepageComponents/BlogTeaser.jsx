import { Link } from "react-router-dom";

// Section 1.2 item 7. No posts have been published yet.
export const BlogTeaser = () => (
  <section className="blog-teaser">
    <h2 className="blog-teaser__heading newdesign-heading">From the Blog</h2>
    <p className="blog-teaser__empty">No posts yet.</p>
    <Link to="/blog" className="blog-teaser__link">
      Visit the blog
    </Link>
  </section>
);
