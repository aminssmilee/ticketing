import React, { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TicketTable } from "@/components/ticket-table"
import { ticketColumns } from "@/components/data-table/ticket-columns"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePage, router } from "@inertiajs/react"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


export default function List() {

    const [selectedRow, setSelectedRow] = useState(null)

    const { tickets } = usePage().props
    const [status, setStatus] = useState("all")

    // === FILTER DATA ===
    const filteredData = useMemo(() => {
        if (status === "all") return tickets.data
        return tickets.data.filter((t) => t.status.toLowerCase() === status)
    }, [status, tickets.data])

    // === PAGINATION ===
    const pagination = {
        page: tickets.current_page,
        totalPages: tickets.last_page,
        pageSize: tickets.per_page,

        onPageChange: (page) =>
            router.visit(route("ticket.list", { page, per_page: pagination.pageSize })),

        onPageSizeChange: (size) =>
            router.visit(route("ticket.list", { per_page: size, page: 1 })),
    }

    // Kolom action-only untuk tabel kanan
    const actionOnlyColumn = [
        {
            header: "Action",
            id: "action_only",
            cell: ({ row }) => {
                const ticket = row.original

                const isClosed = ticket.status?.toLowerCase() === "closed"

                return (
                    <div className="flex">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-5 w-5 p-2">
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center">

                                {/* VIEW TICKET SELALU ADA */}
                                <DropdownMenuItem
                                    onClick={() =>
                                        window.location.href = route("ticket.view", ticket.ticket_number)
                                    }
                                >
                                    View Ticket
                                </DropdownMenuItem>

                                {/* UPDATE TICKET — hanya muncul jika status bukan closed */}
                                {!isClosed && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.visit(
                                                route("ticket.update", { ticket_number: ticket.ticket_number })
                                            )
                                        }
                                    >
                                        Update Ticket
                                    </DropdownMenuItem>
                                )}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            }
        }
    ]


    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />

            <SidebarInset className="overflow-x-hidden">
                <SiteHeader
                    title="List Ticket"
                    description="Daftar tiket yang Anda buat."
                />

                <div className="flex flex-col flex-1 px-4 md:px-6 py-4 gap-4">

                    <div className="border border-foreground/10 rounded-lg shadow-sm bg-white p-4">

                        {/* Header */}
                        <div className="px-2 mb-6">
                            <h1 className="text-xl font-semibold">Your Ticket Records</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Total Tickets:{" "}
                                <span className="font-semibold text-foreground">
                                    {filteredData.length}
                                </span>{" "}
                                • Showing status:{" "}
                                <span className="capitalize">{status}</span>
                            </p>
                        </div>

                        {/* Filter */}
                        <div className="mb-4 flex justify-end items-center gap-4 px-2">
                            <Label className="text-sm">Filter by status</Label>

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="update">On Progress</SelectItem>
                                    <SelectItem value="closed">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* === TABLES SIDE BY SIDE === */}
                        <div className="flex flex-row w-full gap-2">

                            {/* === TABLE WRAPPER (Desktop) === */}
                            <div className="hidden md:flex w-full border border-gray-200 rounded-lg overflow-hidden">

                                {/* LEFT TABLE (Scrollable) */}
                                <div className="flex-1 overflow-x-auto">
                                    <div className="min-w-[1800px]">
                                        <TicketTable
                                            columns={ticketColumns}
                                            data={filteredData}
                                            pagination={pagination}
                                            onRowSelect={setSelectedRow}
                                            selectedRow={selectedRow}
                                        />
                                    </div>
                                </div>

                                {/* RIGHT TABLE (Action Only - Fixed) */}
                                <div className="w-[130px] border-gray-200">
                                    <div className="min-w-[130px]">
                                        <TicketTable
                                            columns={actionOnlyColumn}
                                            data={filteredData}
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* === MOBILE VIEW (Single table with action inside row) === */}
                            <div className="w-full md:hidden">
                                <TicketTable
                                    columns={[...ticketColumns, ...actionOnlyColumn]}
                                    data={filteredData}
                                    pagination={pagination}
                                />
                            </div>

                        </div>

                        {/* === PAGINATION === */}
                        <div className="flex items-center justify-end px-4 py-3 mt-4">

                            <div className="flex w-full items-center gap-8 lg:w-fit">

                                {/* ROWS PER PAGE */}
                                <div className="hidden items-center gap-2 lg:flex">
                                    <Label className="text-sm font-normal">
                                        Rows per page
                                    </Label>

                                    <Select
                                        value={String(pagination.pageSize)}
                                        onValueChange={pagination.onPageSizeChange}
                                    >
                                        <SelectTrigger className="w-20">
                                            <SelectValue placeholder={pagination.pageSize} />
                                        </SelectTrigger>

                                        <SelectContent side="top">
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="30">30</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* PAGE TEXT */}
                                <div className="flex items-center text-sm font-normal">
                                    Page {pagination.page} of {pagination.totalPages}
                                </div>

                                {/* ARROWS */}
                                <div className="ml-auto flex items-center gap-2 lg:ml-0">

                                    <Button
                                        variant="outline"
                                        className="hidden h-8 w-8 p-0 lg:flex"
                                        disabled={pagination.page <= 1}
                                        onClick={() => pagination.onPageChange(1)}
                                    >
                                        «
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        disabled={pagination.page <= 1}
                                        onClick={() => pagination.onPageChange(pagination.page - 1)}
                                    >
                                        ‹
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => pagination.onPageChange(pagination.page + 1)}
                                    >
                                        ›
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="hidden size-8 lg:flex"
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => pagination.onPageChange(pagination.totalPages)}
                                    >
                                        »
                                    </Button>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
