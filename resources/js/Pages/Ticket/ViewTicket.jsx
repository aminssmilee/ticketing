"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

// Dummy Detail Ticket
const ticketDetail = {
  ticket_number: "TID-2025-08-00001",
  gateway: "Timika",
  ticket_date: "8/14/2025 08:12:34",
  start_date: "8/14/2025 08:00",
  category: "RF",
  subcategory: "BUC",
  serial_number: "AN-0001234",
  alarm: "alarm abc",
  flag: "Event",
  pic: "GAR Site Management",
  duration: "4 h 23 m",
  end_date: "-",
  status: "UPDATE",
}

// Dummy Updates
const ticketUpdates = [
  {
    date: "8/14/2025 08:12:34",
    updated_by: "Bakri Kotala",
    flag: "Event",
    indication: "BUC#1 failed",
    action: "Pengecekan melalui compass",
    description: "Dilakukan action abcd abcd.",
  },
  {
    date: "8/15/2025 08:12:34",
    updated_by: "Samuel",
    flag: "Event",
    indication: "BUC#1 failed",
    action: "Pengecekan melalui compass",
    description:
      "Dilakukan action abcd abcd. Perlu dilakukan pengecekan lebih lanjut. Mohon dibantu untuk assign ke tim terkait",
  },
  {
    date: "8/16/2025 08:12:34",
    updated_by: "Rizky Febrian",
    flag: "Event",
    indication: "BUC#1 failed",
    action: "Pengecekan melalui compass",
    description:
      "Dilakukan action abcd abcd. Perlu dilakukan pengecekan lebih lanjut. Mohon dibantu untuk assign ke tim terkait",
  },
]

export default function ViewTicket({ ticket_number }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>

        <SiteHeader
          title={`Ticket Detail - ${ticket_number}`}
          description="Detail informasi dan update ticket."
        />

        <div className="p-6 space-y-8">

          {/* ====================== TICKET INFORMATION ====================== */}
          <div className="border rounded-md bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Ticket Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

              <p><strong>Ticket Number:</strong> {ticketDetail.ticket_number}</p>
              <p><strong>Status:</strong> {ticketDetail.status}</p>

              <p><strong>Gateway:</strong> {ticketDetail.gateway}</p>
              <p><strong>Category:</strong> {ticketDetail.category}</p>

              <p><strong>Ticket Date:</strong> {ticketDetail.ticket_date}</p>
              <p><strong>Sub Category:</strong> {ticketDetail.subcategory}</p>

              <p><strong>Start Date:</strong> {ticketDetail.start_date}</p>
              <p><strong>Serial Number:</strong> {ticketDetail.serial_number}</p>

              <p><strong>Alarm:</strong> {ticketDetail.alarm}</p>
              <p><strong>Flag:</strong> {ticketDetail.flag}</p>

              <p><strong>Ticket PIC:</strong> {ticketDetail.pic}</p>
              <p><strong>Duration:</strong> {ticketDetail.duration}</p>

              <p><strong>End Date:</strong> {ticketDetail.end_date}</p>
            </div>
          </div>

          {/* ====================== UPDATE SECTION ====================== */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold">Update</h2>

            {ticketUpdates.map((u, index) => (
              <div
                key={index}
                className="border rounded-md bg-blue-50 p-4 text-sm"
              >
                <p><strong>Date:</strong> {u.date}</p>
                <p><strong>Update by:</strong> {u.updated_by}</p>
                <p><strong>Flag:</strong> {u.flag}</p>
                <p><strong>Indication:</strong> {u.indication}</p>
                <p><strong>Action:</strong> {u.action}</p>
                <p className="mt-1"><strong>Description:</strong> {u.description}</p>
              </div>
            ))}
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
