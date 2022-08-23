import React from "react";
import { Route, Routes } from "react-router-dom";

import GlobalLoading from "./components/GlobalLoading";
import RequireAuth from "./components/routeMiddlewares/RequireAuth";
import RequireNotAuth from "./components/routeMiddlewares/RequireNotAuth";

const Home = React.lazy(() => import("./views/Home"));
const Protected = React.lazy(() => import("./views/Protected"));
const Login = React.lazy(() => import("./views/Login"));
const PageNotFound = React.lazy(() => import("./views/PageNotFound"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Home />
          </React.Suspense>
        }
      />

      <Route
        path="/protected"
        element={
          <RequireAuth>
            <React.Suspense fallback={<GlobalLoading />}>
              <Protected />
            </React.Suspense>
          </RequireAuth>
        }
      />

      <Route
        path="/login"
        element={
          <RequireNotAuth>
            <React.Suspense fallback={<GlobalLoading />}>
              <Login />
            </React.Suspense>
          </RequireNotAuth>
        }
      />

      <Route
        path="*"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <PageNotFound />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default App;
