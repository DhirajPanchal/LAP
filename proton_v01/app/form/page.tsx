"use client";

import { DateInputPickerV1 } from "@/components/custom/date-picker-with-input-new";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePenIcon } from "lucide-react";
import { useState } from "react";
import {
  FIELD_MENIFEST,
  Grade,
  GRADE_DUMMY,
  REASONS,
  VALIDATION_RULES,
} from "./data";

export default function TableDemo() {
  const originalRecord = GRADE_DUMMY[0];
  const editableKeys = FIELD_MENIFEST.map((f) => f.updateValueField);
  const initialState = Object.fromEntries(
    editableKeys.map((key) => [key, originalRecord[key as keyof Grade]])
  );

  const [currentRecord, setCurrentRecord] =
    useState<Partial<Grade>>(initialState);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setCurrentRecord((prev) => ({ ...prev, [field]: value }));
  };

  const xvalidate = () => {
    const newErrors: { [key: string]: string } = {};
    const defaultDateStr = currentRecord["new_default_date"];
    const resolutionDateStr = currentRecord["new_resolution_date"];

    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const defaultDate = defaultDateStr ? new Date(defaultDateStr) : null;
    const resolutionDate = resolutionDateStr
      ? new Date(resolutionDateStr)
      : null;

    // Optional default date validations
    if (defaultDate) {
      if (defaultDate > now) {
        newErrors["new_default_date"] = "Default Date cannot be in the future.";
      } else if (defaultDate < oneYearAgo) {
        newErrors["new_default_date"] =
          "Default Date cannot be more than 1 year old.";
      } else if (resolutionDate && defaultDate > resolutionDate) {
        newErrors["new_default_date"] =
          "Default Date cannot be after Resolution Date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const defaultDateStr = currentRecord["new_default_date"];
    const resolutionDateStr = currentRecord["new_resolution_date"];
    const originalDefaultDateStr = originalRecord["old_default_date"];

    const defaultDate = defaultDateStr ? new Date(defaultDateStr) : null;
    const resolutionDate = resolutionDateStr
      ? new Date(resolutionDateStr)
      : null;
    const originalDefaultDate = originalDefaultDateStr
      ? new Date(originalDefaultDateStr)
      : null;
    // Format error for Default Date
    if (defaultDateStr && (!defaultDate || defaultDateStr.length !== 10)) {
      newErrors["new_default_date"] = "Invalid date format. Use YYYY-MM-DD";
    }

    // Format error for Resolution Date
    if (
      resolutionDateStr &&
      (!resolutionDate || resolutionDateStr.length !== 10)
    ) {
      newErrors["new_resolution_date"] = "Invalid date format. Use YYYY-MM-DD";
    }
    if (defaultDate) {
      const now = new Date();

      // 1. Cannot be in the future
      if (defaultDate > now) {
        newErrors["new_default_date"] = "Default Date cannot be in the future.";
      }

      // 2. Cannot be after resolution date
      else if (resolutionDate && defaultDate > resolutionDate) {
        newErrors["new_default_date"] =
          "Default Date cannot be after Resolution Date.";
      }

      // 3. Must be within ±1 year of original default date
      else if (originalDefaultDate) {
        const diffInMs = Math.abs(
          defaultDate.getTime() - originalDefaultDate.getTime()
        );
        const oneYearInMs = 365 * 24 * 60 * 60 * 1000;

        if (diffInMs > oneYearInMs) {
          newErrors["new_default_date"] =
            "Default Date must be within ±1 year of the Original Default Date.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Saving:", currentRecord);
    }
  };

  // const isDirty = Object.entries(currentRecord).some(
  //   ([key, val]) => val !== initialState[key as keyof typeof initialState]
  // );

  const isDirty = editableKeys.some((key) => {
    const typedKey = key as keyof Grade;
    const originalVal = initialState[typedKey] ?? "";
    const currentVal = currentRecord[typedKey] ?? "";
    return originalVal !== currentVal;
  });

  console.log(
    "Dirty keys:",
    editableKeys.filter((key) => {
      const typedKey = key as keyof Grade;
      return (initialState[typedKey] ?? "") !== (currentRecord[typedKey] ?? "");
    })
  );

  return (
    <div className="m-24 border-1 p-24">
      <div className="relative overflow-x-auto shadow-sm rounded-sm">
        <Table className="text-gray-800">
          <TableHeader className="uppercase bg-indigo-100">
            <TableRow>
              <TableHead className="w-1/5 px-6 py-4 text-indigo-800 dark:text-indigo-100 tracking-wide">
                Field
              </TableHead>
              <TableHead className="w-2/5 px-6 py-4 text-indigo-800 dark:text-indigo-100 tracking-wide">
                Original Value
              </TableHead>
              <TableHead className="w-2/5 px-6 py-4 text-indigo-800 dark:text-indigo-100 tracking-wide">
                <div className="flex justify-between items-center">
                  <span>Current Value</span>
                  <SquarePenIcon className="h-6 w-6 text-indigo-600" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {FIELD_MENIFEST.map((field, index) => {
              const updateKey = field.updateValueField;
              const value =
                currentRecord[updateKey as keyof typeof currentRecord] || "";
              const type = updateKey.toLowerCase().includes("date")
                ? "date"
                : "reason";
              const allowed = VALIDATION_RULES[updateKey]?.allowed || [];

              return (
                <TableRow key={index}>
                  <TableCell className="px-6 py-4 text-gray-800 bg-gray-100">
                    {field.fieldLabel}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-800 font-medium bg-gray-50">
                    {
                      originalRecord[
                        field.originalValueField as keyof typeof originalRecord
                      ]
                    }
                  </TableCell>
                  <TableCell className="px-6 py-1 text-gray-800 font-medium text-right">
                    {type === "date" ? (
                      <div className="max-w-[250px]">
                        <DateInputPickerV1
                          value={String(value ?? "")}
                          onChange={(val) => handleChange(updateKey, val)}
                        />
                      </div>
                    ) : (
                      <Select
                        value={String(value ?? "")}
                        onValueChange={(val) =>
                          handleChange(updateKey, val === "__none__" ? "" : val)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="__none__" value="__none__">
                            -- None --
                          </SelectItem>
                          {REASONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <div className="flex justify-between items-center">
                  <div className="text-red-600 text-sm space-y-1">
                    {Object.entries(errors).map(([field, msg]) => (
                      <div
                        key={field}
                        className="border border-red-300 rounded px-3 py-1 bg-red-50"
                      >
                        {msg}
                      </div>
                    ))}
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={() => {
                        setCurrentRecord(initialState);
                        setErrors({});
                      }}
                      disabled={!isDirty}
                      className="bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600 tracking-wider min-w-[80px]"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={!isDirty}
                      className="bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600 tracking-wider min-w-[80px]"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
