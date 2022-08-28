import React from "react";
import { Center, Flex } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";

import GlobalLoading from "./components/GlobalLoading";
import RequireAuth from "./components/routeMiddlewares/RequireAuth";
import Screen from "./components/Screen";
import Navbar from "./components/Navbar";
import "./App.css";

const BuyVexcoins = React.lazy(() => import("./views/BuyVexcoins"));
const Home = React.lazy(() => import("./views/Home"));
const CreateItem = React.lazy(() => import("./views/CreateItem"));
const Profile = React.lazy(() => import("./views/Profile"));
const Success = React.lazy(() => import("./views/Success"));
const PageNotFound = React.lazy(() => import("./views/PageNotFound"));

const App = () => {
  const location = useLocation();

  return (
    <Center h={"100vh"} w="100vw">
      <Flex w={"75vw"} h={"100%"}>
        {(location.pathname === "/create" ||
          location.pathname === "/buy" ||
          location.pathname === "/profile" ||
          location.pathname === "/") && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<GlobalLoading />}>
                <Screen name={"Home"}>
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
                  <Screen name={"Buy Vexcoins"}>
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
                  <Screen name={"Create Item"}>
                    <CreateItem />
                  </Screen>
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <React.Suspense fallback={<GlobalLoading />}>
                  <Screen name={"My Profile"}>
                    <Profile />
                  </Screen>
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/success"
            element={
              <React.Suspense fallback={<GlobalLoading />}>
                <Center h={"100vh"} w={"100vw"}>
                  <Success />
                </Center>
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<GlobalLoading />}>
                <Center h={"100vh"} w={"100vw"}>
                  <PageNotFound />
                </Center>
              </React.Suspense>
            }
          />
        </Routes>
      </Flex>
    </Center>
  );
};

export default App;
