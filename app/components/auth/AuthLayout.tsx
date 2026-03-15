import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#fff7ed_0%,#ffffff_45%,#f8fafc_100%)]">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
