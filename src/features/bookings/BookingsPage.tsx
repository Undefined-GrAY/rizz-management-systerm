
import { Header } from "../../ui/Header";

import { BookingsTable } from "./BookingsTable";

export default function BookingsPage() {
  return (
    <>
      <Header
        title="Bookings"
        description="Manage and monitor all your guest stays and reservations in one place."
      />
      <BookingsTable />
    </>
  );
}
