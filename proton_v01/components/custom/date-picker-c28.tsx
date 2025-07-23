"use client";

import { format } from "date-fns";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function DatePickerC28({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const parsedDate = value ? new Date(value + "T00:00:00") : undefined;
  const [date, setDate] = React.useState<Date | undefined>(parsedDate);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;
    const iso = selected.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setDate(selected);
    onChange(iso);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[160px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={1970}
          toYear={new Date().getFullYear() + 10}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
