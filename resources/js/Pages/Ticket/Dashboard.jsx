"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {

  const { total_tickets, summaryCategories, matrix } = usePage().props;
  const gateways = Array.from(new Set(matrix.flatMap(row => 
    Object.keys(row).filter(key => key !== 'category')
  )));

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

                  {gateways.map(gw => (
                    <th key={gw} className="border px-3 py-2 text-center">{gw}</th>
                  ))}
                </tr>
              </thead>


              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-2 font-medium">{row.category}</td>

                    {gateways.map(gw => (
                      <td key={gw} className="border px-3 py-2 text-center">
                        {row[gw]}
                      </td>
                    ))}
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
