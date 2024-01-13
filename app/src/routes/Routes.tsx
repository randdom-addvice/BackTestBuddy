import React, { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from "react-router-dom";
import { AppRoutes } from "./routesDeclaration";
import { checkTokenValidity } from "@/utils/auth";
import CookieUtility from "@/utils/cookieUtils";
import { JWT_TOKEN_NAMESPACE } from "@/utils/globalConstants";
import { ErrorBoundary } from "react-error-boundary";

const LazyHomePage = lazy(() => import("@/pages/Home"));
const LazyDashboardPage = lazy(() => import("@/pages/Dashboard"));
const LazyAuthPage = lazy(() => import("@/pages/AuthPage"));
const LazyMetrixPage = lazy(() => import("@/pages/MetrixPage"));
const LazyLibraryPage = lazy(() => import("@/pages/LibraryPage"));
const LazyPlansPage = lazy(() => import("@/pages/PlansPage"));

const checkJWTValidity = async () => {
  const authToken = CookieUtility.getCookie(JWT_TOKEN_NAMESPACE);
  if (!checkTokenValidity(authToken)) {
    throw redirect(AppRoutes.AUTH);
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <LazyHomePage />,
  },
  {
    path: AppRoutes.DASHBOARD,
    loader: checkJWTValidity,
    errorElement: <div>Error</div>,
    element: (
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <LazyDashboardPage />
        <Outlet />
      </ErrorBoundary>
    ),
  },
  {
    path: AppRoutes.METRIX,
    loader: checkJWTValidity,
    element: (
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <LazyMetrixPage />
      </ErrorBoundary>
    ),
  },
  {
    path: AppRoutes.LIBRARIES,
    loader: checkJWTValidity,
    element: (
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <LazyLibraryPage />
      </ErrorBoundary>
    ),
  },
  {
    path: AppRoutes.PLANS,
    loader: checkJWTValidity,
    element: (
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <LazyPlansPage />
      </ErrorBoundary>
    ),
  },
  {
    path: AppRoutes.AUTH,
    loader: async () => {
      const authToken = CookieUtility.getCookie(JWT_TOKEN_NAMESPACE);
      if (checkTokenValidity(authToken)) {
        throw redirect(AppRoutes.LIBRARIES);
      }
      return null;
    },
    element: <LazyAuthPage />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;
