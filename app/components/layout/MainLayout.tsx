import { Navigate, Outlet, useLocation } from "react-router";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { CartProvider } from "../../context/CartContext";
import { getAuthToken } from "../../services/auth";

export default function MainLayout() {
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

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Topbar />

        <main className="flex-1 bg-linear-to-br from-rose-50 via-rose-50 to-pink-50">
          <Outlet />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
