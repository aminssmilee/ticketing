import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TicketTable } from "@/components/ticket-table"
import { ticketColumns } from "@/components/data-table/ticket-columns"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// ================================
// DUMMY DATA
// ================================
const dummyTickets = [
    {
        ticket_number: "TS-2025-0001",
        gateway: "GW01",
        ticket_date: "2025-08-14 08:12",
        start_date: "2025-08-14 08:00",
        category: "RF",
        subcategory: "BUC",
        flag: "Event",
        alarm: "Alarm ABC",
        indication: "BUC1 Hang",
        updated_by: "Budi",
        pic: "Team RF",
        status: "Open",
        duration: "4h 23m",
        assigned_date: "2025-08-14",
        end_date: "-",
    },
    {
        ticket_number: "TS-2025-0002",
        gateway: "GW02",
        ticket_date: "2025-08-14 08:12",
        start_date: "2025-08-14 08:00",
        category: "Utility",
        subcategory: "Genset",
        flag: "PM",
        alarm: "Genset Overheat",
        indication: "Temperature High",
        updated_by: "Joko",
        pic: "UOM Team",
        status: "Close",
        duration: "2d 4h",
        assigned_date: "2025-08-10",
        end_date: "2025-08-12",
    },
]

// ================================
// PAGE COMPONENT
// ================================
export default function List() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader
                    title="List Ticket"
                    description="Daftar seluruh tiket yang sedang diproses atau telah selesai."
                />

                <div
                    className="
    w-[71rem] 
    max-w-[71rem] 
    sm:max-w-full
    md:max-w-full
    lg:max-w-full 
    xl:max-w-full 
    2xl:max-w-full
  "
                >
                    <TicketTable columns={ticketColumns} data={dummyTickets} />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
