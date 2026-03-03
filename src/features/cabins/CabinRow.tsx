import { Table } from "../../ui/Table";
import { Icon } from "../../ui/Icon";
// import { useNavigate } from "react-router-dom";
import type { CabinApiType, CabinRowProps} from "../../types/types";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabin } from "../../service/apiCabins";
import { Button } from "../../ui/Button";
// import toast from "react-hot-toast";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CabinRowMobile from "./CabinRowMobile";
import useDeleteCabin from "./useDeleteCabin";

// export default function CabinRow({ mockCabins }: MockCabinProps) {
export default function CabinRow({ cabin }: CabinApiType) {
  // const { close } = useModal();
  // const navigate = useNavigate();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;


  const { isPending, mutate } = useDeleteCabin();

  return (
    <>
      <Table.Row className="hidden xl:table-row">
        <Table.Cell>
          <img
            src={image ?? undefined}
            className="w-16 h-12 rounded-lg"
            alt={name ?? ""}
          />
        </Table.Cell>
        <Table.Cell>
          <span className="font-semibold text-sm capitalize">{name}</span>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center gap-1.5">
            <Icon name="group" />
            <span className="text-sm">{maxCapacity} </span>
            <span className="text-sm">guests</span>
          </div>
        </Table.Cell>
        <Table.Cell className="text-sm font-bold text-primary">
          ${regularPrice}
        </Table.Cell>
        <Table.Cell className="text-sm font-medium italic">
          {discount ? ` ${discount} OFF` : "—"}
        </Table.Cell>
        <Table.Cell className="relative">
          {/* THE THREE DOT MENU */}
          <Modal>
            {/* 1. The Trigger */}
            <Modal.Open opens="delete-cabin">
              <Button icon={<Icon name="delete" />} variant="danger">
                Delete
              </Button>
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

      <CabinRowMobile cabin={cabin} mutate={mutate} isPending={isPending} />
    </>
  );
}
