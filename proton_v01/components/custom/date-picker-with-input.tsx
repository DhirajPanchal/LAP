import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [date, setDate] = useState<Date | undefined>(() =>
    value && isValid(new Date(value))
      ? new Date(value + "T00:00:00")
      : undefined
  );
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setInputValue(value);
    if (value && isValid(new Date(value))) {
      setDate(new Date(value + "T00:00:00"));
    }
  }, [value]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const parsed = parse(val, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      const iso = parsed.toISOString().split("T")[0];
      setDate(parsed);
      setError("");
      onChange(iso);
    } else {
      setError("Invalid date format. Use YYYY-MM-DD");
    }
  };

  const handleCalendarSelect = (d: Date | undefined) => {
    if (!d) return;
    const adjusted = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );
    const iso = adjusted.toISOString().split("T")[0];
    setDate(adjusted);
    setInputValue(iso);
    setError("");
    onChange(iso);
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
              onSelect={(d) => {
                handleCalendarSelect(d);
                setOpen(false); // Close popover after selection
              }}
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
