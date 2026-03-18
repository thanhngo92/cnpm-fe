import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-rose-50 via-white to-rose-100/40">
      {/* Soft radial glow - feminine, subtle */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-rose-200/30 blur-3xl" />
      <div className="absolute -bottom-40 left-0 w-72 h-72 bg-pink-100/25 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
