import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../../contexts/AuthContext";
import GlobalLoading from "../GlobalLoading";
import { useEffect } from "react";

const RequireNotAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isUserInitialized = useSelector(state => state.user.initialized);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/home");

    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (!isUserInitialized) return <GlobalLoading />;

  return children;
};

export default RequireNotAuth;
