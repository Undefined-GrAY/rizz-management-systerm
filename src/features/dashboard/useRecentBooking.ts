import { useQuery } from "@tanstack/react-query";
import { getRecentBookings } from "../../service/apiBookings";
import { subDays } from "date-fns";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = Number(searchParams.get("last")) || 7;

  const filter: string = useMemo(
    () => subDays(new Date(), filterValue).toISOString(),
    [filterValue],
  );

  // QUERY
  const {
    isPending,
    data: dashboardBookings = [],
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getRecentBookings(filter),
  });

  return { isPending, error, dashboardBookings};
}