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
import { Input } from "@/components/ui/input"
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
  PlusIcon,
  RefreshCcwIcon,
  FilterIcon,
  ShoppingBagIcon,
  LayersIcon,
  CheckCircle2Icon,
  XCircleIcon,
  PackageIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { SidebarHeader } from "@/Components/ui/sidebar"
import { SiteHeader } from "@/components/site-header";

// ------------------------------------------------------------------
// 1️⃣ Dummy Data Produk
// ------------------------------------------------------------------
const productsData = [
  { id: 1, title: "Mini E-Commerce", category: "E-Commerce", price: 200000, stock: 12, status: "active", created_at: "2025-10-30" },
  { id: 2, title: "Company Profile", category: "Corporate", price: 150000, stock: 7, status: "active", created_at: "2025-10-28" },
  { id: 3, title: "Landing Page Promo", category: "Marketing", price: 120000, stock: 0, status: "inactive", created_at: "2025-10-29" },
  { id: 4, title: "Portfolio Website", category: "Personal", price: 175000, stock: 5, status: "active", created_at: "2025-10-31" },
  { id: 5, title: "Business Catalog", category: "Corporate", price: 230000, stock: 3, status: "active", created_at: "2025-11-01" },
]

// ------------------------------------------------------------------
// 2️⃣ Summary Cards
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
// 3️⃣ Table Produk
// ------------------------------------------------------------------
function ProductsTable({ products }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between pb-3">
        <CardTitle className="text-base font-semibold">Daftar Produk</CardTitle>
        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Harga</TableHead>
              <TableHead className="text-right">Stok</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tanggal</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{p.category}</Badge>
                </TableCell>
                <TableCell className="text-right text-sm">
                  Rp {p.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {p.stock > 0 ? p.stock : "Habis"}
                </TableCell>
                <TableCell>
                  {p.status === "active" ? (
                    <Badge className="bg-green-100 text-green-700 border-none">
                      <CheckCircle2Icon className="h-3 w-3 mr-1" /> Aktif
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-none">
                      <XCircleIcon className="h-3 w-3 mr-1" /> Nonaktif
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {p.created_at}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8">
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
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
// 4️⃣ Main Page
// ------------------------------------------------------------------
export default function Products() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" ? true : p.category === categoryFilter
      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const summary = useMemo(() => {
    return {
      total: productsData.length,
      active: productsData.filter((p) => p.status === "active").length,
      inactive: productsData.filter((p) => p.status === "inactive").length,
      categories: new Set(productsData.map((p) => p.category)).size,
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Products"
          description="Kelola produk dan katalog e-commerce"
          actions={
            <>
              <Button variant="outline" size="sm">
                <RefreshCcwIcon className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="default" size="sm">
                <PlusIcon className="mr-2 h-4 w-4" /> Tambah Produk
              </Button>
            </>
          }
        />

        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-4 py-6 px-4">

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <SummaryCard title="Total Produk" value={summary.total} icon={ShoppingBagIcon} color="#2563eb" />
              <SummaryCard title="Aktif" value={summary.active} icon={CheckCircle2Icon} color="#16a34a" />
              <SummaryCard title="Nonaktif" value={summary.inactive} icon={XCircleIcon} color="#dc2626" />
              <SummaryCard title="Kategori" value={summary.categories} icon={LayersIcon} color="#f59e0b" />
            </div>

            {/* Filter + Search */}
            <Card className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <Input
                  placeholder="Cari nama produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {[...new Set(productsData.map((p) => p.category))].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <FilterIcon className="h-4 w-4 mr-2" /> Terapkan
                </Button>
              </div>
            </Card>

            {/* Table Produk */}
            <ProductsTable products={filteredProducts} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
