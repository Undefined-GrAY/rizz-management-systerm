// features/bookings/useBooking.ts

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../service/apiBookings";


export function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)), 
    retry: false,
  });

  return { booking, isLoading, error };
}