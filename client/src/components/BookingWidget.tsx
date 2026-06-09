import { useState } from 'react';
import { Users } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState('2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would trigger availability checks
    console.log({ checkIn, checkOut, guests });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-hero-oENv4NqTU7K22D584s7VpJ.webp)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="glass backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">Reserve Your Stay</h2>
              <p className="text-white/80 text-base md:text-lg">Secure your paradise escape today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
                {/* Check-in & Check-out Date Range Picker */}
                <div className="md:col-span-2">
                  <DateRangePicker
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onCheckInChange={setCheckIn}
                    onCheckOutChange={setCheckOut}
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-3">
                    <Users className="w-4 h-4 inline mr-2" />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3.5 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/30 transition-all text-sm md:text-base h-12"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-slate-900">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                className="w-full py-3 md:py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
              >
                Check Availability
              </button>

              {/* Note */}
              <p className="text-white/70 text-xs md:text-sm text-center">
                Best rates guaranteed. Free cancellation up to 14 days before arrival.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
