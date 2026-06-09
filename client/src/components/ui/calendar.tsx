import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames, useDayPicker } from "react-day-picker";
import { addMonths, subMonths, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function CustomCalendarNav() {
  const { goToMonth, months, nextMonth, previousMonth } = useDayPicker();
  const currentMonth = months[0]?.date || new Date();

  const handlePrevYear = () => {
    goToMonth(subMonths(currentMonth, 12));
  };

  const handlePrevMonth = () => {
    if (previousMonth) goToMonth(previousMonth);
  };

  const handleNextMonth = () => {
    if (nextMonth) goToMonth(nextMonth);
  };

  const handleNextYear = () => {
    goToMonth(addMonths(currentMonth, 12));
  };

  return (
    <div className="flex items-center justify-between w-full px-1 py-2 select-none border-b border-border/40 mb-2">
      {/* Left controls */}
      <div className="flex items-center gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handlePrevYear}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
          title="Previous Year"
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handlePrevMonth}
          disabled={!previousMonth}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md disabled:opacity-30 disabled:pointer-events-none"
          title="Previous Month"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Centered Month/Year Label */}
      <span className="text-sm font-bold text-foreground">
        {format(currentMonth, "MMMM yyyy")}
      </span>

      {/* Right controls */}
      <div className="flex items-center gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          disabled={!nextMonth}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md disabled:opacity-30 disabled:pointer-events-none"
          title="Next Month"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleNextYear}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
          title="Next Year"
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  weekStartsOn = 1,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date =>
          date.toLocaleString("default", { month: "short" }),
        formatWeekdayName: (date) => {
          const day = date.getDay();
          const names = ["So", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return names[day];
        },
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-2", defaultClassNames.month),
        nav: cn(
          "hidden", // Hide default nav as we render CustomCalendarNav as Nav component
          defaultClassNames.nav
        ),
        month_caption: "hidden", // Hide default month caption as CustomCalendarNav renders it
        table: "w-full border-collapse",
        weekdays: cn("flex border-b border-border/50 pb-1.5 mb-1", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-semibold text-[11px] select-none text-center",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1.5", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 rounded-full font-bold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground opacity-30 aria-selected:text-muted-foreground/30",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-20 cursor-not-allowed",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Nav: CustomCalendarNav,
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
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
        "data-[selected-single=true]:bg-[#386660] data-[selected-single=true]:text-white hover:data-[selected-single=true]:bg-[#386660]/90 data-[range-middle=true]:bg-slate-100 dark:data-[range-middle=true]:bg-slate-800/80 data-[range-middle=true]:text-slate-900 dark:data-[range-middle=true]:text-[#F2EAD6] data-[range-start=true]:bg-[#386660] data-[range-start=true]:text-white data-[range-end=true]:bg-[#386660] data-[range-end=true]:text-white group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
