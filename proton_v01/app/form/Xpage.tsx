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
import { FIELD_MENIFEST, Grade, GRADE_DUMMY } from "./data";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";

export default function TableDemo() {
  //Data
  const record: any = GRADE_DUMMY[0];

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
                <span className="flex gap-2">
                  Current Value
                  <SquarePenIcon color="indigo" className="h-6 w-6" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FIELD_MENIFEST.map((field, index) => (
              <TableRow key={index}>
                <TableCell className="px-6 py-4 text-gray-800 bg-gray-100">
                  {field.fieldLabel}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-800 font-medium bg-gray-50">
                  {record[field.originalValueField]}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-800 font-medium">
                  {record[field.updateValueField]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button>Save</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
