import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NavigationBar from "@/pages/NavigationBar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/navigation-bar",
        element: <NavigationBar />,
      },
    ],
  },
]);
