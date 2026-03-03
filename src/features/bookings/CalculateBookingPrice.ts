

async function calculateBookingPrice(bookingUpdate) {
  // 1. Fetch Cabin and Global Settings (Prices change over time!)
  const { cabin } = await getCabin(bookingUpdate.cabinId);
  const { settings } = await getSettings();

  // 2. Base Cabin Math
  const cabinPrice = (cabin.regularPrice - cabin.discount) * bookingUpdate.numNights;

  // 3. Extras Math
  const extrasPrice = bookingUpdate.hasBreakfast 
    ? settings.breakfastPrice * bookingUpdate.numNights * bookingUpdate.numGuests 
    : 0;

  // 4. Return the Payload
  return {
    cabinPrice,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    status: 'checked-in',
    hasBreakfast: bookingUpdate.hasBreakfast
  };
}