import { Navigate, Outlet, useLocation } from "react-router";

import { getAuthToken } from "../../services/user";

const RequireAuthLayout = () => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return (
      <Navigate
        to="/glowup/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuthLayout;
