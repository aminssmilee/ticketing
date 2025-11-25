import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TicketTable } from "@/components/ticket-table"
import { ticketColumns } from "@/components/data-table/ticket-columns"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"

export default function List() {

    const { tickets } = usePage().props;   // ⬅ ambil data dari backend

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader
                    title="List Ticket"
                    description="Daftar tiket yang Anda buat."
                />

                <div
                    className="
                        w-full
                        max-w-full
                        sm:max-w-full
                        md:max-w-full
                        lg:max-w-full
                        xl:max-w-full
                        2xl:max-w-full
                    "
                >
                    <TicketTable columns={ticketColumns} data={tickets} />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
