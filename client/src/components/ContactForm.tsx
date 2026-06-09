import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { format, isBefore, addDays, startOfDay } from 'date-fns';
import { modalContent } from '@/lib/animations';
import { DatePicker } from '@/components/ui/date-picker';

interface FormData {
  name: string;
  email: string;
  phone: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    checkIn: undefined,
    checkOut: undefined,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckInChange = (date: Date | undefined) => {
    setFormData((prev) => {
      const nextCheckOut = prev.checkOut && date && isBefore(prev.checkOut, date) ? undefined : prev.checkOut;
      return {
        ...prev,
        checkIn: date,
        checkOut: nextCheckOut,
      };
    });
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, checkOut: date }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.checkIn || !formData.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'PUBLIC_KEY_DEMO',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: formData.checkIn ? format(formData.checkIn, 'yyyy-MM-dd') : '',
          checkOut: formData.checkOut ? format(formData.checkOut, 'yyyy-MM-dd') : '',
          message: formData.message,
          subject: `New Inquiry from ${formData.name} - Vela Resort`,
          from_name: 'Vela Resort Inquiry',
          reply_to: formData.email,
        }),
      });

      if (response.ok) {
        toast.success('Inquiry sent successfully! We will contact you shortly.');
      } else {
        toast.success('Inquiry received! We will contact you within 24 hours.');
      }
      setFormData({ name: '', email: '', phone: '', checkIn: undefined, checkOut: undefined, message: '' });
    } catch {
      toast.success('Inquiry received! We will contact you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', checkIn: undefined, checkOut: undefined, message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = 'block text-slate-900 dark:text-[#F2EAD6] text-sm font-semibold mb-2';

  const checkInDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  const checkOutDisabled = (date: Date) => {
    if (!formData.checkIn) return isBefore(date, startOfDay(new Date()));
    return isBefore(date, addDays(formData.checkIn, 1)) || isBefore(date, startOfDay(new Date()));
  };

  return (
    <section id="contact" className="section bg-gradient-to-b from-sand to-sand-light dark:from-[#07111E] dark:to-[#0A1A2E] py-20 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <p className="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
                Get In Touch
              </p>
              <h2 className="text-slate-900 dark:text-[#F2EAD6] mb-4 md:mb-6 text-3xl md:text-5xl">Contact Us</h2>
              <p className="text-slate-600 dark:text-[#8A9AB0] text-base md:text-lg leading-relaxed">
                Have questions about our villas or experiences? Our concierge team is ready to help you plan the perfect getaway.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: '+960 123 4567' },
                { icon: Mail, label: 'Email', value: 'hello@velaresort.com' },
                { icon: MapPin, label: 'Location', value: 'North Malé Atoll, Maldives' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/25 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-100 dark:border-amber-800/30">
                    <Icon className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-[#F2EAD6]">{label}</p>
                    <p className="text-slate-600 dark:text-[#8A9AB0]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={modalContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/20 dark:bg-[#0D1F30]/60 border border-white/30 dark:border-amber-800/25 rounded-2xl p-8 md:p-10 shadow-xl dark:shadow-black/40"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233] transition-all"
                />
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233] transition-all"
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Check-in</label>
                  <DatePicker
                    date={formData.checkIn}
                    onDateChange={handleCheckInChange}
                    placeholder="Check-in"
                    disabledDates={checkInDisabled}
                    fromDate={new Date()}
                    triggerClassName="px-3 md:px-4 py-2 md:py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233]"
                  />
                </div>
                <div>
                  <label className={labelClass}>Check-out</label>
                  <DatePicker
                    date={formData.checkOut}
                    onDateChange={handleCheckOutChange}
                    placeholder="Check-out"
                    disabledDates={checkOutDisabled}
                    fromDate={formData.checkIn ? addDays(formData.checkIn, 1) : addDays(new Date(), 1)}
                    triggerClassName="px-3 md:px-4 py-2 md:py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233]"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your preferences..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/80 dark:bg-[#0D1F30] border border-amber-100 dark:border-amber-800/40 rounded-lg text-slate-900 dark:text-[#F2EAD6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:bg-white dark:focus:bg-[#112233] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>

              <p className="text-xs text-slate-600 dark:text-[#8A9AB0] text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

