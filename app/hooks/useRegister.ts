import { useState } from "react";
import { useNavigate } from "react-router";

import { registerUser } from "../services/user";

type RegisterPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const validateRegisterPayload = ({
  fullName,
  email,
  phoneNumber,
  password,
  confirmPassword,
}: RegisterPayload): string => {
  if (
    !fullName.trim() ||
    !email.trim() ||
    !phoneNumber.trim() ||
    !password ||
    !confirmPassword
  ) {
    return "Please fill in all required fields";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

export const useRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRegister = async ({
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  }: RegisterPayload) => {
    const validationError = validateRegisterPayload({
      fullName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });

    if (validationError) {
      setErrorMessage(validationError);
      return false;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await registerUser({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        password,
      });

      navigate("/glowup/login", { replace: true });
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed, please try again";
      setErrorMessage(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errorMessage,
    submitRegister,
  };
};

export default useRegister;