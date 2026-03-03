import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateBooking, updateCheckinWithCalc } from "../service/apiBookings"; // Adjust path
import { type Database } from "../types/supabase"; // Adjust path

// Define the arguments for the mutation function
interface CheckinArgs {
  bookingId: number;
  breakfastData?: {
    hasBreakfast: boolean;
  };
}

// Get the Row type for a booking so onSuccess knows what 'data' is
type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation<
    BookingRow, // The type of 'data' returned by onSuccess
    Error, // The type of error
    CheckinArgs // The type of variables passed to mutate()
  >({
    mutationFn: ({ bookingId, breakfastData }) => {
      if (breakfastData && Object.keys(breakfastData).length > 0) {
        const hasBreakfast = breakfastData.hasBreakfast;
        return updateCheckinWithCalc(bookingId, hasBreakfast);
      } else {
        //     // Dashboard path: No new data, just flip the status
        return updateBooking(bookingId, { status: "checked-in", isPaid: true });
      }
    },
    // updateCheckin(bookingId, hasBreakfast),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ type: "active" });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}

// // Inside your useCheckin hook
// mutationFn: ({ bookingId, breakfastData }) => {
//   // Check if breakfastData exists and isn't empty
//   if (breakfastData && Object.keys(breakfastData).length > 0) {

//     // Destructure ONLY what the calc function needs
//     const { hasBreakfast, numGuests, numNights } = breakfastData;

//     // Send those specific values to your special backend function
//     return updateCheckinWithCalc(bookingId, { hasBreakfast, numGuests, numNights });
//   } else {
//     // Dashboard path: No new data, just flip the status
//     return updateBooking(bookingId, { status: "checked-in", isPaid: true });
//   }
// }
