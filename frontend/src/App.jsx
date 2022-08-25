import React from "react";
import { Route, Routes } from "react-router-dom";

import GlobalLoading from "./components/GlobalLoading";
import RequireAuth from "./components/routeMiddlewares/RequireAuth";
import RequireNotAuth from "./components/routeMiddlewares/RequireNotAuth";

const Home = React.lazy(() => import("./views/Home"));
const Login = React.lazy(() => import("./views/Login"));
const Success = React.lazy(() => import("./views/Success"));
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
        path="/login"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Login />
          </React.Suspense>
        }
      />

      <Route
        path="/success"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Success />
          </React.Suspense>
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
