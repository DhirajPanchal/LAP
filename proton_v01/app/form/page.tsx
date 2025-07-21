"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";
import {
  FIELD_MENIFEST,
  Grade,
  GRADE_DUMMY,
  REASONS,
  VALIDATION_RULES,
} from "./data";
import { useState } from "react";
import { DatePicker } from "@/components/custom/date-picker-with-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const validate = () => {
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

  const handleSave = () => {
    if (validate()) {
      console.log("Saving:", currentRecord);
    }
  };

  const isAnyFieldFilled = Object.values(currentRecord).some(
    (val) => val && val.trim() !== ""
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
                        <DatePicker
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
                      onClick={handleSave}
                      disabled={!isAnyFieldFilled}
                      className="bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600 tracking-wider min-w-[80px]"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={!isAnyFieldFilled}
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
