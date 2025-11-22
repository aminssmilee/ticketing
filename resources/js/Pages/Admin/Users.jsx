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
  RefreshCcwIcon,
  UserCheckIcon,
  UserXIcon,
  ShieldIcon,
  UsersIcon,
  UserPlusIcon,
  PencilIcon,
  Trash2Icon,
  FilterIcon,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"

// ------------------------------------------------------------------
// 1️⃣ Dummy Data User
// ------------------------------------------------------------------
const usersData = [
  { id: 1, name: "Admin Utama", email: "admin@webcare.id", role: "admin", status: "active", joined: "2025-10-25" },
  { id: 2, name: "Rafi Pratama", email: "rafi@example.com", role: "member", status: "active", joined: "2025-10-30" },
  { id: 3, name: "Sinta Rahma", email: "sinta@example.com", role: "member", status: "inactive", joined: "2025-10-27" },
  { id: 4, name: "Fajar Hadi", email: "fajar@example.com", role: "member", status: "active", joined: "2025-10-28" },
  { id: 5, name: "Ayu Pertiwi", email: "ayu@example.com", role: "admin", status: "active", joined: "2025-10-29" },
]

// ------------------------------------------------------------------
// 2️⃣ Summary Card
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
// 3️⃣ Table User
// ------------------------------------------------------------------
function UsersTable({ users }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between pb-3">
        <CardTitle className="text-base font-semibold">Daftar Pengguna</CardTitle>
        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Bergabung</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs">{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {u.role === "admin" ? (
                    <Badge className="bg-blue-100 text-blue-800 border-none">
                      <ShieldIcon className="h-3 w-3 mr-1" /> Admin
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-100 text-emerald-700 border-none">
                      <UsersIcon className="h-3 w-3 mr-1" /> Member
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {u.status === "active" ? (
                    <Badge className="bg-green-100 text-green-700 border-none">
                      <UserCheckIcon className="h-3 w-3 mr-1" /> Aktif
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-none">
                      <UserXIcon className="h-3 w-3 mr-1" /> Nonaktif
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {u.joined}
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
export default function Users() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = useMemo(() => {
    return usersData.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      const matchesRole =
        roleFilter === "all" ? true : u.role === roleFilter
      const matchesStatus =
        statusFilter === "all" ? true : u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [search, roleFilter, statusFilter])

  const summary = useMemo(() => {
    return {
      total: usersData.length,
      admin: usersData.filter((u) => u.role === "admin").length,
      member: usersData.filter((u) => u.role === "member").length,
      active: usersData.filter((u) => u.status === "active").length,
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="User Management"
          description="Kelola data pengguna dan hak akses dalam sistem."
          actions={
            <>
              <Button variant="outline" size="sm">
                <RefreshCcwIcon className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button variant="default" size="sm">
                <UserPlusIcon className="mr-2 h-4 w-4" /> Tambah User
              </Button>
            </>
          }
        />

        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-4 py-6 px-4">

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <SummaryCard title="Total Users" value={summary.total} icon={UsersIcon} color="#2563eb" />
              <SummaryCard title="Admin" value={summary.admin} icon={ShieldIcon} color="#9333ea" />
              <SummaryCard title="Member Aktif" value={summary.active} icon={UserCheckIcon} color="#16a34a" />
              <SummaryCard title="Total Member" value={summary.member} icon={UsersIcon} color="#f59e0b" />
            </div>

            {/* Filter + Search */}
            <Card className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <Input
                  placeholder="Cari nama / email user..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Role</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
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

            {/* Table User */}
            <UsersTable users={filteredUsers} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
