import LoginForm from "../../components/auth/LoginForm";

export function meta() {
  return [
    { title: "Dang nhap" },
    { name: "description", content: "Dang nhap tai khoan" },
  ];
}

export default function Login() {
  return <LoginForm />;
}
