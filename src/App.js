import React, { lazy, Suspense } from "react";
import Router404 from "./404";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
const Dashboard = lazy(() => import("./dashboard"));
const Auth = lazy(() => import("./Auth"));
const DashboardChild = lazy(() => import("./dashboard-child"));

const router = createBrowserRouter([
  {
    path: "/",
    name: "Home",
    element: (
      <Suspense fallback={<>...</>}>
        <DashboardChild title="Home" />
      </Suspense>
    ),
  },
  {
    name: "Login",
    path: "/login",
    element: (
      <Suspense fallback={<>...</>}>
        <DashboardChild title="login" />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    locale: "dashboard",
    name: "Dashboard",
    icon: "dashboard",
    element: (
      <Suspense fallback={<>...</>}>
        <Dashboard title="Dashboard" />
      </Suspense>
    ),
    exact: true, // This route will only work for /dashboard. For dashboard/analysis or other this component will not be rendered
    component: "pages/dashboard",
    children: [
      {
        path: "/dashboard/analysis",
        locale: "dashboard.analysis",
        name: "analysis",
        element: <Auth role="admin" title="analysis" />,
        exact: true,
        accessTO: ["admin"], // Allow only admins to view this menu and access this page
      },
      {
        path: "/dashboard/monitor",
        locale: "dashboard.monitor",
        element: (
          <Suspense fallback={<>...</>}>
            <DashboardChild title="Monitor" />
          </Suspense>
        ),
        name: "monitor",
        exact: true,
      },
      {
        path: "/dashboard/workplace",
        locale: "dashboard.workplace",
        element: (
          <Suspense fallback={<>...</>}>
            <DashboardChild title="Workplace" />
          </Suspense>
        ),
        name: "workplace",
        exact: true,
      },
    ],
  },
  {
    path: "/projects",
    locale: "projects",
    name: "Projects",
    icon: "projects",
    element: (
      <Suspense fallback={<>...</>}>
        <Dashboard title="Project" />
      </Suspense>
    ),
    redirect: "/projects/list", //Redirect /projects to /projects/list
    children: [
      {
        path: "/projects/list",
        locale: "projects.list",
        name: "Projects",
        icon: "projects",
        element: (
          <Suspense fallback={<>...</>}>
            <DashboardChild title="list" />
          </Suspense>
        ),
        exact: true,
      },
      {
        path: "/projects/:id",
        locale: "projects.details",
        name: "Project Details",
        hideInMenu: true,
        icon: "projects",
        key: "projects",
        exact: true,
        element: (
          <Suspense fallback={<>...</>}>
            <DashboardChild title="details" />
          </Suspense>
        ),
      },
      {
        path: "/projects/:id/settings",
        locale: "projects.settings",
        icon: "settings",
        name: "Settings",
        parentKey: "details",
        exact: true,
        element: (
          <Suspense fallback={<>...</>}>
            <DashboardChild title="settings" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    component: "./404",
    element: <Router404 />,
  },
]);
const App = () => (
  <>
    <RouterProvider router={router} />
    <Outlet />
  </>
);
export default App;
