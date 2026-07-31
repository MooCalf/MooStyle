import { Link, useParams } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";

// No blog posts exist yet, so every slug honestly resolves to "not found"
// rather than a fabricated article.
export const BlogPost = () => {
  const { slug } = useParams();
  return (
    <div className="min-h-screen">
      <Metadata pageTitle="Post Not Found | MOOSTYLES" noindex />
      <WebsiteBackground />
      <NavigationBar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mod-detail__title newdesign-heading">Post Not Found</h1>
        <p className="mod-detail__empty-state">
          "{slug}" doesn't exist yet. No blog posts have been published.
        </p>
        <Link to="/blog" className="mod-breadcrumb">
          Back to Blog
        </Link>
      </main>
      <Footer />
    </div>
  );
};
