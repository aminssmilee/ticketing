import React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { router } from "@inertiajs/react"

export default function ActionDropdown({ ticket }) {
  if (!ticket) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            window.location.href = route("ticket.view", ticket.ticket_number)
          }
        >
          View Ticket
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.visit(route("ticket.update", {
              ticket_number: ticket.ticket_number
            }))
          }
        >
          Update Ticket
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
