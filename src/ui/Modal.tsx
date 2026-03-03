import { cloneElement, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import { useOutsideClick } from "./Useoutsideclick";
import type {
  ModalOpenProps,
  ModalProps,
  ModalWindowProps,
  ModalComponent,
  ModalSubComponentProps,
  CloseBtnProp,
} from "../types/types";
import { ModalContext, useModal } from "../hooks/useModalContext";

// Define as a standard function first
const Modal: ModalComponent = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

//l

Modal.Open = function Open({
  children,
  opens: opensWindowName,
}: ModalOpenProps) {
  const { open } = useModal();

  // No more "as any" needed!
  // TypeScript knows 'children' is a ReactElement that can handle onClick.
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
};

Modal.Window = function Window({ children, name }: ModalWindowProps) {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      {/* Modal Content  w-full*/}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-4 py-8 md:p-8 md:pt-12  transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <Icon name="close" size={20} />
        </button>

        <div>
          {/* We pass close as 'onCloseModal' so child forms can close the modal after submission */}
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
};

Modal.Header = ({ children, className = "" }: ModalSubComponentProps) => (
  <div className={`mb-4 ${className}`}>
    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
      {children}
    </h2>
  </div>
);

Modal.Body = ({ children, className = "" }: ModalSubComponentProps) => (
  <div className={`py-2 ${className}`}>{children}</div>
);

Modal.Footer = ({ children, className = "" }: ModalSubComponentProps) => (
  <div
    className={`mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 ${className}`}
  >
    {children}
  </div>
);

export { Modal };

//only used  as direct child to modal.window
export const CloseBtn = ({ onCloseModal }: CloseBtnProp) => (
  <button onClick={onCloseModal}>Close Me</button>
);
