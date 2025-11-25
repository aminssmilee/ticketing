"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { usePage } from "@inertiajs/react";

export default function ViewTicket() {
  const { ticket, updates } = usePage().props;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title={`Ticket Detail - ${ticket.ticket_number}`}
          description="Detail informasi dan riwayat update ticket."
        />

        <div className="p-6 space-y-8">

          {/* ====================== TICKET INFORMATION ====================== */}
          <div className="border rounded-md bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Ticket Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><strong>Ticket Number:</strong> {ticket.ticket_number}</p>
              <p><strong>Status:</strong> {ticket.status}</p>

              <p><strong>Gateway:</strong> {ticket.gateway}</p>
              <p><strong>Category:</strong> {ticket.category}</p>

              <p><strong>Ticket Date:</strong> {ticket.ticket_date}</p>
              <p><strong>Sub Category:</strong> {ticket.subcategory}</p>

              <p><strong>Start Date:</strong> {ticket.start_date}</p>
              <p><strong>Serial Number:</strong> {ticket.serial_number}</p>

              <p><strong>Alarm:</strong> {ticket.alarm}</p>
              <p><strong>Flag:</strong> {ticket.flag}</p>

              <p><strong>PIC:</strong> {ticket.pic ?? "-"}</p>
              <p><strong>Duration:</strong> {ticket.duration ?? "-"}</p>

              <p><strong>End Date:</strong> {ticket.end_date ?? "-"}</p>
            </div>
          </div>

          {/* ====================== REAL UPDATE HISTORY ====================== */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold">Update History</h2>

            {updates.length === 0 && (
              <p className="text-sm text-gray-500">Belum ada update untuk ticket ini.</p>
            )}

            {updates.map((u, index) => (
              <div 
                key={index}
                className="border rounded-md bg-blue-50 p-4 text-sm"
              >
                <p><strong>Date:</strong> {u.date}</p>
                <p><strong>Updated By:</strong> {u.updated_by}</p>
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
  );
}
