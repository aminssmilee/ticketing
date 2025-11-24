"use client"

import { useState } from "react"
import { usePage } from "@inertiajs/react"
import axios from "axios"

// Layout Components
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

// UI Components
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Search } from "lucide-react"
import { DataTable } from "@/components/data-table/DataTable"

import { getAdminUserColumns } from "@/components/data-table/admin-user-columns"


export default function UserManagement() {
  const { props } = usePage()

  // Initial props from Inertia
  const initialUsers = props.users?.data || []
  const initialMeta = props.users?.meta || {}

  // States
  const [users, setUsers] = useState(initialUsers)
  const [meta, setMeta] = useState(initialMeta)
  const [q, setQ] = useState(props.filters?.q || "")
  const [timeRange, setTimeRange] = useState(props.filters?.timeRange || "90d")
  const [pageSize, setPageSize] = useState(initialMeta.per_page || 10)
  const [loading, setLoading] = useState(false)

  const columns = getAdminUserColumns()

  /**
   * Fetch Users from server using AJAX
   * Without forcing Inertia to reload the page.
   */
  const fetchUsers = async (extra = {}) => {
    setLoading(true)
    try {
      const res = await axios.get("/ticket/users", {
        headers: {
          "X-Requested-With": "XMLHttpRequest", // <- FIX untuk mencegah Inertia error JSON
        },
        params: {
          q,
          timeRange,
          page: extra.page || 1,
          per_page: extra.per_page || pageSize,
        },
      })

      setUsers(res.data.data)
      setMeta(res.data.meta)
    } catch (error) {
      console.error("Fetch users error:", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="User Management"
          description="Kelola user yang memiliki akses ke sistem tiket."
        />

        {/* Filters */}
        <CardHeader className="px-6 space-y-10">
          <div className="flex flex-wrap items-center justify-between w-full gap-3">

            {/* Search Field */}
            {/* <div className="relative w-full md:w-1/3">
              <Input
                placeholder="Cari nama atau email..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
            </div> */}

            {/* Time Range Filter */}
            {/* <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(v) => {
                if (!v) return
                setTimeRange(v)
                fetchUsers({ page: 1 })
              }}
              variant="outline"
              className="hidden md:flex"
            >
              <ToggleGroupItem value="90d">3 Bulan</ToggleGroupItem>
              <ToggleGroupItem value="30d">30 Hari</ToggleGroupItem>
              <ToggleGroupItem value="7d">7 Hari</ToggleGroupItem>
            </ToggleGroup> */}

            {/* Mobile version */}
            {/* <Select
              value={timeRange}
              onValueChange={(v) => {
                setTimeRange(v)
                fetchUsers({ page: 1 })
              }}
            >
              <SelectTrigger className="md:hidden w-40">
                <SelectValue placeholder="Rentang waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90d">3 Bulan</SelectItem>
                <SelectItem value="30d">30 Hari</SelectItem>
                <SelectItem value="7d">7 Hari</SelectItem>
              </SelectContent>
            </Select> */}

          </div>
        </CardHeader>


        {/* Table Section */}
        <div className="px-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar User</CardTitle>
            </CardHeader>

            <CardContent>

              {loading && (
                <p className="text-center text-muted-foreground">Loading...</p>
              )}

              {!loading && (
                <DataTable
                  data={users}
                  columns={columns}
                  server
                  pageCount={meta?.last_page ?? 1}
                  pagination={{
                    pageIndex: (meta?.current_page ?? 1) - 1,
                    pageSize,
                  }}
                  onPaginationChange={(next) => {
                    const nextPage = next.pageIndex + 1
                    fetchUsers({ page: nextPage })
                  }}
                  onPageSizeChange={(size) => {
                    setPageSize(size)
                    fetchUsers({ page: 1, per_page: size })
                  }}
                />
              )}

            </CardContent>
          </Card>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
