import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-ui-page">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-transparent">
        <Header />

        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="mx-auto w-full max-w-360 px-6 py-7 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
