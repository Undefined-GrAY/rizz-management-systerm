import type { DurationChartDataProps, DurationData } from "../types/types";

// interface Booking {
//   numNights: number;
//   // ... other fields
// }






export function prepareDurationChartData(bookings: DurationChartDataProps[]): DurationData[] {
  // Count bookings in each bucket
  const counts = {
    '1 night': 0,
    '2 nights': 0,
    '3 nights': 0,
    '4-5 nights': 0,
    '6-7 nights': 0,
    '8-14 nights': 0,
    '14+ nights': 0,
  };

  // Categorize each booking
  bookings.forEach((booking) => {
    const nights: number = booking.numNights || 0;

    if (nights === 1) counts['1 night']++;
    else if (nights === 2) counts['2 nights']++;
    else if (nights === 3) counts['3 nights']++;
    else if (nights >= 4 && nights <= 5) counts['4-5 nights']++;
    else if (nights >= 6 && nights <= 7) counts['6-7 nights']++;
    else if (nights >= 8 && nights <= 14) counts['8-14 nights']++;
    else if (nights > 14) counts['14+ nights']++;
  });

  // Convert to percentages
  const total = bookings.length;

  // Filter out empty buckets and calculate percentages
  const data: DurationData[] = [
    { duration: '1 night', count: counts['1 night'], color: '#eab308' },      // yellow-500
    { duration: '2 nights', count: counts['2 nights'], color: '#f59e0b' },    // orange-500
    { duration: '3 nights', count: counts['3 nights'], color: '#fbbf24' },    // amber-400
    { duration: '4-5 nights', count: counts['4-5 nights'], color: '#10b981' }, // emerald-500
    { duration: '6-7 nights', count: counts['6-7 nights'], color: '#14b8a6' }, // teal-500
    { duration: '8-14 nights', count: counts['8-14 nights'], color: '#3b82f6' }, // blue-500
    { duration: '14+ nights', count: counts['14+ nights'], color: '#8b5cf6' }, // violet-500
  ]
    .filter(item => item.count > 0) // Remove empty buckets
    .map(item => ({
      duration: item.duration,
      value: Math.round((item.count / total) * 100), // Convert to percentage
      color: item.color,
    }));


    console.log("chart", data);
  return data;
}