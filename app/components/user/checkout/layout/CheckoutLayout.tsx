import { Outlet } from "react-router";
import Topbar from "./Topbar";

export default function CheckoutLayout() {
  return (
    <div className="min-h-full">
      <Topbar />

      <main className="max-w-7xl mx-auto px-4 pt-12 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
