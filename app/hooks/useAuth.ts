import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { getAuthToken, getUser } from "../services/user";
import type { TypeUser } from "../type/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<TypeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isAuthPage =
    location.pathname.startsWith("/glowup/login") ||
    location.pathname.startsWith("/glowup/register") ||
    location.pathname.startsWith("/glowup/forgot-password");

  useEffect(() => {
    if (isAuthPage) {
      setIsLoading(false);
      return;
    }

    if (!getAuthToken()) {
      setIsError(true);
      setIsLoading(false);
      navigate("/glowup/login", { replace: true });
      return;
    }

    const loadUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
        setIsError(false);
      } catch {
        setIsError(true);
        navigate("/glowup/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate, isAuthPage]);

  return {
    user,
    isLoading,
    isError,
  };
};

export default useAuth;
