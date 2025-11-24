"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


import { usePage } from "@inertiajs/react"   // ⬅ WAJIB

export default function UpdateTicket() {
  const { props } = usePage()

  // Ambil data ticket dari props
  const ticket = props.ticket || {}   // ⬅ SAFE fallback biar tidak undefined

  // State dengan fallback string kosong
  const [flag, setFlag] = useState(ticket.flag ?? "")
  const [status, setStatus] = useState(ticket.status ?? "Open")


  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title="Update Ticket" description="Update tiket yang sudah dibuat." />

        <div className="px-4 py-6 lg:px-6">
          <div className="border rounded-xl p-6 bg-card shadow-sm">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Ticket Number */}
              <div>
                <Label>Ticket Number</Label>
                <Input value={ticket.ticket_number} disabled />
              </div>

              {/* Gateway */}
              <div>
                <Label>Gateway</Label>
                <Input value={ticket.gateway} disabled />
              </div>

              {/* Ticket Date */}
              <div>
                <Label>Ticket Date</Label>
                <Input value={ticket.ticket_date} disabled />
              </div>

              {/* Start Date */}
              <div>
                <Label>Start Date</Label>
                <Input value={ticket.start_date} disabled />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Input value={ticket.category} disabled />
              </div>

              {/* Sub Category */}
              <div>
                <Label>Sub Category</Label>
                <Input value={ticket.subcategory} disabled />
              </div>

              {/* Serial Number */}
              <div>
                <Label>Serial Number</Label>
                <Input value={ticket.serial_number} disabled />
              </div>

              {/* Flag */}
              <div>
                <Label>Flag</Label>
                <Select value={flag} onValueChange={setFlag}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Flag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                    <SelectItem value="CM">CM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alarm */}
              <div className="md:col-span-2">
                <Label>Alarm</Label>
                <Input value={ticket.alarm} disabled />
              </div>

              {/* Indication */}
              <div className="md:col-span-2">
                <Label>Indication</Label>
                <Input value={ticket.indication} disabled />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea rows={5} defaultValue={ticket.description} />
              </div>

              {/* Update By */}
              <div>
                <Label>Update By</Label>
                <Input value={ticket.updated_by} disabled />
              </div>

              {/* Ticket PIC */}
              <div>
                <Label>Ticket PIC</Label>
                <Input value={ticket.pic} disabled />
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Open / Close / Update / Assign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Update">Update</SelectItem>
                    <SelectItem value="Assign">Assign</SelectItem>
                    <SelectItem value="Close">Close</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* End Date – muncul hanya jika status Close */}
              {status === "Close" && (
                <div>
                  <Label>End Date</Label>
                  <Input type="datetime-local" />
                </div>
              )}

            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6 flex justify-end">
              <Button className="px-6">Update Ticket</Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
