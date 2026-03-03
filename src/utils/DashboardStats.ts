interface Booking {
  totalPrice: number | null;
  status: string | null;
  numNights: number | null;
}

interface Cabin {
  id: number;
}

interface DashboardStats {
  numBookings: number;
  totalSales: number;
  checkins: number;
  occupancyRate: string;
}

export function calculateDashboardStats(
  bookings: Booking[] | undefined, 
  cabins: Cabin[] | undefined, 
  numDays: number
): DashboardStats {
  // 1. Num Bookings
  const numBookings = bookings?.length ?? 0;

  // 2. Total Sales
  const totalSales = bookings?.reduce((acc, cur) => acc + (cur.totalPrice || 0), 0) ?? 0;

  // 3. Check-ins (confirmed stays)
  const checkins = bookings?.filter(
    (booking) => booking.status === 'checked-in' || booking.status === 'checked-out'
  ).length ?? 0;

  // 4. Occupancy Rate
  const numCabins = cabins?.length ?? 0;
  const totalAvailableNights = numCabins * numDays;
  const occupiedNights = bookings?.reduce((acc, cur) => acc + (cur.numNights || 0), 0) ?? 0;

  const occupancyRate = totalAvailableNights > 0 
    ? Math.round((occupiedNights / totalAvailableNights) * 100) 
    : 0;

  return {
    numBookings,
    totalSales,
    checkins,
    occupancyRate: `${occupancyRate}%`,
  };
}