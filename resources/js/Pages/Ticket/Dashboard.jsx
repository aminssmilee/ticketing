"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

// =========================
// DUMMY DATA (sementara)
// =========================
const total_tickets = 12;

const summaryCategories = [
  { category: "RF", total: 0 },
  { category: "Utility", total: 0 },
  { category: "Ancillary", total: 1 },
  { category: "Activity", total: 1 },
  { category: "Antenna Issue", total: 1 },
  { category: "PM", total: 0 },
  { category: "CM", total: 1 },
  { category: "Guest", total: 0 },
  { category: "Monitoring", total: 1 },
  { category: "Weather", total: 1 },
  { category: "ITC Activity", total: 1 },
  { category: "Panel", total: 1 },
  { category: "HUB", total: 1 },
  { category: "Diesel Refill", total: 1 },
  { category: "Electrical Report", total: 1 },
];

const matrix = [
  { category: "RF", GW01: "-", GW02: "-", GW03: "-", GW04: "1", GW05: "-", GW06: "-" },
  { category: "Utility", GW01: "-", GW02: "-", GW03: "-", GW04: "-", GW05: "-", GW06: "-" },
  { category: "Ancillary", GW01: "-", GW02: "-", GW03: "1", GW04: "1", GW05: "-", GW06: "-" },
  { category: "Activity", GW01: "-", GW02: "-", GW03: "1", GW04: "-", GW05: "-", GW06: "-" },
  { category: "Antenna Issue", GW01: "-", GW02: "-", GW03: "-", GW04: "1", GW05: "-", GW06: "-" },
  { category: "PM", GW01: "-", GW02: "-", GW03: "1", GW04: "-", GW05: "-", GW06: "-" },
  { category: "CM", GW01: "-", GW02: "-", GW03: "1", GW04: "-", GW05: "-", GW06: "-" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="Dashboard"
          description="Ringkasan aktivitas gateway & SMT ticket"
        />

        <div className="p-6 space-y-10">

          {/* ===================== TOTAL TICKETS ===================== */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-bold">Total Ticket</h2>
            <p className="text-4xl font-extrabold mt-2">{total_tickets}</p>
          </div>

          {/* ===================== SUMMARY CATEGORY ===================== */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-bold mb-4">Summary Gateway SMT Ticket</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {summaryCategories.map((item, i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md text-center bg-gray-50 hover:bg-gray-100"
                >
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <p className="text-xl font-semibold">{item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===================== MATRIX TABLE ===================== */}
          <div className="bg-white p-6 rounded-lg shadow border overflow-auto">
            <h2 className="text-lg font-bold mb-4">Summary GAR & SMT Ticket</h2>

            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Category</th>
                  <th className="border px-3 py-2">GW01</th>
                  <th className="border px-3 py-2">GW02</th>
                  <th className="border px-3 py-2">GW03</th>
                  <th className="border px-3 py-2">GW04</th>
                  <th className="border px-3 py-2">GW05</th>
                  <th className="border px-3 py-2">GW06</th>
                </tr>
              </thead>

              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-2 font-medium">{row.category}</td>
                    <td className="border px-3 py-2 text-center">{row.GW01}</td>
                    <td className="border px-3 py-2 text-center">{row.GW02}</td>
                    <td className="border px-3 py-2 text-center">{row.GW03}</td>
                    <td className="border px-3 py-2 text-center">{row.GW04}</td>
                    <td className="border px-3 py-2 text-center">{row.GW05}</td>
                    <td className="border px-3 py-2 text-center">{row.GW06}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
