import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../ui/Icon";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Modal } from "../../ui/Modal";
import type { BookingDetailHeroProps } from "../../types/types";

export default function BookingDetailContent({
  booking,
  onCheckIn,
  onCheckOut,
  onDelete,
  onCancel,
}: BookingDetailHeroProps) {
  const [breakfastIncluded, setBreakfastIncluded] = useState(
    booking.hasBreakfast ?? false,
  );
  const [paymentConfirmed, setPaymentConfirmed] = useState(
    booking.isPaid || false,
  );
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const stayPrice = booking.cabins.regularPrice * booking.numNights;
  const breakfastTotal = breakfastIncluded
    ? (booking.extraPrice || 5) * booking.numGuests * booking.numNights
    : 0;
  const totalAmount = stayPrice + breakfastTotal;

  // Format created date
  const bookedDate = new Date(booking.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(booking);
  const handleCheckIn = async () => {
    if (!paymentConfirmed) {
      alert("Please confirm payment before checking in");
      return;
    }
    setIsCheckingIn(true);
    await onCheckIn({
      bookingId: booking.id,
      breakfastIncluded,
      totalAmount,
    });
    setIsCheckingIn(false);
  };

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    await onCheckOut(booking.id);
    setIsCheckingOut(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(booking.id);
    navigate("/bookings");
  };

  const isCheckedIn = booking.status === "checked-in";
  const isCheckedOut = booking.status === "checked-out";

  return (
    <div className="space-y-8">
      {/* Hero Section - Cabin Image with Overlays */}
      <div className="relative h-96  overflow-hidden shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${booking.cabins.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Status Badge - Top Left */}
        <div className="absolute top-6 left-6">
          <Badge status={booking.status} />
        </div>

        {/* Cabin Info - Top Right */}
        <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl">
          <h2 className=" text-slate-900 dark:text-white mb-1">
            {booking.cabins.name}
          </h2>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Icon name="group" size={16} />
            <span className="text-sm font-medium">
              {booking.numGuests} guests
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-sm font-medium">
              {booking.numNights} nights
            </span>
          </div>
        </div>

        {/* Guest Card - Bottom Left */}
        <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl p-2 md:p-6 shadow-xl max-w-md">
          <div className="flex items-start gap-2 md:gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              <div
                style={{ backgroundImage: `url(${booking.guests.image})` }}
                className=" size-12 lg:size-16 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg "
              ></div>
            </div>

            {/* Guest Info */}
            <div className="flex-1">
              <h3 className=" text-slate-900 dark:text-white md:mb-1">
                {booking.guests.fullName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                {booking.guests.email}
              </p>

              {/* Guest Details Grid */}
              <div className="grid grid-cols-2 md:gap-x-6 gap-y-3">
                <div className="flex flex-col  md:block">
                  <p className="text-xs text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wide mb-1">
                    Country
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {booking.guests.nationality}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wide mb-1">
                    National ID
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                    {booking.guests.nationalID}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Booking Info Card */}
        <div className="bg-linear-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="schedule" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Booked on
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {bookedDate}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Booking ID
              </p>
              <p className="font-mono font-bold text-slate-900 dark:text-white">
                #{booking.id}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Options Card - Only show if not checked out */}
        {!isCheckedOut && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Booking Options
            </h3>

            <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group border border-transparent hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="restaurant" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Breakfast included
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ${booking.extraPrice || 5} per person per night
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={breakfastIncluded}
                  onChange={(e) => setBreakfastIncluded(e.target.checked)}
                  disabled={isCheckedIn || isCheckedOut}
                  className="peer sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    breakfastIncluded
                      ? "bg-primary"
                      : "bg-slate-300 dark:bg-slate-600"
                  } ${(isCheckedIn || isCheckedOut) && "opacity-50"}`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow-md transition-transform ${
                      breakfastIncluded ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Payment Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
            Payment Summary
          </h3>

          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">
                Cabin ({booking.numNights} nights × $
                {booking.cabins.regularPrice})
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${stayPrice.toFixed(2)}
              </span>
            </div>

            {breakfastIncluded && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Breakfast ({booking.numGuests} guests × {booking.numNights}{" "}
                  nights)
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ${breakfastTotal.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Total Amount */}
          <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-primary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Payment Confirmation Checkbox - Only show if not checked in/out */}
          {!isCheckedIn && !isCheckedOut && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div
                    className={`size-5 rounded border-2 transition-all ${
                      paymentConfirmed
                        ? "bg-primary border-primary"
                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {paymentConfirmed && (
                      <Icon name="check" size={14} className="text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    Confirm payment received
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    I confirm that{" "}
                    <span className="font-medium text-slate-900 dark:text-white">
                      {booking.guests.fullName}
                    </span>{" "}
                    has paid the total amount of{" "}
                    <span className="font-medium text-primary">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          {/* Left - Delete Button */}
          <Modal>
            <Modal.Open opens="delete-booking">
              <Button
                variant="danger"
                size="lg"
                icon={<Icon name="delete" size={18} />}
                disabled={isDeleting}
              >
                Delete Booking
              </Button>
            </Modal.Open>

            <Modal.Window name="delete-booking">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Icon
                      name="warning"
                      size={24}
                      className="text-red-600 dark:text-red-400"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Delete Booking
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Are you sure you want to delete booking{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    #{booking.id}
                  </span>{" "}
                  for{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {booking.guests.fullName}
                  </span>
                  ? All booking data will be permanently removed.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <Modal.Open opens="">
                    <Button variant="secondary" size="lg">
                      Cancel
                    </Button>
                  </Modal.Open>
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    icon={
                      isDeleting ? (
                        <Icon
                          name="refresh"
                          className="animate-spin"
                          size={18}
                        />
                      ) : (
                        <Icon name="delete" size={18} />
                      )
                    }
                  >
                    {isDeleting ? "Deleting..." : "Delete Booking"}
                  </Button>
                </div>
              </div>
            </Modal.Window>
          </Modal>

          {/* Right - Check In/Out or Back Button */}
          <div className="flex items-center gap-3">
            {!isCheckedIn && !isCheckedOut && (
              <>
                <Button
                  onClick={handleCheckIn}
                  disabled={!paymentConfirmed || isCheckingIn}
                  size="lg"
                  icon={
                    isCheckingIn ? (
                      <Icon name="refresh" className="animate-spin" size={18} />
                    ) : (
                      <Icon name="login" size={18} />
                    )
                  }
                >
                  {isCheckingIn ? "Checking In..." : "Check In Guest"}
                </Button>
              </>
            )}

            {isCheckedIn && (
              <>
                <Button
                  onClick={handleCheckOut}
                  disabled={isCheckingOut}
                  size="lg"
                  icon={
                    isCheckingOut ? (
                      <Icon name="refresh" className="animate-spin" size={18} />
                    ) : (
                      <Icon name="logout" size={18} />
                    )
                  }
                >
                  {isCheckingOut ? "Checking Out..." : "Check Out Guest"}
                </Button>
              </>
            )}

            {isCheckedOut && (
              <Button variant="secondary" onClick={onCancel} size="lg">
                Back to Bookings
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
