import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import { Home } from './Pages/Home';
import { Shopping } from './Pages/Shopping';
import { ProductDetail } from './Pages/ProductDetail';
import { BrandDetail } from './Pages/BrandDetail';
import { Brands } from './Pages/Brands';
import { Creators } from './Pages/Creators';
import Blog from './Pages/Blog';
import Changelogs from './Pages/Changelogs';
import AboutMe from './Pages/AboutMe';
import { MyProjects } from './Pages/MyProjects';
import CommonQuestions from './Pages/CommonQuestions';
import { Support } from './Pages/Support';
import { SavedProducts } from './Pages/SavedProducts';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import { TermsOfService } from './Pages/TermsOfService';
import { NotFound } from './Pages/NotFound';

// Components
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className="App">
            <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/support" element={<Support />} />
            <Route path="/saved-products" element={<SavedProducts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Shopping Routes */}
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/shopping/:category" element={<Shopping />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/brands" element={<Brands />} />
            
            {/* Content Routes */}
            <Route path="/creators" element={<Creators />} />
            <Route path="/artisans" element={<Creators />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/changelogs" element={<Changelogs />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/common-questions" element={<CommonQuestions />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
