import RegisterForm from "../../components/auth/RegisterForm";

export function meta() {
  return [
    { title: "Dang ky" },
    { name: "description", content: "Tao tai khoan moi" },
  ];
}

export default function Register() {
  return <RegisterForm />;
}
