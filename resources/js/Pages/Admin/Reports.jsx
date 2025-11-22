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
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DownloadIcon,
    RefreshCcwIcon,
    BarChartIcon,
    FilterIcon,
    UsersIcon,
    ShoppingCartIcon,
    PackageIcon,
    PercentIcon,
} from "lucide-react"

import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { SiteHeader } from "@/components/site-header"

// ------------------------------------------------------------------
// 1️⃣ Dummy data generator with real date (30 hari terakhir)
// ------------------------------------------------------------------
function generateData(days = 30) {
    const today = new Date()
    return Array.from({ length: days }, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() - (days - i - 1))
        return {
            day: date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
            visitors: Math.floor(100 + Math.random() * 120),
            orders: Math.floor(3 + Math.random() * 12),
            products: Math.floor(15 + Math.random() * 6),
        }
    })
}

const allData = generateData(30)

const productReports = [
    { id: 1, title: "Mini E-Commerce", category: "E-Commerce", price: 200000, visits: 123, orders: 7, status: "Aktif" },
    { id: 2, title: "Company Profile", category: "Corporate", price: 150000, visits: 96, orders: 3, status: "Aktif" },
    { id: 3, title: "Landing Page", category: "Marketing", price: 100000, visits: 187, orders: 12, status: "Aktif" },
    { id: 4, title: "Portfolio", category: "Personal", price: 175000, visits: 45, orders: 1, status: "Nonaktif" },
]

const recentVisitors = [
    { id: 1, ip_address: "103.21.44.12", page: "/products/mini", browser: "Chrome", country: "Indonesia", created_at: "2025-11-05 13:22" },
    { id: 2, ip_address: "103.21.44.90", page: "/products/profile", browser: "Safari", country: "Indonesia", created_at: "2025-11-05 13:10" },
    { id: 3, ip_address: "103.21.44.56", page: "/", browser: "Firefox", country: "Singapore", created_at: "2025-11-05 12:58" },
]

// ------------------------------------------------------------------
// 2️⃣ Kartu Statistik yang lebih keren dengan icon & warna gradien
// ------------------------------------------------------------------
function GradientCard({ title, value, desc, icon: Icon, colorFrom, colorTo }) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
                }}
            />
            <div className="relative p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div
                        className="rounded-lg p-1.5"
                        style={{
                            background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
                        }}
                    >
                        <Icon className="h-4 w-4 text-white" />
                    </div>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}

// ------------------------------------------------------------------
// 3️⃣ Chart Aktivitas Harian (Visitors, Orders, Products)
// ------------------------------------------------------------------
function DailyChart({ data }) {
    return (
        <Card className="col-span-2">
            <CardHeader className="flex flex-row justify-between pb-3">
                <CardTitle className="text-base font-semibold">Aktivitas Harian</CardTitle>
                <Button variant="ghost" size="icon">
                    <RefreshCcwIcon className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "0.5rem",
                                border: "1px solid hsl(var(--border))",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="visitors"
                            stroke="#2563eb"
                            fill="#2563eb25"
                            strokeWidth={2}
                            name="Visitors"
                        />
                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#22c55e"
                            fill="#22c55e25"
                            strokeWidth={2}
                            name="Orders"
                        />
                        <Area
                            type="monotone"
                            dataKey="products"
                            stroke="#f59e0b"
                            fill="#f59e0b20"
                            strokeWidth={2}
                            name="Products"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

// ------------------------------------------------------------------
// 4️⃣ Table komponen
// ------------------------------------------------------------------
function VisitorsTable({ visitors }) {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle className="text-base font-semibold">Latest Visitors</CardTitle>
                <Button variant="outline" size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" /> Export
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>IP</TableHead>
                            <TableHead>Page</TableHead>
                            <TableHead>Browser</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visitors.map((v) => (
                            <TableRow key={v.id}>
                                <TableCell className="font-mono text-xs">{v.ip_address}</TableCell>
                                <TableCell className="text-xs">{v.page}</TableCell>
                                <TableCell className="text-xs">{v.browser}</TableCell>
                                <TableCell className="text-xs">{v.country}</TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">
                                    {v.created_at}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

function ProductTable() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle className="text-base font-semibold">Produk & Performa</CardTitle>
                <Button variant="outline" size="icon">
                    <FilterIcon className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produk</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead className="text-right">Harga</TableHead>
                            <TableHead className="text-right">Visits</TableHead>
                            <TableHead className="text-right">Orders</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productReports.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{p.category}</Badge>
                                </TableCell>
                                <TableCell className="text-right text-sm">
                                    Rp {p.price.toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell className="text-right">{p.visits}</TableCell>
                                <TableCell className="text-right">{p.orders}</TableCell>
                                <TableCell>
                                    {p.status === "Aktif" ? (
                                        <Badge className="text-green-600 border-green-300" variant="outline">
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge className="text-red-600 border-red-300" variant="outline">
                                            Nonaktif
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// ------------------------------------------------------------------
// 5️⃣ Main Component
// ------------------------------------------------------------------
export default function Reports() {
    const [filterDays, setFilterDays] = useState(7)

    const filteredData = useMemo(() => {
        return filterDays === 0 ? allData : allData.slice(-filterDays)
    }, [filterDays])

    const totals = useMemo(() => {
        const totalVisitors = filteredData.reduce((a, b) => a + b.visitors, 0)
        const totalOrders = filteredData.reduce((a, b) => a + b.orders, 0)
        const totalProducts = filteredData.reduce((a, b) => a + b.products, 0)
        return { totalVisitors, totalOrders, totalProducts }
    }, [filteredData])

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Reports"
                    description="Analisis performa penjualan dan traffic pengunjung"
                />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4">
                                <div>
                                    {/* <h1 className="text-2xl font-semibold tracking-tight">Reports</h1> */}
                                    {/* <p className="text-sm text-muted-foreground">Laporan aktivitas produk, pesanan, dan visitor harian.</p> */}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <DownloadIcon className="mr-2 h-4 w-4" /> Export
                                    </Button>
                                    <Button variant="default" size="sm">
                                        <BarChartIcon className="mr-2 h-4 w-4" /> Generate
                                    </Button>
                                </div>
                            </div>

                            {/* Filter */}
                            <div className="flex items-center gap-2 px-4">
                                <span className="text-sm text-muted-foreground">Filter:</span>
                                {[7, 14, 30].map((day) => (
                                    <Button
                                        key={day}
                                        variant={filterDays === day ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilterDays(day)}
                                    >
                                        {day} Hari
                                    </Button>
                                ))}
                                <Button
                                    variant={filterDays === 0 ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterDays(0)}
                                >
                                    Semua
                                </Button>
                            </div>

                            {/* Summary cards */}
                            <div className="grid gap-4 px-4 md:grid-cols-4">
                                <GradientCard
                                    title="Total Visitors"
                                    value={totals.totalVisitors}
                                    desc={`${filterDays || 30} hari terakhir`}
                                    icon={UsersIcon}
                                    colorFrom="#3b82f6"
                                    colorTo="#60a5fa"
                                />
                                <GradientCard
                                    title="Total Orders"
                                    value={totals.totalOrders}
                                    desc="Dalam periode ini"
                                    icon={ShoppingCartIcon}
                                    colorFrom="#16a34a"
                                    colorTo="#4ade80"
                                />
                                <GradientCard
                                    title="Total Products"
                                    value={totals.totalProducts}
                                    desc="Aktif dalam sistem"
                                    icon={PackageIcon}
                                    colorFrom="#f59e0b"
                                    colorTo="#fbbf24"
                                />
                                <GradientCard
                                    title="Conversion Rate"
                                    value={`${((totals.totalOrders / totals.totalVisitors) * 100).toFixed(2)}%`}
                                    desc="Orders / visitors"
                                    icon={PercentIcon}
                                    colorFrom="#9333ea"
                                    colorTo="#c084fc"
                                />
                            </div>

                            {/* Chart */}
                            <div className="grid gap-4 px-4 md:grid-cols-3">
                                <DailyChart data={filteredData} />
                                <VisitorsTable visitors={recentVisitors} />
                            </div>

                            {/* Tabs */}
                            <div className="px-4">
                                <Tabs defaultValue="products">
                                    <TabsList>
                                        <TabsTrigger value="products">Produk</TabsTrigger>
                                        <TabsTrigger value="visitors">Visitors</TabsTrigger>
                                        <TabsTrigger value="orders">Orders</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="products" className="mt-4">
                                        <ProductTable />
                                    </TabsContent>

                                    <TabsContent value="visitors" className="mt-4">
                                        <VisitorsTable visitors={recentVisitors} />
                                    </TabsContent>

                                    <TabsContent value="orders" className="mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Orders Harian</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Tanggal</TableHead>
                                                            <TableHead className="text-right">Orders</TableHead>
                                                            <TableHead className="text-right">Visitors</TableHead>
                                                            <TableHead className="text-right">Products</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {filteredData.map((d, i) => (
                                                            <TableRow key={i}>
                                                                <TableCell>{d.day}</TableCell>
                                                                <TableCell className="text-right">{d.orders}</TableCell>
                                                                <TableCell className="text-right">{d.visitors}</TableCell>
                                                                <TableCell className="text-right">{d.products}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
