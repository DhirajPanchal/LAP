"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export function DateInputPickerV1({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(() =>
    value && isValid(new Date(value))
      ? new Date(value + "T00:00:00")
      : undefined
  );
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInputValue(value);

    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setDate(parsed);
      setError("");
    } else if (value === "") {
      setDate(undefined);
      setError("");
    }
  }, [value]);

  const handleInputChange = (val: string) => {
    const cleaned = val.replace(/[^\d-]/g, "").slice(0, 10);
    setInputValue(cleaned);

    const parsed = parse(cleaned, "yyyy-MM-dd", new Date());
    if (isValid(parsed) && cleaned.length === 10) {
      const iso = format(parsed, "yyyy-MM-dd"); // ✅ Safe conversion
      setDate(parsed);
      setError("");
      onChange(iso);
    } else {
      setError("Invalid date format. Use YYYY-MM-DD");
      onChange(cleaned);
    }
  };

  const handleCalendarSelect = (d: Date | undefined) => {
    if (!d) return;
    const iso = format(d, "yyyy-MM-dd"); // ✅ Safe conversion
    setDate(d);
    setInputValue(iso);
    setError("");
    onChange(iso);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Input
          placeholder="YYYY-MM-DD"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="max-w-[150px]"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              onSelect={handleCalendarSelect}
              captionLayout="dropdown"
              fromYear={1970}
              toYear={new Date().getFullYear() + 10}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
