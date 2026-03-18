import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export function meta() {
  return [
    { title: "Quen mat khau" },
    { name: "description", content: "Khoi phuc mat khau tai khoan" },
  ];
}

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
