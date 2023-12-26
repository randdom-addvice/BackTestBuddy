import React, { lazy } from "react";
import {
  BrowserRouter,
  // Routes as AppRoutes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppRoutes } from "./routesDeclaration";

const LazyHomePage = lazy(() => import("../pages/Home"));
const LazyDashboardPage = lazy(() => import("../pages/Dashboard"));
const LazyAuthPage = lazy(() => import("../pages/AuthPage"));

const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <LazyHomePage />,
  },
  {
    path: AppRoutes.DASHBOARD,
    element: <LazyDashboardPage />,
  },
  {
    path: AppRoutes.AUTH,
    element: <LazyAuthPage />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;
