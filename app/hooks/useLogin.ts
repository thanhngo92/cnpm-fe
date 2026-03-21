import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { loginUser } from "../services/auth";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitLogin = async ({ email, password }: LoginPayload) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu");
      return false;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await loginUser({
        email: normalizedEmail,
        password,
      });

      const nextPath =
        typeof (location.state as { from?: unknown } | null)?.from === "string"
          ? (location.state as { from: string }).from
          : "/glowup";

      navigate(nextPath, { replace: true });
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Đăng nhập thất bại, vui lòng thử lại";
      setErrorMessage(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errorMessage,
    submitLogin,
  };
};

export default useLogin;