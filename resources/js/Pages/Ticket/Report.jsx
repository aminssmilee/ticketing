import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Report() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="Report Ticket"
          description="Download laporan tiket berdasarkan tanggal dan kategori."
        />

        <div className="px-4 py-6 space-y-4 lg:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Input placeholder="Utility / RF / Alarm" />
            </div>

            <div>
              <label className="text-sm font-medium">Sub Category</label>
              <Input placeholder="Genset / BUC / Rectifier / dll" />
            </div>
          </div>

          <Button className="mt-4">Download Report</Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
