import { useState, useCallback } from 'react';
import { BookingData } from '@/types';

interface UseBookingReturn {
  bookingData: BookingData;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setGuests: (guests: string) => void;
  resetBooking: () => void;
  isValid: boolean;
  nights: number;
}

const initialBookingData: BookingData = {
  checkIn: '',
  checkOut: '',
  guests: '2',
};

export function useBooking(): UseBookingReturn {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const setCheckIn = useCallback((date: string) => {
    setBookingData((prev) => ({ ...prev, checkIn: date }));
  }, []);

  const setCheckOut = useCallback((date: string) => {
    setBookingData((prev) => ({ ...prev, checkOut: date }));
  }, []);

  const setGuests = useCallback((guests: string) => {
    setBookingData((prev) => ({ ...prev, guests }));
  }, []);

  const resetBooking = useCallback(() => {
    setBookingData(initialBookingData);
  }, []);

  const isValid = bookingData.checkIn !== '' && bookingData.checkOut !== '';

  const nights =
    isValid
      ? Math.ceil(
          (new Date(bookingData.checkOut).getTime() -
            new Date(bookingData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return {
    bookingData,
    setCheckIn,
    setCheckOut,
    setGuests,
    resetBooking,
    isValid,
    nights,
  };
}
