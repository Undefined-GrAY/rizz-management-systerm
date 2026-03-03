import { useLocation } from "react-router-dom";
import { format, isSameYear, parseISO } from "date-fns";

export function formatBookingDate(dateStr: string) {
  const date = parseISO(dateStr);
  const now = new Date();

  if (isSameYear(date, now)) {
    return format(date, "MMM dd");
  }

  return format(date, "MMM dd yyyy");
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

export const pathInspector = () => {
  const { pathname } = useLocation();

  // Logic:
  // 1. Split string by '/' -> ["", "users", "123"]
  // 2. Filter out empty strings caused by the leading slash
  // 3. Grab the first index [0]
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  return firstSegment;
};

export const breakString = (str: string): string => {
  if (str.length === 3) {
    // Splits '102' into '10\n2'
    return `${str.slice(0, 2)}\n${str.slice(2)}`;
  }
  return str;
};
