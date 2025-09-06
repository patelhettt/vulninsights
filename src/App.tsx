import { RouterProvider, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import { router } from "./routes";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react"

// Component to track route changes for GTM
const GTMProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // Push page view to dataLayer for GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [location]);

  return <>{children}</>;
};

const App = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen">
        <GTMProvider>
          <RouterProvider router={router} />
        </GTMProvider>
      </div>
    </HelmetProvider>
  );
};

export default App;
