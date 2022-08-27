import React from "react";
import { Route, Routes } from "react-router-dom";

import GlobalLoading from "./components/GlobalLoading";
import RequireAuth from "./components/routeMiddlewares/RequireAuth";
import Screen from "./components/Screen";

const BuyVexcoins = React.lazy(() => import("./views/BuyVexcoins"));
const Home = React.lazy(() => import("./views/Home"));
const CreateItem = React.lazy(() => import("./views/CreateItem"));
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
            <Screen>
              <Home />
            </Screen>
          </React.Suspense>
        }
      />

      <Route
        path="/buy"
        element={
          <RequireAuth>
            <React.Suspense fallback={<GlobalLoading />}>
              <Screen>
                <BuyVexcoins />
              </Screen>
            </React.Suspense>
          </RequireAuth>
        }
      />

      <Route
        path="/create"
        element={
          <RequireAuth>
            <React.Suspense fallback={<GlobalLoading />}>
              <Screen>
                <CreateItem />
              </Screen>
            </React.Suspense>
          </RequireAuth>
        }
      />

      <Route
        path="/login"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Screen>
              <Login />
            </Screen>
          </React.Suspense>
        }
      />

      <Route
        path="/success"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Screen>
              <Success />
            </Screen>
          </React.Suspense>
        }
      />

      <Route
        path="*"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Screen>
              <PageNotFound />
            </Screen>
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default App;
