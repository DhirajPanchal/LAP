"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoanApplication } from "@/types/loan-application";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: LoanApplication[];
  onRowClick: (loan: LoanApplication) => void;
}

export const DataTable = ({ data, onRowClick }: Props) => {
  const columns: ColumnDef<LoanApplication>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => (
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => onRowClick(row.original)}
        >
          {row.original.id}
        </span>
      ),
    },
    {
      header: "Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Mobile",
      accessorKey: "mobile",
    },
    {
      header: "Application Date",
      accessorKey: "application_date",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    // <Table>
    //   <TableHeader>
    //     {table.getHeaderGroups().map((headerGroup) => (
    //       <TableRow key={headerGroup.id}>
    //         {headerGroup.headers.map((header) => (
    //           <TableHead key={header.id}>
    //             {header.column.columnDef.header as string}
    //           </TableHead>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableHeader>
    //   <TableBody>
    //     {table.getRowModel().rows.map((row) => (
    //       <TableRow key={row.id}>
    //         {row.getVisibleCells().map((cell) => (
    //           <TableCell key={cell.id}>
    //             {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>

    <div className="relative overflow-auto max-h-[500px]">
      <table className="w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-20 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className={`p-x-2 bg-gray-200 text-left align-middle font-medium text-sm`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className={`p-2 align-middle text-sm `}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
