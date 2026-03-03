import { createContext, useContext } from "react";
import type { ModalContextType } from "../types/types";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
