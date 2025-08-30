import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes";
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
};

export default App;
