import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

import { TicketTable } from "@/components/ticket-table"
import { ticketColumns } from "@/components/data-table/ticket-columns"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const dummyTickets = [
  {
    id: 1,
    gateway: "GW01",
    serial: "GS-12345",
    flag: "Event",
    alarm: "BUC1 Hang",
    status: "Open",
    pic: "SNT Team",
  },
  {
    id: 2,
    gateway: "GW02",
    serial: "AN-000123",
    flag: "PM",
    alarm: "Genset Overheat",
    status: "Close",
    pic: "UOM Team",
  },
]

export default function List() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="List Ticket"
          description="Daftar seluruh tiket yang sedang diproses atau selesai."
        />

        <div className="px-4 py-6 lg:px-6">
          <TicketTable columns={ticketColumns} data={dummyTickets} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
