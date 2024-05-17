"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
interface DateRange {
  from: Date;
  to: Date;
}

interface CalendarDateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}

export function CalendarDateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(dateRange);

  React.useEffect(() => {
    setDate(dateRange);
  }, [dateRange]);

  const handleDateChange = (newDateRange: DateRange) => {
    setDate(newDateRange);
    onDateRangeChange(newDateRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range: any) => {
              if (range?.from && range?.to) {
                handleDateChange(range);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
