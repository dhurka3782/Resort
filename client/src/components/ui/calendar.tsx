import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { addMonths, subMonths, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month: monthProp,
  onMonthChange: onMonthChangeProp,
  formatters,
  components,
  weekStartsOn = 1,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: string;
}) {
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    monthProp instanceof Date ? monthProp : new Date()
  );

  const month = monthProp instanceof Date ? monthProp : internalMonth;

  const handleMonthChange = (m: Date) => {
    setInternalMonth(m);
    onMonthChangeProp?.(m);
  };

  const navBtnClass =
    "h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/60 dark:hover:bg-accent/40 transition-colors duration-150";

  const defaultClassNames = getDefaultClassNames();

  return (
    <div className={cn("w-fit bg-background rounded-lg p-3 select-none", className)}>
      {/* ── Navigation Header ── */}
      <div className="flex items-center justify-between px-0.5 pb-2 mb-1 border-b border-border/40">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Previous Year"
            onClick={() => handleMonthChange(subMonths(month, 12))}
            className={navBtnClass}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Previous Month"
            onClick={() => handleMonthChange(subMonths(month, 1))}
            className={navBtnClass}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </div>

        <span className="text-sm font-bold text-foreground tracking-wide">
          {format(month, "MMMM yyyy")}
        </span>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Next Month"
            onClick={() => handleMonthChange(addMonths(month, 1))}
            className={navBtnClass}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Next Year"
            onClick={() => handleMonthChange(addMonths(month, 12))}
            className={navBtnClass}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── DayPicker (nav + caption fully hidden — we own the header above) ── */}
      <DayPicker
        month={month}
        onMonthChange={handleMonthChange}
        showOutsideDays={showOutsideDays}
        weekStartsOn={weekStartsOn}
        className="[--cell-size:--spacing(8)]"
        formatters={{
          formatWeekdayName: (date) => {
            const names = ["So", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return names[date.getDay()];
          },
          ...formatters,
        }}
        classNames={{
          root: "w-full",
          months: "flex flex-col gap-4",
          month: "flex flex-col w-full gap-2",
          /* hide both the default nav and caption — our header above handles them */
          nav: "hidden",
          month_caption: "hidden",
          table: "w-full border-collapse",
          weekdays: cn(
            "flex pb-2 mb-1 border-b border-border/40",
            defaultClassNames.weekdays
          ),
          weekday:
            "text-muted-foreground flex-1 font-semibold text-[11px] text-center uppercase tracking-wider",
          week: cn("flex w-full mt-1", defaultClassNames.week),
          week_number_header: cn("select-none w-8", defaultClassNames.week_number_header),
          week_number: "text-[0.75rem] select-none text-muted-foreground",
          day: cn(
            "relative w-full h-full p-0 text-center group/day aspect-square",
            defaultClassNames.day
          ),
          range_start: "rounded-l-md bg-[#386660]/15 dark:bg-[#386660]/25",
          range_middle: "rounded-none bg-[#386660]/10 dark:bg-[#386660]/15",
          range_end: "rounded-r-md bg-[#386660]/15 dark:bg-[#386660]/25",
          today: cn(
            "rounded-full border border-slate-300 dark:border-slate-600 font-bold",
            defaultClassNames.today
          ),
          outside: cn(
            "opacity-25 aria-selected:opacity-20",
            defaultClassNames.outside
          ),
          disabled: cn(
            "opacity-20 cursor-not-allowed pointer-events-none",
            defaultClassNames.disabled
          ),
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          Root: ({ className: cls, rootRef, ...rest }) => (
            <div data-slot="calendar" ref={rootRef} className={cn(cls)} {...rest} />
          ),
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...rest }) => (
            <td {...rest}>
              <div className="flex size-8 items-center justify-center text-center">
                {children}
              </div>
            </td>
          ),
          ...components,
        }}
        {...props}
      />
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // selected single day — teal fill
        "data-[selected-single=true]:bg-[#386660] data-[selected-single=true]:text-white hover:data-[selected-single=true]:bg-[#386660]/90",
        // range endpoints — teal fill
        "data-[range-start=true]:bg-[#386660] data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-[#386660] data-[range-end=true]:text-white",
        // range middle — soft teal tint
        "data-[range-middle=true]:bg-[#386660]/10 dark:data-[range-middle=true]:bg-[#386660]/20 data-[range-middle=true]:text-foreground",
        // shape
        "data-[range-start=true]:rounded-md data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none",
        // focus ring
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-ring/50",
        // base sizing
        "flex aspect-square size-auto w-full min-w-[--cell-size] flex-col gap-1 leading-none font-normal",
        // hover
        "hover:bg-accent/60 dark:hover:bg-accent/40",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
