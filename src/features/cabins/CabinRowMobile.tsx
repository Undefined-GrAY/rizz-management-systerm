import { Table } from "../../ui/Table";
import { Modal } from "../../ui/Modal";
import { Icon } from "../../ui/Icon";
import { Button } from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import type {CabinRowMobileProps } from "../../types/types";



export default function CabinRowMobile({ cabin, mutate, isPending }: CabinRowMobileProps) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <Table.Row className="xl:hidden grid grid-cols-[2fr_1fr_1fr]  md:grid-cols-[1fr_1fr_1fr_1fr] items-center px-4 py-3 md:pb-3 gap-y-2 gap-x-4 ">
      <Table.Cell className=" ">
        <div className="flex gap-2 items-center">
          <div
            className="size-12 md:size-16  rounded-lg bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="flex flex-col gap-1 md:hidden">
            <span className="font-semibold text-sm capitalize">{name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{maxCapacity} </span>
              <span className="text-sm">guests</span>
            </div>
          </div>
        </div>
      </Table.Cell>
      {/* 3 */}
      <Table.Cell className="hidden md:block">
        <span className="font-semibold text-sm capitalize">{name}</span>
        <div className="flex items-center gap-1.5">
          <Icon name="group" />
          <span className="text-sm">{maxCapacity} </span>
          <span className="text-sm">guests</span>
        </div>
      </Table.Cell>
      {/* 2 */}
      <Table.Cell className="flex flex-col gap-1 ">
        <span className="text-sm font-bold text-primary">${regularPrice}</span>
        <span className="italic">{discount ? ` ${discount} OFF` : "—"}</span>
      </Table.Cell>

      {/* 1 */}
      <Table.Cell className="relative">
        {/* THE THREE DOT MENU */}
        <Modal>
          {/* 1. The Trigger */}
          <Modal.Open opens="delete-cabin">
            <Button
              size="sm"
              icon={<Icon name="delete" />}
              variant="danger"
            ></Button>
          </Modal.Open>

          {/* 2. The Window */}
          <Modal.Window name="delete-cabin">
            {/* This is the child that receives 'onCloseModal' via cloneElement */}
            <div>
              <ConfirmDelete
                resourceName={"cabin"}
                onConfirm={() => mutate(cabinId)}
                disabled={isPending}
              />
            </div>
          </Modal.Window>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}
