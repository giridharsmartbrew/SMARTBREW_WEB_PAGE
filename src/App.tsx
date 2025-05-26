import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CareerPage from './pages/CareerPage';
import BlogsPage from './pages/BlogsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import AuthCallback from './pages/AuthCallback';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Context
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "careers", element: <CareerPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "blog", element: <BlogsPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "auth-callback", element: <AuthCallback /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "*", element: <NotFoundPage /> },
    ]
  }
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;