import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NavigationBar from "@/pages/NavigationBar";
import DemoIndexPage from "@/pages/demo";
import ThemeTestPage from "@/pages/demo/theme-test";
import SettingsPanelDemo from "@/layout/component/SettingsPanelDemo";
import DrawerHeaderDemo from "@/layout/component/DrawerHeaderDemo";
import Icon from "@/pages/Icon";

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
      {
        path: "/icon",
        element: <Icon />,
      },
      {
        path: "/demo",
        element: <DemoIndexPage />,
      },
      {
        path: "/demo/theme-test",
        element: <ThemeTestPage />,
      },
      {
        path: "/demo/settings-panel",
        element: <SettingsPanelDemo />,
      },
      {
        path: "/demo/drawer-header",
        element: <DrawerHeaderDemo />,
      },
    ],
  },
]);
