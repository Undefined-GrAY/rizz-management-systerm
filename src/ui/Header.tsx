import { NavLink, useNavigate } from "react-router-dom";

import { Icon } from "./Icon";
import { DarkModeToggle } from "./Darkmodetoggle";
import type { HeaderProps } from "../types/types";
import { useUser } from "../features/authentication/useUser";
import { logout } from "../service/apiAuth";

export function Header({
  title,
  description,
  showBackButton = false,
  onBack,
}: HeaderProps) {
  const navigate = useNavigate();

  const { user, isPending: loadingMetaData } = useUser();
  const {
    fullName: currentFullName,
    avatar: currentAvatar,
    email: userEmail,
  } = user?.user_metadata || {};
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", { replace: true });
    } catch (error) {
      // toast.error(error.message)
      console.error("Logout failed, but redirecting anyway");
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
      <div className="max-w-350 mx-auto xl:px-8 xl:py-5">
        {/* Row 1: Title + Primary Actions mb-5 for above div*/}
        <div className="flex items-center justify-between ">
          {/* Left: Title */}
          <div className="flex items-center md:gap-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="hidden xl:inline-block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Icon name="arrow_back" size={20} />
              </button>
            )}

            {/* title and description */}
            <div className="hidden xl:block">
              <h1 className="font-bold text-slate-900 dark:text-white">
                {title}
              </h1>
              {description && (
                <p className=" text-slate-500 dark:text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* desktop Right: Action Button + Dark Toggle */}
          <div className="hidden xl:flex items-center gap-3">
            <NavLink to="/account">
              <div className="profile flex  gap-4 items-center">
                <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  {/* <div
                    className="w-full h-full object-cover"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/48)` }}
                  ></div> */}
                  <img
                    src={currentAvatar}
                    alt={currentFullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden lg:block capitalize">
                  {currentFullName}
                </span>
              </div>
            </NavLink>
            <DarkModeToggle />
            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 py-2"
            >
              <Icon name="logout" />
            </button>
          </div>
        </div>

        {/* Row 2: Search, Filter, Sort */}
      </div>
    </header>
  );
}
