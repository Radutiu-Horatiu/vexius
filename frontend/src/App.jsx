import React, { useEffect } from "react";
import { Center, Flex, useMediaQuery } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";

import GlobalLoading from "./components/GlobalLoading";
import RequireAuth from "./components/routeMiddlewares/RequireAuth";
import RequireNotAuth from "./components/routeMiddlewares/RequireNotAuth";
import Screen from "./components/Screen";
import Navbar from "./components/Navbar";
import "./App.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import RightSideContent from "./components/RightSideContent";

const BuyVexcoins = React.lazy(() => import("./views/BuyVexcoins"));
const LandingPage = React.lazy(() => import("./views/LandingPage"));
const Home = React.lazy(() => import("./views/Home"));
const AddItem = React.lazy(() => import("./views/AddItem"));
const Profile = React.lazy(() => import("./views/Profile"));
const Success = React.lazy(() => import("./views/Success"));
const ItemScreen = React.lazy(() => import("./views/ItemScreen"));
const Requests = React.lazy(() => import("./views/Requests"));
const PageNotFound = React.lazy(() => import("./views/PageNotFound"));

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");

  // get home feed items
  useEffect(() => {
    (async () => {
      let allItems = await getDocs(collection(db, "items"));
      allItems = allItems.docs.map(doc => doc.data());
      dispatch.items.setData(allItems);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get requests
  useEffect(() => {
    if (!user) return;

    (async () => {
      let requestsRef = collection(db, "requests");
      const q = query(
        requestsRef,
        where("ownerPublicKey", "==", user.publicKey)
      );
      const querySnapshot = await getDocs(q);

      const requests = querySnapshot.docs
        .map(el => (el = { ...el.data(), id: el.id }))
        .sort((a, b) =>
          a.requestedAt.seconds < b.requestedAt.seconds ? 1 : -1
        );

      dispatch.requests.setData(requests);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // display more content if logged in and allowed on route
  const showContent = () => {
    return (
      location.pathname === "/add" ||
      location.pathname === "/buy" ||
      location.pathname === "/profile" ||
      location.pathname === "/send" ||
      location.pathname === "/requests" ||
      location.pathname.split("/")[1] === "item" ||
      location.pathname === "/home"
    );
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      justify={["flex-start", "flex-start", "center"]}
      overflow="hidden"
      pl={!minWidth1024 && "15vw"}
    >
      {/* Left side navbar */}
      {showContent() && <Navbar />}

      {/* Middle screens */}
      <Routes>
        <Route
          path="/"
          element={
            <RequireNotAuth>
              <React.Suspense fallback={<GlobalLoading />}>
                <LandingPage />
              </React.Suspense>
            </RequireNotAuth>
          }
        />

        <Route
          path="/home"
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
                <Screen name={"Get Vexcoins"}>
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
          path="/requests"
          element={
            <RequireAuth>
              <React.Suspense fallback={<GlobalLoading />}>
                <Screen name={"Requests"}>
                  <Requests />
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
                <Screen name={"My Profile"} padding={0}>
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

      {/* Right side content */}
      {showContent() && <RightSideContent />}
    </Flex>
  );
};

export default App;
