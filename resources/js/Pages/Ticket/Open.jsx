import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Open() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="Open Ticket"
          description="Buat tiket baru untuk pelaporan event, alarm, atau PM/CM."
        />

        <div className="px-4 py-6 lg:px-6 space-y-8">
          
          {/* FORM WRAPPER */}
          <div className="border rounded-xl p-6 shadow-sm bg-card">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Gateway */}
              <div>
                <Label>Gateway</Label>
                <Input placeholder="Contoh: GW01 Batam" />
              </div>

              {/* Start Date */}
              <div>
                <Label>Start Date</Label>
                <Input type="datetime-local" />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Input placeholder="Utility / RF / Alarm / PM / CM" />
              </div>

              {/* Sub Category */}
              <div>
                <Label>Sub Category</Label>
                <Input placeholder="Genset / BUC / Rectifier / Site Utility" />
              </div>

              {/* Serial Number */}
              <div>
                <Label>Serial Number</Label>
                <Input placeholder="GS-123456" />
              </div>

              {/* Flag */}
              <div>
                <Label>Flag</Label>
                <Input placeholder="Event / PM / CM" />
              </div>

              {/* Alarm */}
              <div className="md:col-span-2">
                <Label>Alarm</Label>
                <Input placeholder="Coolant High Temp / Genset Failed / BUC Hang" />
              </div>

              {/* Indication */}
              <div className="md:col-span-2">
                <Label>Indication</Label>
                <Input placeholder="Penjelasan indikasi masalah" />
              </div>

              {/* Action */}
              <div className="md:col-span-2">
                <Label>Action</Label>
                <Input placeholder="Shutdown genset / restart BUC / replace fuse" />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea rows={6} placeholder="Detail kejadian, kronologi, tindakan, atau catatan tambahan" />
              </div>

            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6 flex justify-end">
              <Button className="px-6">Submit Ticket</Button>
            </div>
          </div>

        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}
