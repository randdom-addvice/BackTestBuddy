import React, { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { AppRoutes } from "./routesDeclaration";
import { checkTokenValidity } from "@/utils/auth";
import CookieUtility from "@/utils/cookieUtils";

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
    loader: async () => {
      const authToken = CookieUtility.getCookie("authToken");
      if (!checkTokenValidity(authToken)) {
        throw redirect(AppRoutes.AUTH);
      }
      return null;
    },
    element: <LazyDashboardPage />,
  },
  {
    path: AppRoutes.AUTH,
    loader: async () => {
      const authToken = CookieUtility.getCookie("authToken");
      if (checkTokenValidity(authToken)) {
        throw redirect(AppRoutes.DASHBOARD);
      }
      return null;
    },
    element: <LazyAuthPage />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;
