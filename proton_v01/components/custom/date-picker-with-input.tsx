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

    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setDate(parsed);
      setError(""); // <-- clear error when valid value is passed down
    } else if (value === "") {
      setDate(undefined);
      setError(""); // <-- clear error on empty value (Reset case)
    }
  }, [value]);

  const handleInputChange = (val: string) => {
    const cleaned = val.replace(/[^\d-]/g, "").slice(0, 10);
    setInputValue(cleaned);

    const parsed = parse(cleaned, "yyyy-MM-dd", new Date());
    if (isValid(parsed) && cleaned.length === 10) {
      const iso = parsed.toISOString().split("T")[0];
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
          onKeyDown={(e) => {
            const allowedKeys = [
              "Backspace",
              "Tab",
              "ArrowLeft",
              "ArrowRight",
              "Delete",
              "-",
            ];
            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
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
