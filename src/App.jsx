import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Home } from "./Pages/Home";
import { ProductDetail } from "./Pages/ProductDetail";
import { BrandDetail } from "./Pages/BrandDetail";
import { InZOI } from "./Pages/InZOI";
import { Archive } from "./Pages/Archive";
import AboutMe from "./Pages/AboutMe";
import CommonQuestions from "./Pages/CommonQuestions";
import { Support } from "./Pages/Support";
import { SavedProducts } from "./Pages/SavedProducts";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import { TermsOfService } from "./Pages/TermsOfService";
import { NotFound } from "./Pages/NotFound";
import { Offline } from "./Pages/Offline";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/support" element={<Support />} />
              <Route path="/saved-products" element={<SavedProducts />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/offline" element={<Offline />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/brand/:id" element={<BrandDetail />} />
              <Route path="/brands" element={<InZOI />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/common-questions" element={<CommonQuestions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
