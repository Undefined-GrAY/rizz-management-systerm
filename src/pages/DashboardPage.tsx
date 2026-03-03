import { Header } from "../ui/Header";
import { Filter } from "../ui/Filter";
import { StatCard } from "../features/dashboard/StatCard";
import { TodayActivity } from "../features/dashboard/TodayActivity";
import { DurationChart } from "../features/dashboard/DurationChart";
import { SalesChart } from "../features/dashboard/SalesChart";
import SubMain from "../ui/SubMain";
import { useQuery } from "@tanstack/react-query";
import { getTodaysActivity } from "../service/apiBookings";
import { Spinner } from "../ui/Spinner";
import ErrorFallback from "../ui/ErrorFallback";
import { useRecentBookings } from "../features/dashboard/useRecentBooking";
import { seedDatabase } from "../utils/nuclearSeeds"; // adjust path
import { Button } from "../ui/Button";
import { calculateDashboardStats } from "../utils/DashboardStats";
import UseCabins from "../features/cabins/UseCabins";
import { useSearchParams } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";
import { useUser } from "../features/authentication/useUser";

const filterOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

export default function DashboardPage() {
  const {
    data: recentActivity,
    isPending,
    error,
  } = useQuery({
    queryKey: ["Today"],
    queryFn: getTodaysActivity,
  });

  const [searchParams] = useSearchParams();

  const filterValue = Number(searchParams.get("last")) || 7;

  const {
    isPending: isLoadingBookingData,
    error: bookingError,
    dashboardBookings,
  } = useRecentBookings();

  const { isPending: loadingCabin, cabins, error: cabinError } = UseCabins();
  // console.log("dashboard:", dashboardBookings);
  // console.log("recentActivities:",recentActivity);

  const { numBookings, totalSales, checkins, occupancyRate } =
    calculateDashboardStats(dashboardBookings, cabins, filterValue);

  const { isPending: isLoadingUser, user, isAdmin } = useUser();
  //  console.log('admin:', isAdmin)
  // console.log('dashoard page:',numBookings, totalSales, checkins)
  if (isPending || isLoadingBookingData || loadingCabin)
    return (
      <>
        <Header
          title="Dashboard"
          description="Overview of hotel operations and activities"
        />
        <SubMain>
          <div className=" space-y-6 lg:space-y-8">
            <Spinner />
          </div>
        </SubMain>
      </>
    );
  if (error || bookingError || cabinError)
    return (
      <ErrorFallback apiError={String(error || bookingError || cabinError)} />
    );
  return (
    <>
      <Header
        title="Dashboard"
        description="Overview of hotel operations and activities"
      />
      <SubMain>
        <div className=" space-y-6 lg:space-y-8">
          <div className="flex justify-between">
            <div>
              {/* seeing button */}
              {isAdmin && (
                <Button
                  disabled={isLoadingUser || !isAdmin}
                  onClick={seedDatabase}
                  className="bg-red-600 text-white p-2 rounded"
                >
                  Clear & Re-Seed Database
                </Button>
              )}
            </div>
            <Filter filterField={"last"} options={filterOptions} />
          </div>

          {/* Stats Grid p-8 */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-6">
            <StatCard
              title="Bookings"
              value={numBookings}
              icon="calendar_month"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              title="Sales"
              value={formatCurrency(totalSales)}
              icon="payments"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
            />
            <StatCard
              title="Check ins"
              value={checkins}
              icon="login"
              iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
              iconColor="text-indigo-600 dark:text-indigo-400"
            />
            <StatCard
              title="Occupancy rate"
              value={occupancyRate}
              icon="show_chart"
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
              iconColor="text-yellow-600 dark:text-yellow-400"
            />
          </div>

          {/* Today Activity + Duration Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <TodayActivity activities={recentActivity} />
            <DurationChart recentBookings={dashboardBookings} />
          </div>

          {/* Sales Chart */}
          <SalesChart recentBookings={dashboardBookings} />
        </div>
      </SubMain>
    </>
  );
}
