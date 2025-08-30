import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogReader from "./pages/BlogReader";
import About from "./pages/About";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:slug",
        element: <BlogReader />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "tools",
        element: <Tools />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);