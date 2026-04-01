import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { Metadata } from "@/Components/Metadata.jsx";
import { getAllArchives } from "@/lib/archive";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const Archive = () => {
  const archives = getAllArchives();
  const navigate = useNavigate();

  return (
    <>
      <Metadata
        pageTitle="InZOI Mods Archive - Classic & Legacy Mods | MOOSTYLE"
        pageDescription="Explore our archive of classic and legacy InZOI mods from past updates. Browse archived InZOI modding creations, vintage mod collections, and historical custom content. Discover timeless mods for InZOI that shaped the modding community."
        keywords="InZOI archive, legacy InZOI mods, classic InZOI mods, archived mods, InZOI modding history, vintage mods, InZOI mod archives, classic mod collections, MOOSTYLE archive, InZOI mod history"
        canonical="/archive"
        ogUrl="/archive"
      />

      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />

        <div className="page-header">
          <div className="content-container">
            <div className="mt-4 text-center">
              <h1 className="page-title">Archive</h1>
              <p className="page-description">Check out other content I've made that I think is still worthy of its own showcase room.</p>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section>
            <ArchiveGrid
              items={archives}
              onItemClick={(id) => navigate(`/product/${id}`)}
            />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

function ArchiveGrid({ items = [], onItemClick }) {
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
  const visibleItems = items.slice(0, page * itemsPerPage);

  const handleLoadMore = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map(item => (
          <div
            key={item.id}
            className="rounded-lg overflow-hidden bg-gray-100 group cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onClick={() => onItemClick?.(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onItemClick?.(item.id);
              }
            }}
          >
            <div className="relative w-full aspect-[4/3] bg-gray-200">
              <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />

              {/* NEW badge */}
              {item.isNew && (
                <span className="absolute top-3 right-3 text-xs text-white bg-green-500 px-2 py-1 rounded">NEW</span>
              )}

              {/* InZOI-style dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Name only on hover */}
              <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-lg font-semibold drop-shadow text-white">
                  {item.name}
                </span>
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

