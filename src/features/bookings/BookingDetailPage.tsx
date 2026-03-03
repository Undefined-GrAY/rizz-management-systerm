import { useNavigate, useParams } from "react-router-dom";
import SubMain from "../../ui/SubMain";
import { useBooking } from "./useBooking";
import { Spinner } from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import { Header } from "../../ui/Header";
import BookingDetailContent from "./BookingDetailContent";

export function BookingDetailPage() {
  const { bookingId } = useParams();
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();



  if (isLoading)
    return (
      <>
        <Header
          title={`Booking #${bookingId}`}
          showBackButton
          onBack={() => navigate("/bookings")}
        />
        <SubMain>
          <div className=" lg:p-8 flex-1">
            <div className="max-w-5xl mx-auto">
              <Spinner />
            </div>
          </div>
        </SubMain>
      </>
    );
  if (error) return <ErrorFallback apiError={String(error)} />;
  return (
    <>
      <Header
        title={`Booking #${bookingId}`}
        showBackButton
        onBack={() => navigate("/bookings")}
      />

      <div className="lg:p-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <BookingDetailContent
            booking={booking} // booking is guaranteed here
           
            onCancel={() => navigate("/bookings")}
          />
        </div>
      </div>
    </>
  );
}
