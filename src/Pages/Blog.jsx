import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";

// Minimal honest stub: no posts have been published yet. Built now because
// the homepage blog teaser needs a real internal link to point at, per
// newdesign-layout Section 3 sequencing.
export const Blog = () => (
  <div className="min-h-screen">
    <Metadata
      pageTitle="Blog | MOOSTYLES"
      pageDescription="News and updates from MOOSTYLES."
      canonical="/blog"
    />
    <WebsiteBackground />
    <NavigationBar />
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="mod-detail__title newdesign-heading">Blog</h1>
      <p className="mod-detail__empty-state">No posts yet. Check back soon.</p>
    </main>
    <Footer />
  </div>
);
