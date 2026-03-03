import { useModal } from "../hooks/useModalContext";
import type { ConfirmDeleteProps } from "../types/types";
import { Button } from "./Button";
// import { CloseBtn } from "./Modal"; //only used  as direct child to modal.window

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
}: ConfirmDeleteProps) {
  const { close } = useModal();

  return (
    <div className="flex max-w-max flex-col gap-5">
      <h3>Delete {resourceName}</h3>

      <div className="text-slate-500 dark:text-slate-400">
        <p>Are you sure you want to delete this {resourceName} permanently?</p>
        <p>This action cannot be undone.</p>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={close}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
