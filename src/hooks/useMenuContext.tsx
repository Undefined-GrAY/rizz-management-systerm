
import { createContext, useContext } from "react";
import type { MenusContextType } from "../types/types";

export const MenusContext = createContext<MenusContextType | undefined>(
  undefined,
);

export function useMenuContext() {
  const context = useContext(MenusContext);
  if (context === undefined) {
    throw new Error(
      "Menus compound components must be used within a <Menus />",
    );
  }
  return context;
}
