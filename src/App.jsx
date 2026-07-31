import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ModDetail } from "./Pages/ModDetail";
import { CollectionDetail } from "./Pages/CollectionDetail";
import { ModsIndex } from "./Pages/ModsIndex";
import { CollectionsIndex } from "./Pages/CollectionsIndex";
import { Blog } from "./Pages/Blog";
import { BlogPost } from "./Pages/BlogPost";
import { Gallery } from "./Pages/Gallery";
import { GalleryEntry } from "./Pages/GalleryEntry";
import { Free } from "./Pages/Free";
import { Status } from "./Pages/Status";
import { ModDownload } from "./Pages/ModDownload";
import { Redirector } from "./Pages/Redirector";
import { Archive } from "./Pages/Archive";
import AboutMe from "./Pages/AboutMe";
import CommonQuestions from "./Pages/CommonQuestions";
import { Support } from "./Pages/Support";
import { SavedProducts } from "./Pages/SavedProducts";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import { TermsOfService } from "./Pages/TermsOfService";
import { NotFound } from "./Pages/NotFound";
import { Offline } from "./Pages/Offline";
import { Links } from "./Pages/Links";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/saved-products" element={<SavedProducts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/links" element={<Links />} />
          {/* Canonical mod/collection routes */}
          <Route path="/mods" element={<ModsIndex />} />
          <Route path="/mods/:slug" element={<ModDetail />} />
          <Route path="/collections" element={<CollectionsIndex />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />

          {/* Legacy routes, dual-mounted onto the same page components so
              every existing mod/brand URL keeps working. Metadata.jsx sets
              the canonical link to the new path regardless of which route
              matched. */}
          <Route path="/product/:id" element={<ModDetail />} />
          <Route path="/brand/:id" element={<CollectionDetail />} />
          <Route path="/brands" element={<ModsIndex />} />

          <Route path="/archive" element={<Archive />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryEntry />} />

          <Route path="/free" element={<Free />} />
          <Route path="/status" element={<Status />} />
          <Route path="/api/mods/:id/download" element={<ModDownload />} />
          <Route path="/redirector" element={<Redirector />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/common-questions" element={<CommonQuestions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
