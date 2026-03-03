import { NavLink } from "react-router-dom";
import { Icon } from "./Icon";
import Logo from "./Logo";
import { Button } from "./Button";

const navItems = [
  {
    icon: "dashboard",
    label: "Dashboard",
    to: "dashboard",
  },
  {
    icon: "calendar_today",
    label: "Bookings",
    to: "bookings",
  },
  { icon: "meeting_room", label: "Cabins", to: "cabins" },
  { icon: "group", label: "Users", to: "users" },
  { icon: "settings", label: "Settings", to: "settings" },
];

// const base= " w-76 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col fixed inset-y-0 left-0 z-50"
export const Sidebar = ({ user }) => {
  const responsiveSideBar = {
    lg: "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50",
  };
  const mobileSideBar =
    "flex flex-col fixed inset-y-0 left-0 z-50 md:hidden -translate-x-76 transition-transform duration-300 ease-in-out shadow-[2px_0_10px_rgba(0,0,0,0.2)]";

  return (
    <>
      <aside className="hidden xl:flex w-76 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900  flex-col fixed inset-y-0 left-0 z-50">
        {/* Logo */}

        <div className="p-6">
          <div className=" gap-3 mb-10 mt-24">
            <Logo className="mb-1 mx-auto" />
            {/* text-xl */}
            <h1 className="logo-text font-bold tracking-tight text-center text-slate-900 dark:text-white ">
              Rizz Hotel
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={false}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary/10 text-primary "
                    : "flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      name={item.icon}
                      className={
                        isActive
                          ? ""
                          : "group-hover:text-primary transition-colors"
                      }
                    />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <NavLink to="account">
              <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </NavLink>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
            <Button variant="ghost">
              <Icon name="logout" />
            </Button>
          </div>
        </div>
      </aside>
      <aside className=" flex flex-col fixed inset-y-0 left-0 z-50 md:hidden -translate-x-76 transition-transform duration-300 ease-in-out shadow-[2px_0_10px_rgba(0,0,0,0.2)] w-76 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Logo */}

        <div className="p-6">
          <div className=" gap-3 mb-10 mt-24">
            <Logo />
            {/* text-xl */}
            <h1 className="logo-text font-bold tracking-tight text-center text-slate-900 dark:text-white ">
              Rizz Hotel
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary/10 text-primary "
                    : "flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      name={item.icon}
                      className={
                        isActive
                          ? ""
                          : "group-hover:text-primary transition-colors"
                      }
                    />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <NavLink to="account">
              <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </NavLink>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
            <Button variant="ghost">
              <Icon name="logout" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
