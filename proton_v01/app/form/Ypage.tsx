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
import { FIELD_MENIFEST, Grade, GRADE_DUMMY, VALIDATION_RULES } from "./data";

import { useState } from "react";
import { DatePicker } from "@/components/custom/date-picker";
import { Combobox } from "@/components/custom/combobox";

export default function TableDemo() {
  const originalRecord = GRADE_DUMMY[0];
  const [currentRecord, setCurrentRecord] = useState({ ...originalRecord });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setCurrentRecord((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    FIELD_MENIFEST.forEach(({ updateValueField }) => {
      const rule = VALIDATION_RULES[updateValueField];
      const val = currentRecord[updateValueField as keyof typeof currentRecord];

      if (rule?.required && !val) {
        newErrors[updateValueField] = "This field is required";
      } else if (rule?.pattern && !new RegExp(rule.pattern).test(val)) {
        newErrors[updateValueField] = "Invalid format";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Saving:", currentRecord);
    }
  };

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
              <TableHead className="w-2/5 px-6 py-4 text-indigo-800 dark:text-indigo-100 tracking-wide text-right">
                <span className="flex justify-end gap-2">
                  Current Value
                  <SquarePenIcon className="h-5 w-5 text-indigo-600" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {FIELD_MENIFEST.map((field, index) => {
              const updateKey = field.updateValueField;
              const value =
                currentRecord[updateKey as keyof typeof currentRecord];
              const type = updateKey.toLowerCase().includes("date")
                ? "date"
                : "reason";

              return (
                <TableRow key={index}>
                  <TableCell className="px-6 py-4 text-gray-800 bg-gray-100">
                    {field.fieldLabel}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-800 font-medium bg-gray-50">
                    {
                      originalRecord[
                        field.originalValueField as keyof typeof currentRecord
                      ]
                    }
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-800 font-medium text-right">
                    {type === "date" ? (
                      <DatePicker
                        value={value}
                        onChange={(val) => handleChange(updateKey, val)}
                      />
                    ) : (
                      <Combobox
                        value={value}
                        options={VALIDATION_RULES[updateKey]?.allowed || []}
                        onChange={(val) => handleChange(updateKey, val)}
                      />
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
                  <div className="text-red-600 text-sm">
                    {Object.values(errors).map((err, idx) => (
                      <div key={idx}>{err}</div>
                    ))}
                  </div>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
