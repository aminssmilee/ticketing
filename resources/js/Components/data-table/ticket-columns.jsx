// components/data-table/ticket-columns.jsx
import { Badge } from "@/components/ui/badge"

export const ticketColumns = [
  { accessorKey: "ticket_number", header: "Ticket Number" },
  { accessorKey: "gateway", header: "Gateway" },
  { accessorKey: "ticket_date", header: "Ticket Date" },
  { accessorKey: "start_date", header: "Start Date" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subcategory", header: "Sub Category" },
  { accessorKey: "flag", header: "Flag" },
  { accessorKey: "alarm", header: "Alarm" },
  { accessorKey: "indication", header: "Indication" },
  { accessorKey: "updated_by", header: "Updated By" },
  { accessorKey: "pic", header: "PIC" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status")
      return (
        <Badge
          variant={
            value === "Open"
              ? "destructive"
              : value === "Close"
              ? "secondary"
              : "outline"
          }
        >
          {value}
        </Badge>
      )
    },
  },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "assigned_date", header: "Assigned Date" },
  { accessorKey: "end_date", header: "End Date" },
]
