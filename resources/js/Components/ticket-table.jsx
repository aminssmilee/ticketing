"use client"

import React, { useRef, useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRight } from "lucide-react"

export function TicketTable({ columns = [], data = [] }) {

  const scrollRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      setIsSticky(el.scrollLeft > 0)
    }

    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto overflow-y-visible relative border rounded-md p-2"
    >
      <Table className="min-w-[1700px]">

        {/* HEADER */}
        <TableHeader className="sticky top-0 z-30">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.accessorKey ?? col.id}
                className={`
                  text-xs
                  ${col.meta?.sticky && isSticky ? "sticky right-0 bg-white shadow-left z-40" : ""}
                `}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ticket_number}>
              {columns.map((col) => {

                const val = row[col.accessorKey]

                const stickyClass = col.meta?.sticky
                  ? "sticky right-0 bg-white z-30 shadow-left"
                  : ""

                if (col.accessorKey === "ticket_number") {
                  return (
                    <TableCell
                      key={col.accessorKey}
                      className={`text-xs cursor-pointer text-blue-600 whitespace-nowrap flex items-center gap-1 ${stickyClass}`}
                      onClick={() => (window.location.href = `/ticket/view/${val}`)}
                    >
                      <span className="underline">{val}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </TableCell>
                  )
                }


                if (col.cell) {
                  return (
                    <TableCell
                      key={col.accessorKey}
                      className={`text-xs ${stickyClass}`}
                    >
                      {col.cell({
                        row: {
                          original: row,
                          getValue: (key) => row[key],
                        },
                      })}
                    </TableCell>
                  )
                }

                return (
                  <TableCell
                    key={col.accessorKey}
                    className={`text-xs ${stickyClass}`}
                  >
                    {val}
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
