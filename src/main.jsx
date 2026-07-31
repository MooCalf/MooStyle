import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// firstElementChild (not hasChildNodes): the unprocessed index.html template
// still has the literal "<!--app-html-->" placeholder *comment* inside the root
// div until the prerender script splices real markup in, and a comment node
// alone would make hasChildNodes() true with nothing to actually hydrate.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
