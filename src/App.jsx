import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Home } from "./Pages/Home";
import { Artisans } from "./Pages/Artisans";
import { Brands } from "./Pages/Brands";
import { BrandDetail } from "./Pages/BrandDetail";
import { Shopping } from "./Pages/Shopping";
import { ProductDetail } from "./Pages/ProductDetail";
import { Cart } from "./Pages/Cart";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { NotFound, ServerError } from "./Pages/ErrorPages";
import CommonQuestions from "./Pages/CommonQuestions";
import AboutMe from "./Pages/AboutMe";
import MyAccount from "./Pages/MyAccount";
import Blog from "./Pages/Blog";
import { Toaster } from "@/Components/ui/toaster.jsx";
import { Metadata } from "@/Components/Metadata.jsx";
import { CartProvider } from "@/contexts/CartContext";
import ErrorBoundary from "@/Components/ErrorBoundary";

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Metadata />
        <Toaster />
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/artisans" element={<Artisans />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/brand/:brandName" element={<BrandDetail />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/shopping/:category" element={<Shopping />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/common-questions" element={<CommonQuestions />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/error/500" element={<ServerError />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
export default App;
