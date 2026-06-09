import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabledDates?: (date: Date) => boolean;
  fromDate?: Date;
  className?: string;
  triggerClassName?: string;
  id?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  disabledDates,
  fromDate,
  className,
  triggerClassName,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("w-full", className)} id={id}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-12 px-4 rounded-lg border border-amber-100 dark:border-amber-800/40 bg-white/80 dark:bg-[#0D1F30] text-slate-900 dark:text-[#F2EAD6] hover:bg-white dark:hover:bg-[#112233] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600",
              !date && "text-slate-400 dark:text-slate-500",
              triggerClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span className="truncate">
              {date ? format(date, "PPP") : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white dark:bg-[#0D1F30] border border-slate-200 dark:border-amber-800/20 shadow-2xl rounded-2xl overflow-hidden" 
          align="start"
          sideOffset={6}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onDateChange(newDate);
              setOpen(false);
            }}
            disabled={disabledDates}
            fromDate={fromDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
