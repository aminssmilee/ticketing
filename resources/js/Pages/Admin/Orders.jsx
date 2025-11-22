"use client"

import React, { useState, useMemo } from "react"
import { SidebarProvider, SidebarInset } from "@components/ui/sidebar"
import { AppSidebar } from "@components/app-sidebar"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import {
    Input
} from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DownloadIcon,
    RefreshCcwIcon,
    FilterIcon,
    CheckCircle2Icon,
    XCircleIcon,
    ClockIcon,
    ShoppingCartIcon
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"

// ---------------------------------------------------------------
// 1️⃣ Dummy data (bisa ganti nanti ke API Laravel)
// ---------------------------------------------------------------
const ordersData = [
    {
        id: "ORD-1001",
        customer: "Rafi Pratama",
        product: "Mini E-Commerce",
        amount: 200000,
        date: "2025-11-01",
        status: "completed",
        payment: "Midtrans",
    },
    {
        id: "ORD-1002",
        customer: "Dinda Laras",
        product: "Landing Page Promo",
        amount: 150000,
        date: "2025-11-02",
        status: "pending",
        payment: "Manual Transfer",
    },
    {
        id: "ORD-1003",
        customer: "Yuda Anggara",
        product: "Company Profile",
        amount: 250000,
        date: "2025-11-03",
        status: "cancelled",
        payment: "Midtrans",
    },
    {
        id: "ORD-1004",
        customer: "Sinta Rahma",
        product: "Portfolio Website",
        amount: 175000,
        date: "2025-11-04",
        status: "completed",
        payment: "Midtrans",
    },
    {
        id: "ORD-1005",
        customer: "Fajar Hadi",
        product: "Mini E-Commerce",
        amount: 200000,
        date: "2025-11-05",
        status: "pending",
        payment: "Manual Transfer",
    },
]

// ---------------------------------------------------------------
// 2️⃣ Card ringkasan kecil (Shadcn style)
// ---------------------------------------------------------------
function SummaryCard({ title, value, icon: Icon, color }) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }} />
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4" style={{ color }} />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-semibold tracking-tight">{value}</p>
            </CardContent>
        </Card>
    )
}

// ---------------------------------------------------------------
// 3️⃣ Table Orders
// ---------------------------------------------------------------
function OrdersTable({ orders }) {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-3">
                <CardTitle className="text-base font-semibold">Daftar Pesanan</CardTitle>
                <Button variant="outline" size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" /> Export
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Order</TableHead>
                            <TableHead>Pelanggan</TableHead>
                            <TableHead>Produk</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead>Pembayaran</TableHead>
                            <TableHead className="text-right">Tanggal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((o, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                                <TableCell>{o.customer}</TableCell>
                                <TableCell>{o.product}</TableCell>
                                <TableCell className="text-right">Rp {o.amount.toLocaleString("id-ID")}</TableCell>
                                <TableCell className="text-center">
                                    {o.status === "completed" && (
                                        <Badge className="bg-green-100 text-green-700 border-none">
                                            <CheckCircle2Icon className="h-3 w-3 mr-1" /> Selesai
                                        </Badge>
                                    )}
                                    {o.status === "pending" && (
                                        <Badge className="bg-yellow-100 text-yellow-800 border-none">
                                            <ClockIcon className="h-3 w-3 mr-1" /> Pending
                                        </Badge>
                                    )}
                                    {o.status === "cancelled" && (
                                        <Badge className="bg-red-100 text-red-700 border-none">
                                            <XCircleIcon className="h-3 w-3 mr-1" /> Dibatalkan
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>{o.payment}</TableCell>
                                <TableCell className="text-right text-sm text-muted-foreground">{o.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// ---------------------------------------------------------------
// 4️⃣ Main Component
// ---------------------------------------------------------------
export default function Orders() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredOrders = useMemo(() => {
        return ordersData.filter((o) => {
            const matchesSearch =
                o.customer.toLowerCase().includes(search.toLowerCase()) ||
                o.id.toLowerCase().includes(search.toLowerCase()) ||
                o.product.toLowerCase().includes(search.toLowerCase())
            const matchesStatus =
                statusFilter === "all" ? true : o.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [search, statusFilter])

    const summary = useMemo(() => {
        return {
            total: ordersData.length,
            completed: ordersData.filter((o) => o.status === "completed").length,
            pending: ordersData.filter((o) => o.status === "pending").length,
            cancelled: ordersData.filter((o) => o.status === "cancelled").length,
        }
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Orders"
                    description="Pantau dan kelola pesanan pelanggan"
                />
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col gap-4 py-6 px-4">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
                                <p className="text-sm text-muted-foreground">
                                    Kelola dan pantau seluruh pesanan pelanggan di sistem.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <RefreshCcwIcon className="mr-2 h-4 w-4" /> Refresh
                                </Button>
                                <Button variant="default" size="sm">
                                    <DownloadIcon className="mr-2 h-4 w-4" /> Export
                                </Button>
                            </div>
                        </div>

                        {/* Summary cards */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <SummaryCard title="Total Orders" value={summary.total} icon={ShoppingCartIcon} color="#2563eb" />
                            <SummaryCard title="Completed" value={summary.completed} icon={CheckCircle2Icon} color="#16a34a" />
                            <SummaryCard title="Pending" value={summary.pending} icon={ClockIcon} color="#f59e0b" />
                            <SummaryCard title="Cancelled" value={summary.cancelled} icon={XCircleIcon} color="#dc2626" />
                        </div>

                        {/* Filter + Search */}
                        <Card className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                            <div className="flex items-center gap-2 w-full md:w-1/2">
                                <Input
                                    placeholder="Cari nama pelanggan / produk / ID order..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex gap-2 items-center w-full md:w-auto">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua</SelectItem>
                                        <SelectItem value="completed">Selesai</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <FilterIcon className="h-4 w-4 mr-2" /> Terapkan
                                </Button>
                            </div>
                        </Card>

                        {/* Orders Table */}
                        <OrdersTable orders={filteredOrders} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
