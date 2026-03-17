import { Outlet } from "react-router";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { CartProvider } from "../../../context/CartContext";

export default function MainLayout() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Topbar />

        <main className="flex-1 bg-ui-page">
          <Outlet />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
