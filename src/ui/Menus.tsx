import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon"; // Adjust path as needed
// import { Modal } from "./Modal";
import { MenusContext, useMenuContext } from "../hooks/useMenuContext";
import type {
  MenusActionProps,
  MenusListProps,
  MenusProps,
  MenusToggleProps,
  Position,
} from "../types/types";
import { Button } from "./Button";

export function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);
  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: MenusToggleProps) {
  const { openId, close, open, setPosition } = useMenuContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const rect = target.closest("button")?.getBoundingClientRect();

    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
      console.log("close", 1);
    }
  }

  return (
    <Button onClick={handleClick} variant="ghost" data-toggle-id={id}>
      <Icon name="more_vert" size={20} className="text-slate-500" />
    </Button>
  );
}

function List({ id, children }: MenusListProps) {
  const { openId, close, position } = useMenuContext();
  const ref = useRef<HTMLUListElement>(null);


  useEffect(() => {
    const handleOutsideClick: EventListener = (e) => {
      // 1. If the menu is closed, do nothing
      if (openId !== id) return;

      // 2. Check if we are clicking the toggle button associated with this menu and We look for the data attribute we added in the Toggle component
      const target = e.target as HTMLElement;
      const isToggle = target.closest(`[data-toggle-id="${id}"]`);

      // 3. Only close if the click is outside the list AND it's not the toggle button (The toggle button has its own onClick logic to handle closing)
      if (ref.current && !ref.current.contains(target) && !isToggle) {
        close();
      }
    };

    // Using false (Bubbling) is usually safer for this logic than Capture (true)
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [close, openId, id]);

  if (id !== openId) return null;

  return createPortal(
    <ul
      ref={ref}
      className="fixed z-50 min-w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200"
      style={{
        right: `${position?.x}px`,
        top: `${position?.y}px`,
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Action({ children, onClick, icon }: MenusActionProps) {
  const { close } = useMenuContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <Button
        onClick={handleClick}
        className="w-full flex items-center justify-start gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
        variant="ghost"
      >
        {icon && <Icon name={icon} size={18} className="text-slate-400" />}
        <span>{children}</span>
      </Button>
    </li>
  );
}

// function Action({ children, onClick, icon }: MenusActionProps) {
//   const { close } = useMenuContext();

//   function handleClick() {
//     onClick?.();
//     close();
//   }

//   return (
//     <li>
//       <button
//         onClick={handleClick}
//         className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
//       >
//         {icon && <Icon name={icon} size={18} className="text-slate-400" />}
//         <span>{children}</span>
//       </button>
//     </li>
//   );
// }

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Action = Action;
