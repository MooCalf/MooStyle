import React, { useState } from "react";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { Metadata } from "@/Components/Metadata.jsx";
import { getAllArchives } from "@/lib/archive";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const Archive = () => {
  const archives = getAllArchives();

  return (
    <>
      <Metadata
        pageTitle="Archive - MooStyle"
        pageDescription="Check out older content I've made in the past that is still worthy of its own showcase room."
      />

      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />

        <div className="page-header">
          <div className="content-container">
            <div className="mt-4 text-center">
              <h1 className="page-title">Archive</h1>
              <p className="page-description">Check out older content I've made in the past that is still worthy of its own showcase room.</p>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section>
            <ArchiveGrid items={archives} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

function ArchiveGrid({ items = [] }) {
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
  const visibleItems = items.slice(0, page * itemsPerPage);

  const handleLoadMore = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="group w-full h-72 bg-gray-100 rounded overflow-hidden mb-4 relative">
              <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />

              {/* NEW badge */}
              {item.isNew && (
                <span className="absolute top-3 left-3 text-xs text-white bg-green-500 px-2 py-1 rounded">NEW</span>
              )}

              {/* Hover overlay: title, description, Patreon button (appears on hover) */}
              <div className="absolute inset-0 flex flex-col justify-end items-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-full flex items-start gap-3">
                  {item.patreonlink ? (
                    <a
                      href={item.patreonlink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center px-2 py-1 text-xs border-2 border-orange-500 bg-orange-600/10 backdrop-blur-sm text-orange-600 rounded-sm hover:bg-orange-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <path d="M5 3a2 2 0 100 4 2 2 0 000-4zm6 1h2v14h-2V4z" />
                      </svg>
                      <span>Patreon</span>
                    </a>
                  ) : null}

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-200 mb-3">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {page < totalPages && (
        <div className="mt-8 flex justify-center">
          <button onClick={handleLoadMore} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full">Load more</button>
        </div>
      )}
    </>
  );
}

export default Archive;

