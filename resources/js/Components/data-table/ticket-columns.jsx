import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { router } from "@inertiajs/react"

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
      const v = row.getValue("status")
      return (
        <Badge variant={
          v === "Open" ? "destructive" :
          v === "Close" ? "secondary" :
          "outline"
        }>
          {v}
        </Badge>
      )
    }
  },

  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "assigned_date", header: "Assigned Date" },
  { accessorKey: "end_date", header: "End Date" },

  {
    header: "Actions",
    id: "actions",
    meta: { sticky: true },

    cell: ({ row }) => {
      const ticket = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => window.location.href = route("ticket.view", ticket.ticket_number)}
            >
              View Ticket
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.visit(route("ticket.update", { ticket_number: ticket.ticket_number }))}
            >
              Update Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
