"use client"

import React, { useState, useMemo } from "react"
import { SidebarProvider, SidebarInset } from "@components/ui/sidebar"
import { AppSidebar } from "@components/app-sidebar"
import { SiteHeader } from "@components/site-header"
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
  ImageIcon,
  EyeIcon,
  XCircleIcon,
  CheckCircle2Icon,
  FilterIcon,
  Trash2Icon,
  PencilIcon,
} from "lucide-react"

// ------------------------------------------------------------------
// 1️⃣ Dummy Data Banner
// ------------------------------------------------------------------
const bannersData = [
  {
    id: 1,
    title: "Promo Akhir Tahun",
    position: "Homepage Hero",
    image: "/banners/banner1.jpg",
    status: "active",
    created_at: "2025-10-30",
  },
  {
    id: 2,
    title: "Diskon Spesial",
    position: "Sidebar",
    image: "/banners/banner2.jpg",
    status: "inactive",
    created_at: "2025-10-28",
  },
  {
    id: 3,
    title: "Produk Unggulan",
    position: "Homepage Bottom",
    image: "/banners/banner3.jpg",
    status: "active",
    created_at: "2025-10-31",
  },
  {
    id: 4,
    title: "Flash Sale 11.11",
    position: "Popup",
    image: "/banners/banner4.jpg",
    status: "active",
    created_at: "2025-11-02",
  },
]

// ------------------------------------------------------------------
// 2️⃣ Summary Card
// ------------------------------------------------------------------
function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundColor: color }}
      />
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
// 3️⃣ Banner Table
// ------------------------------------------------------------------
function BannersTable({ banners }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between pb-3">
        <CardTitle className="text-base font-semibold">Daftar Banner</CardTitle>
        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tanggal Upload</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {banners.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs">{b.id}</TableCell>

                <TableCell>
                  <div className="w-14 h-10 rounded overflow-hidden border">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>

                <TableCell className="font-medium">{b.title}</TableCell>

                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {b.position}
                  </Badge>
                </TableCell>

                <TableCell>
                  {b.status === "active" ? (
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
                  {b.created_at}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      title="Preview"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      title="Hapus"
                    >
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
export default function Banner() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBanners = useMemo(() => {
    return bannersData.filter((b) => {
      const matchesSearch = b.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" ? true : b.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const summary = useMemo(() => {
    return {
      total: bannersData.length,
      active: bannersData.filter((b) => b.status === "active").length,
      inactive: bannersData.filter((b) => b.status === "inactive").length,
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Banner"
          description="Kelola banner promosi dan media tampilan"
        />

        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-4 py-6 px-4">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <SummaryCard
                title="Total Banner"
                value={summary.total}
                icon={ImageIcon}
                color="#2563eb"
              />
              <SummaryCard
                title="Aktif"
                value={summary.active}
                icon={CheckCircle2Icon}
                color="#16a34a"
              />
              <SummaryCard
                title="Nonaktif"
                value={summary.inactive}
                icon={XCircleIcon}
                color="#dc2626"
              />
            </div>

            {/* Filter + Search */}
            <Card className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <Input
                  placeholder="Cari banner..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
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

            {/* Table */}
            <BannersTable banners={filteredBanners} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
