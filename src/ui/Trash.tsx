import React from 'react'

export default function OriginalBookingTableRow() {
  return (
          <Table.Row className="hidden xl:table-row">
        {/* Cabin */}
        <Table.Cell>
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-lg bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${cabinImage})` }}
            />
            <span className="font-semibold text-sm">{cabinName}</span>
          </div>
        </Table.Cell>

        {/* Guest */}
        <Table.Cell>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {guestName}
            </span>
            <span className="text-xs text-slate-500">{guestEmail}</span>
          </div>
        </Table.Cell>

        {/* Dates */}
        <Table.Cell>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {format(new Date(startDate), "MMM dd yyyy")} —{" "}
              {format(new Date(endDate), "MMM dd yyyy")}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
              {numNights} {numNights === 1 ? "night" : "nights"}
            </span>
          </div>
        </Table.Cell>

        {/* Status */}
        <Table.Cell>
          <Badge status={status} />
        </Table.Cell>

        {/* Amount */}
        <Table.Cell>
          <span className="text-sm font-bold text-primary">
            ${totalPrice.toFixed(2)}
          </span>
        </Table.Cell>

        {/* Actions - Using the Reusable Menu */}
        <Table.Cell className="text-right">
          <div className="relative inline-block text-left">
            <Modal>
              <Menus>
                <Menus.Toggle id={String(bookingId)} />
                {/*list*/}
                <Menus.List id={String(bookingId)}>
                  <Menus.Action icon="visibility">
                    <Link to={`/bookings/bookingdetail/${bookingId}`}>
                      View Details
                    </Link>
                  </Menus.Action>

                  <Modal.Open opens="delete-booking">
                    <li className="flex items-center justify-start gap-3 px-4 py-2.5 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Icon
                        name="delete"
                        size={18}
                        className="text-slate-400 "
                      />
                      <button
                        className="w-full text-sm font-semibold p-0 text-slate-700 dark:text-slate-400 text-left"
                        onClick={() => console.log("Delete", bookingId)}
                      >
                        Delete
                      </button>
                    </li>
                  </Modal.Open>
                </Menus.List>
                <Modal.Window name="delete-booking">
                  {/* This is the child that receives 'onCloseModal' via cloneElement */}
                  <div>
                    <ConfirmDelete
                      resourceName={"cabin"}
                      onConfirm={() => mutate(bookingId)}
                      disabled={isPending}
                    />
                  </div>
                </Modal.Window>
              </Menus>
            </Modal>
          </div>
        </Table.Cell>
      </Table.Row>
  )
}
