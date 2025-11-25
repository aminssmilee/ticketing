"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TicketTable({ columns, data }) {
  return (
    <div className="w-full max-w-full overflow-x-auto border rounded-md p-2">
      {/* FIXED WIDTH TABLE – overflow cuma pada tabel */}
      <Table className="min-w-[1700px]">
        <TableHeader className="bg-slate-50">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.accessorKey}
                className="text-xs whitespace-nowrap"
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => {
                const value = row[col.accessorKey]

                // CLICKABLE TID
                if (col.accessorKey === "ticket_number") {
                  return (
                    <TableCell
                      key={col.accessorKey}
                      className="text-xs text-blue-600 underline cursor-pointer whitespace-nowrap"
                      onClick={() => (window.location.href = `/ticket/view/${value}`)}
                    >
                      {value}
                    </TableCell>
                  )
                }

                // CUSTOM CELL
                // CUSTOM CELL (FIX STRUCTURE)
                if (col.cell) {
                  return (
                    <TableCell key={col.accessorKey} className="text-xs whitespace-nowrap">
                      {col.cell({
                        row: {
                          original: row, // ⬅ INI YANG PALING PENTING!!!
                          getValue: (key) => row[key],
                        },
                      })}
                    </TableCell>
                  )
                }


                return (
                  <TableCell key={col.accessorKey} className="text-xs whitespace-nowrap">
                    {value}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
