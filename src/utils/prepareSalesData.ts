import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import type { recentBooking } from "../types/types";

export const prepareSalesData = (bookings: recentBooking, numDays: number) => {
  // 1. Create an array of dates for the last X days
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // 2. Transform into the format Recharts needs
  const data = allDates.map((date) => {
    // Find all bookings that happened on THIS specific day
    const dayBookings = bookings.filter((booking) =>
      isSameDay(new Date(booking.created_at), date),
    );

    return {
      date: format(date, "MMM dd"),
      // The big total (Cabin + Extras)
      totalSales: dayBookings.reduce(
        (acc, cur) => acc + (cur.totalPrice || 0),
        0,
      ),
      // Just the extras to see the "upsell" performance
      extrasSales: dayBookings.reduce(
        (acc, cur) => acc + (cur.extraPrice || 0),
        0,
      ),
    };
  });


  return data;
};
