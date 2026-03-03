import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { mockUser } from "../data/MockData";

export default function AppLayout() {
  return (
    <div className=" min-h-screen flex bg-background-light dark:bg-background-dark">
      <Sidebar user={mockUser} />

      <div id="overlay"></div>
      <main className="flex-1 xl:ml-76 min-h-screen  flex flex-col bg-slate-50/50 dark:bg-background-dark">
        <Outlet /> {/* Pages render here */}
      </main>
    </div>
  );
}
