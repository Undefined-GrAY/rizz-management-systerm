
import useDeleteBooking from "./useDeleteBooking";
import type { BookingRowProps } from "../../types/types";
import BookingRowDesktop from "./BookingRowDekstop";
import BookingRowMobile from "./BookingRowMobile";


export const BookingRow = ({ booking }: BookingRowProps) => {
  const { isPending, mutate } = useDeleteBooking();
  return (
    <>
      <BookingRowDesktop
        booking={booking}
        mutate={mutate}
        isPending={isPending}
      />

      <BookingRowMobile
        booking={booking}
        mutate={mutate}
        isPending={isPending}
      />
    </>
  );
};
