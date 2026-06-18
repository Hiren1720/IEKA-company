import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/auth-store";
import { getDefaultRouteByRole } from "../utils/permission";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({
  children,
}: PublicRouteProps) => {
  const {accessToken, user} = useAuthStore((state) => state);
  const pathName = getDefaultRouteByRole(user?.role);

  return accessToken ? (
    <Navigate to={pathName} replace />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;