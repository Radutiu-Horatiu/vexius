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
const AddItem = React.lazy(() => import("./views/AddItem"));
const Profile = React.lazy(() => import("./views/Profile"));
const Success = React.lazy(() => import("./views/Success"));
const ItemScreen = React.lazy(() => import("./views/ItemScreen"));
const PageNotFound = React.lazy(() => import("./views/PageNotFound"));

const App = () => {
  const location = useLocation();

  return (
    <Center h={"100vh"} w="100vw">
      <Flex h={"100%"}>
        {(location.pathname === "/add" ||
          location.pathname === "/buy" ||
          location.pathname === "/profile" ||
          location.pathname === "/send" ||
          location.pathname === "/transfer" ||
          location.pathname.split("/")[1] === "item" ||
          location.pathname === "/") && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<GlobalLoading />}>
                <Screen name={"Home"} padding={0}>
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
            path="/add"
            element={
              <RequireAuth>
                <React.Suspense fallback={<GlobalLoading />}>
                  <Screen name={"Add Item"}>
                    <AddItem />
                  </Screen>
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/item/:id"
            element={
              <RequireAuth>
                <React.Suspense fallback={<GlobalLoading />}>
                  <Screen name={"Item"}>
                    <ItemScreen />
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
