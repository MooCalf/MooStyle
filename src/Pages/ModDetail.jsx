import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { MediaGallery } from "@/Components/mods/MediaGallery";
import { SectionTabs } from "@/Components/mods/SectionTabs";
import { DownloadOptions } from "@/Components/mods/DownloadOptions";
import { MetadataList } from "@/Components/mods/MetadataList";
import { FileManifest } from "@/Components/mods/FileManifest";
import { StatusBadge } from "@/Components/mods/StatusBadge";
import { InstallationSteps } from "@/Components/mods/InstallationSteps";
import { KnownIssues } from "@/Components/mods/KnownIssues";
import { Breadcrumb } from "@/Components/mods/Breadcrumb";
import { getModByAnyId, getRelatedMods } from "@/lib/mods";
import { slugify } from "@/lib/slugify";
import { DEFAULT_MOD_TABS } from "@/lib/modDetailTabs";
import { ProductCard } from "@/Components/ProductCard";

const toLegacyCard = (mod) => ({
  id: mod.legacyId,
  name: mod.name,
  brand: mod.collection || "Archive",
  image: mod.media.banner,
  images: [mod.media.banner, ...mod.media.previews],
  isNew: mod.legacy.isNew,
});

export const ModDetail = () => {
  const params = useParams();
  const modId = params.slug ?? params.id;
  const mod = getModByAnyId(modId);
  const [activeTab, setActiveTab] = useState("All");

  if (!mod) {
    return (
      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />
        <Metadata pageTitle="Mod Not Found | MOOSTYLES" noindex />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mod Not Found</h1>
          <p className="text-gray-600 mb-6">
            The mod "{modId}" doesn't exist or may have been moved.
          </p>
          <Link to="/mods" className="text-teal-600 font-semibold">
            Browse all mods
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const activeTabDef = DEFAULT_MOD_TABS.find((tab) => tab.label === activeTab) || DEFAULT_MOD_TABS[0];
  const isSectionVisible = (sectionId) => activeTabDef.sectionIds.includes(sectionId);

  const breadcrumb = mod.collection
    ? { to: `/collections/${slugify(mod.collection)}`, label: mod.collection }
    : mod.legacy.isArchiveItem
    ? { to: "/archive", label: "Archive" }
    : { to: "/mods", label: "All Mods" };

  const relatedMods = getRelatedMods(mod.slug, 4);

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle={`${mod.name} | MOOSTYLES`}
        pageDescription={mod.description}
        ogTitle={`${mod.name} | MOOSTYLES`}
        ogDescription={mod.description}
        ogImage={mod.media.banner}
        ogType="product"
        canonical={`/mods/${mod.slug}`}
        keywords={`${mod.name}, ${mod.collection || "inZOI mods"}, ${mod.tags.join(", ")}, MOOSTYLES`}
        product={{
          id: mod.legacyId,
          name: mod.name,
          description: mod.description,
          image: mod.media.banner || "",
          brand: mod.collection || "Archive",
          category: mod.legacy.isArchiveItem ? "archive" : "inZOI",
        }}
      />

      <WebsiteBackground />
      <NavigationBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb to={breadcrumb.to} label={breadcrumb.label} />

        <h1 className="mod-detail__title newdesign-heading newdesign-brand-label">{mod.name}</h1>

        <MediaGallery
          banner={mod.media.banner}
          previews={mod.media.previews}
          screenshots={mod.media.screenshots}
        />

        <div className="mod-detail__content">
          <h2 className="mod-detail__title newdesign-heading">{mod.name}</h2>

          <div className="mod-detail__status-row">
            <StatusBadge state={mod.status.compatibility} gameVersion={mod.status.gameVersion} />
          </div>

          <SectionTabs tabs={DEFAULT_MOD_TABS} activeLabel={activeTab} onSelect={setActiveTab} />

          {isSectionVisible("download") && (
            <section
              id="section-tabpanel-download"
              role="tabpanel"
              aria-labelledby={`section-tab-${activeTab}`}
              className="mod-detail__section"
            >
              <DownloadOptions
                modSlug={mod.slug}
                earlyAccess={mod.downloadOptions.earlyAccess}
                publicAccess={mod.downloadOptions.public}
                fileTypes={mod.fileTypes}
              />
            </section>
          )}

          {isSectionVisible("details") && (
            <section className="mod-detail__section">
              <h3 className="mod-detail__section-heading">Details</h3>
              <p className="mod-detail__description">{mod.description}</p>

              {mod.highlights && mod.highlights.length > 0 && (
                <>
                  <h4 className="mod-detail__subheading">Highlights</h4>
                  <ul className="mod-detail__highlights">
                    {mod.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="mod-detail__subheading">Known Issues</h4>
              <KnownIssues issues={mod.knownIssues} />

              <h4 className="mod-detail__subheading">Metadata</h4>
              <MetadataList fields={mod.metadataList} />

              <FileManifest files={mod.fileManifest} />

              <p className="mod-detail__license-summary">
                Personal use is always free. Reselling, redistributing, or claiming this mod as
                your own work is not permitted under any license tier. Full terms are available
                on the <Link to="/terms-of-service">Terms of Service</Link> page.
              </p>
            </section>
          )}

          {isSectionVisible("installation") && (
            <section
              id="section-tabpanel-installation"
              role="tabpanel"
              aria-labelledby={`section-tab-${activeTab}`}
              className="mod-detail__section"
            >
              <h3 className="mod-detail__section-heading">Installation</h3>
              <InstallationSteps steps={mod.installation} />
            </section>
          )}

          {isSectionVisible("changelog") && (
            <section className="mod-detail__section">
              <h3 className="mod-detail__section-heading">Changelog</h3>
              <p className="mod-detail__empty-state">No changelog entries yet.</p>
            </section>
          )}
        </div>

        {relatedMods.length > 0 && (
          <div className="mod-detail__related">
            <h2 className="mod-detail__section-heading">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMods.map((related) => (
                <ProductCard key={related.slug} product={toLegacyCard(related)} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
