import { useState } from "react";
import { format, isAfter, isBefore, addDays, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) {
  const [activePicker, setActivePicker] = useState<"checkIn" | "checkOut">("checkIn");
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  // Sync the active picker when schedule changes
  const handleCheckInSelect = (date: Date | undefined) => {
    if (date && checkOut && isBefore(checkOut, date)) {
      onCheckOutChange(undefined);
    }
    onCheckInChange(date);
    if (date) {
      setCheckInOpen(false);
      setActivePicker("checkOut");
      setTimeout(() => setCheckOutOpen(true), 100);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (date && checkIn && isBefore(date, checkIn)) return;
    onCheckOutChange(date);
    setCheckOutOpen(false);
  };

  const clearDates = () => {
    onCheckInChange(undefined);
    onCheckOutChange(undefined);
  };

  const checkInDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  const checkOutDisabled = (date: Date) => {
    if (!checkIn) return false;
    return isBefore(date, addDays(checkIn, 1)) || isBefore(date, startOfDay(new Date()));
  };

  const handlePickerOpen = (picker: "checkIn" | "checkOut") => {
    if (picker === "checkIn") {
      setCheckInOpen(true);
      setCheckOutOpen(false);
    } else {
      if (!checkIn) return;
      setCheckOutOpen(true);
      setCheckInOpen(false);
    }
    setActivePicker(picker);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
      {/* Check-in */}
      <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={() => handlePickerOpen("checkIn")}
            className={cn(
              "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left",
              checkInOpen
                ? "border-amber-400/70 bg-white/30 shadow-lg shadow-amber-400/10"
                : "border-white/30 bg-white/20 hover:bg-white/25 hover:border-white/50",
              "backdrop-blur-md group text-white"
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/30 transition-colors">
              <CalendarIcon className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/70">
                Check-in
              </span>
              <span className={cn(
                "text-sm font-medium truncate",
                checkIn ? "text-white" : "text-white/50"
              )}>
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
              </span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-[#0D1F30] border border-slate-200 dark:border-amber-800/20 shadow-2xl rounded-2xl overflow-hidden"
          align="center"
          sideOffset={8}
        >
          <div className="p-3 border-b border-border/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 text-center">
              Select check-in date
            </p>
          </div>
          <Calendar
            mode="single"
            selected={checkIn}
            onSelect={handleCheckInSelect}
            disabled={checkInDisabled}
            fromDate={new Date()}
            initialFocus
            modifiers={{
              range_start: checkIn ? [checkIn] : [],
              range_end: checkOut ? [checkOut] : [],
              range_middle: (date) => {
                if (!checkIn || !checkOut) return false;
                return isAfter(date, checkIn) && isBefore(date, checkOut);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Arrow separator */}
      <div className="hidden md:flex items-center justify-center shrink-0">
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-white/70" />
        </div>
      </div>

      {/* Check-out */}
      <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={() => handlePickerOpen("checkOut")}
            disabled={!checkIn}
            className={cn(
              "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left",
              checkOutOpen
                ? "border-amber-400/70 bg-white/30 shadow-lg shadow-amber-400/10"
                : checkIn
                  ? "border-white/30 bg-white/20 hover:bg-white/25 hover:border-white/50"
                  : "border-white/10 bg-white/5 cursor-not-allowed",
              "backdrop-blur-md group text-white"
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/30 transition-colors">
              <CalendarIcon className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/70">
                Check-out
              </span>
              <span className={cn(
                "text-sm font-medium truncate",
                checkOut ? "text-white" : "text-white/50"
              )}>
                {checkOut ? format(checkOut, "MMM dd, yyyy") : !checkIn ? "Check-in first" : "Select date"}
              </span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-[#0D1F30] border border-slate-200 dark:border-amber-800/20 shadow-2xl rounded-2xl overflow-hidden"
          align="center"
          sideOffset={8}
        >
          <div className="p-3 border-b border-border/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 text-center">
              Select check-out date
            </p>
          </div>
          <Calendar
            mode="single"
            selected={checkOut}
            onSelect={handleCheckOutSelect}
            disabled={checkOutDisabled}
            fromDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
            initialFocus
            modifiers={{
              range_start: checkIn ? [checkIn] : [],
              range_end: checkOut ? [checkOut] : [],
              range_middle: (date) => {
                if (!checkIn || !checkOut) return false;
                return isAfter(date, checkIn) && isBefore(date, checkOut);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Clear button - only show when dates are selected */}
      {checkIn && (
        <button
          type="button"
          onClick={clearDates}
          className="shrink-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          title="Clear dates"
        >
          <X className="w-3.5 h-3.5 text-white/70" />
        </button>
      )}
    </div>
  );
}