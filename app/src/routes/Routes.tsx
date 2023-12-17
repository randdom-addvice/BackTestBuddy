import React, { lazy } from "react";
import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";

const LazyHomePage = lazy(() => import("../pages/Home"));
const LazyDashboardPage = lazy(() => import("../pages/Dashboard"));

const Routes: React.FC = () => (
  <BrowserRouter>
    <AppRoutes>
      <Route path="/" element={<LazyHomePage />} />
      <Route path="/dashboard" element={<LazyDashboardPage />} />
    </AppRoutes>
  </BrowserRouter>
);

export default Routes;
