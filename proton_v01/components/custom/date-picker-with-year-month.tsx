
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function DatePicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="justify-start text-left font-normal w-full">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span className="text-gray-500 font-medium">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              setDate(d);
              onChange(d.toISOString().split("T")[0]);
            }
          }}
          initialFocus
          captionLayout="dropdown"
          fromYear={1970}
          toYear={new Date().getFullYear() + 10}
        />
      </PopoverContent>
    </Popover>
  );
}
