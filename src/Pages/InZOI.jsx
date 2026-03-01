import React, { useState } from "react";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { Metadata } from "@/Components/Metadata.jsx";
import InZOIMods from "@/Components/InZOIMods";
import { getAllProducts } from "@/lib/shoppingData";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

const sampleMods = getAllProducts();

const InZOI = () => {
  return (
    <>
      <Metadata
        pageTitle="My InZOI Mods - MooStyle"
        pageDescription="Browse and manage your InZOI mods in one place."
      />

      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />

        <div className="page-header">
          <div className="content-container">
            <div className="mt-4 text-center">
              <h1 className="page-title">My InZOI Mods</h1>
              <p className="page-description">Browse and manage your InZOI mods in one place.</p>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section>
            {/* Pagination: show up to `itemsPerPage` items per page, with a centered Load More button */}
            <InZOIGrid items={sampleMods.map(p => ({ ...p, href: `/product/${p.id}` }))} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export { InZOI };

// --- Helper grid component inserted at bottom of file ---
function InZOIGrid({ items = [] }) {
  const itemsPerPage = 15;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
  const visibleItems = items.slice(0, page * itemsPerPage);

  const handleLoadMore = () => {
    setPage((p) => Math.min(totalPages, p + 1));
    // Scroll to the newly revealed content smoothly
    setTimeout(() => {
      const el = document.querySelector('.page-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visibleItems.map((mod) => (
          <div key={mod.id} className="w-full">
            <InZOIMods item={mod} href={mod.href} />
          </div>
        ))}
      </div>

      {/* Centered Load More button */}
      {page < totalPages && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
