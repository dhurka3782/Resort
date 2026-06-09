import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { format, isBefore, addDays, startOfDay } from 'date-fns';
import { modalContent } from '@/lib/animations';
import { DatePicker } from '@/components/ui/date-picker';

interface VillaAvailability {
  id: number;
  name: string;
  basePrice: number;
  peakPrice: number;
  available: number;
}

const villas: VillaAvailability[] = [
  { id: 1, name: 'Overwater Bungalow', basePrice: 1200, peakPrice: 1800, available: 3 },
  { id: 2, name: 'Beach Villa', basePrice: 950, peakPrice: 1400, available: 5 },
  { id: 3, name: 'Presidential Suite', basePrice: 2500, peakPrice: 3500, available: 1 },
];

const peakSeasons = [
  { start: '2026-12-20', end: '2027-01-05' },
  { start: '2026-07-01', end: '2026-08-31' },
];

const isPeakSeason = (date: Date): boolean => {
  const dateStr = date.toISOString().split('T')[0];
  return peakSeasons.some((season) => dateStr >= season.start && dateStr <= season.end);
};

export default function AvailabilityCalendar() {
  const [selectedVilla, setSelectedVilla] = useState(villas[0].id);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  const villa = villas.find((v) => v.id === selectedVilla)!;

  const calculatePrice = (date: string) => {
    return isPeakSeason(new Date(date)) ? villa.peakPrice : villa.basePrice;
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const start = checkIn;
    const end = checkOut;
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;
    let total = 0;
    for (let i = 0; i < nights; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      total += calculatePrice(date.toISOString().split('T')[0]);
    }
    return total;
  };

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const handleCheckInChange = (date: Date | undefined) => {
    if (date && checkOut && isBefore(checkOut, date)) {
      setCheckOut(undefined);
    }
    setCheckIn(date);
  };

  const checkInDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  const checkOutDisabled = (date: Date) => {
    if (!checkIn) return isBefore(date, startOfDay(new Date()));
    return isBefore(date, addDays(checkIn, 1)) || isBefore(date, startOfDay(new Date()));
  };

  return (
    <section className="section bg-white dark:bg-[#07111E]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <p className="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Plan Your Stay
          </p>
          <h2 className="text-slate-900 dark:text-[#F2EAD6] mb-4 md:mb-6 text-3xl md:text-5xl">Availability & Pricing</h2>
          <p className="text-slate-600 dark:text-[#8A9AB0] text-base md:text-lg max-w-2xl mx-auto">
            Check real-time availability and dynamic pricing for our villas
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Villa Selection & Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Villa Selector */}
            <div className="mb-8">
              <label className="block text-slate-900 dark:text-[#F2EAD6] font-semibold mb-4">Select Villa</label>
              <div className="space-y-3">
                {villas.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVilla(v.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedVilla === v.id
                        ? 'border-amber-700 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/25'
                        : 'border-amber-100 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700/50 dark:bg-[#0D1F30]/50'
                    }`}
                  >
                    <p className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{v.name}</p>
                    <p className="text-sm text-slate-600 dark:text-[#8A9AB0]">
                      {v.available} available • From ${v.basePrice}/night
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-900 dark:text-[#F2EAD6] font-semibold mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-in Date
                </label>
                <DatePicker
                  date={checkIn}
                  onDateChange={handleCheckInChange}
                  placeholder="Select check-in date"
                  disabledDates={checkInDisabled}
                  fromDate={new Date()}
                />
              </div>
              <div>
                <label className="block text-slate-900 dark:text-[#F2EAD6] font-semibold mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-out Date
                </label>
                <DatePicker
                  date={checkOut}
                  onDateChange={setCheckOut}
                  placeholder="Select check-out date"
                  disabledDates={checkOutDisabled}
                  fromDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
                />
              </div>
            </div>

            {/* Pricing Info */}
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
              <p className="text-sm text-slate-600 dark:text-[#8A9AB0] mb-2">Peak Season Pricing:</p>
              <p className="text-xs text-slate-500 dark:text-[#6A7A8A] mb-4">Dec 20 - Jan 5, Jul 1 - Aug 31</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-[#8A9AB0]">Regular</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-[#F2EAD6]">${villa.basePrice}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-[#8A9AB0]">Peak</p>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-400">${villa.peakPrice}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Booking Summary */}
          <motion.div
            variants={modalContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/20 dark:bg-[#0D1F30]/60 border border-white/30 dark:border-amber-800/25 rounded-2xl p-8 md:p-10 h-fit shadow-xl dark:shadow-black/40"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F2EAD6] mb-6">Booking Summary</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-amber-200 dark:border-amber-800/30">
                <span className="text-slate-700 dark:text-[#C8B89A]">Villa</span>
                <span className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{villa.name}</span>
              </div>

              {checkIn && checkOut && (
                <>
                  <div className="flex justify-between items-center pb-4 border-b border-amber-200 dark:border-amber-800/30">
                    <span className="text-slate-700 dark:text-[#C8B89A]">Check-in</span>
                    <span className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{format(checkIn, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-amber-200 dark:border-amber-800/30">
                    <span className="text-slate-700 dark:text-[#C8B89A]">Check-out</span>
                    <span className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{format(checkOut, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-amber-200 dark:border-amber-800/30">
                    <span className="text-slate-700 dark:text-[#C8B89A]">Number of Nights</span>
                    <span className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{nights}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-amber-200 dark:border-amber-800/30">
                    <span className="text-slate-700 dark:text-[#C8B89A]">Average Price/Night</span>
                    <span className="font-semibold text-slate-900 dark:text-[#F2EAD6]">
                      ${Math.round(calculateTotalPrice() / nights)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 bg-amber-50 dark:bg-amber-900/25 px-4 py-3 rounded-lg border border-amber-100 dark:border-amber-800/30">
                    <span className="font-bold text-slate-900 dark:text-[#F2EAD6]">Total Price</span>
                    <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                      ${calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {(!checkIn || !checkOut) && (
                <p className="text-center text-slate-600 dark:text-[#8A9AB0] py-8">
                  Select dates to see pricing
                </p>
              )}
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
              disabled={!checkIn || !checkOut}
            >
              Proceed to Booking
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
