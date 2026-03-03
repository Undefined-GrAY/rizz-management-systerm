import { CountryFlag } from "../../data/getCountryFlag";

import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";

import { useCheckout } from "../../check-in-out/useCheckout";
import { useCheckin } from "../../check-in-out/useCheckin";
import { useNavigate } from "react-router-dom";

// interface Activity {
//   id: string;
//   type: "arriving" | "departing";
//   guestName: string;
//   country: string;
//   countryFlag: string;
//   nights: number;
// }

interface Activity {
  id: number;
  status: string;
  hasBreakfast: boolean;
  guests: { fullName: string; countryFlag: string; nationality: string };
  numNights: number;
}

interface TodayActivityProps {
  activities: Activity[];
}

export function TodayActivity({ activities }: TodayActivityProps) {
  const { checkin, isCheckingIn } = useCheckin(); //use to check in
  const { checkout, isCheckingOut } = useCheckout(); //use to check in

  const navigate = useNavigate();
  //Conditional checking in based off of breakfast
  function handleCheckIn({
    id: bookingId,
    hasBreakfast,
  }: {
    id: number;
    hasBreakfast: boolean;
  }) {
    if (hasBreakfast) {
      // const breakfastData = {}
      checkin({ bookingId });
    } else {
      navigate(`/bookings/${bookingId}`);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h3 className=" text-slate-900 dark:text-white">Today</h3>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="size-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Icon
                name="event_available"
                size={32}
                className="text-slate-400"
              />
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              No check-ins or check-outs today
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-center justify-between"
            >
              <div className="grid grid-cols-[6.5rem_1fr] items-center justify-between ">
                {/* Status Badge */}
                <div className="shrink-0">
                  {activity.status === "checked-in" ? (
                    <Badge status="checked-in" variant={true} />
                  ) : (
                    <Badge status="unconfirmed" variant={true} />
                  )}
                </div>

                {/* Guest Info */}
                <div className="flex items-center gap-2">
                  {/* className="text-lg" */}

                  <CountryFlag country={activity.guests.nationality} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white truncate-guest-name">
                      {activity.guests.fullName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {activity.numNights} nights
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                size="sm"
                disabled={isCheckingIn || isCheckingOut}
                onClick={() =>
                  activity.status === "unconfirmed"
                    ? handleCheckIn({
                        id: activity.id,
                        hasBreakfast: activity.hasBreakfast,
                      })
                    : checkout(activity.id)
                }
                variant={
                  activity.status === "unconfirmed" ? "primary" : "secondary"
                }
                className="shrink-0"
              >
                {activity.status === "unconfirmed" ? "Check In" : "Check Out"}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
