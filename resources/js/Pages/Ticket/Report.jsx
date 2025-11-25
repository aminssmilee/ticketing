"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { router } from "@inertiajs/react";

// ==== IMPORT SELECT SHADCN ====
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";


// ============================
// CATEGORY DATA (SAMA DENGAN WI)
// ============================
const CATEGORY_DATA = {
  RF: [
    "BDC", "BDC Controller", "BUC", "BUC Controller", "LNA Controller", "LNA Switch", "LNA",
    "LNA Tracking", "Switch Box BUC", "Switch Box BDC", "BDC CSM", "Monopulse Plate",
    "TRU", "TWTA", "TWTA RCU"
  ],

  Utility: ["Panel", "PAC", "Genset", "AC NWIEE", "UPS", "ATS"],

  Ancillary: ["Dehidrator", "Rain Blower", "Lampu AWL", "Lampu Kingpost", "Lampu HUB", "TFCU/GPS", "10 MHz Distribution"],

  Activity: ["Belum ada sub kategori"],

  "Antenna Issue": ["Belum ada sub kategori"],
  Antenna: ["ACU", "ADU", "Motorize", "Tracking", "KVM"],

  "Diesel Refill": ["Belum ada sub kategori"],

  "Electrical Report": ["Belum ada sub kategori"],

  Guest: ["10 MHz Distribution"],

  PM: [
    "Warming Up Genset",
    "Cleaning Genset, PKG, Tangki BBM & Sum Pit",
    "Cleaning Filter UPS",
    "PM UPS + Battery Testing & Test Discharge Battery ",
    "Maintenance Cleaning AC Split & AC Antenna",
    "Cleaning Filter Indoor PAC & Cuci Outdoor PAC",
    "Maintenance PAC",
    "Cleaning Panel Listrik",
    "Load & Temperature Measurement",
    "Grounding Measurement",
    "N-G Voltage Measurement",
    "Maintenance Genset",
    "Electrical Power Quality Measurement",
    "Capture/Setting Parameter RF & Utility",
    "Check Ancillary System",
    "Test Redundancy",
    "PM Antenna Tracking System",
    "PM Antenna Structure",
    "Inspection & Cleaning Rain Blower",
    "PM Antenna Structure TTC",
    "Neutral to Grounding Measurement"
  ],

  CM: [
    "Dehydrator", "Rain Blower", "Lampu AWL", "Lampu Kingpost", "Lampu HUB",
    "10 MHz Distribution", "ACU", "ADU", "Motorize", "Tracking", "KVM",
    "BDC", "BDC Controller", "BUC", "BUC Controller", "LNA Controller", "LNA Switch", "LNA",
    "LNA Tracking", "Switch Box BUC", "Switch Box BDC", "BDC CSM", "Monopulse Plate",
    "TRU", "TWTA", "TWTA RCU", "Panel", "PAC", "Genset", "AC NWIEE", "UPS", "ATS"
  ],

  Weather: ["Belum ada sub kategori"],
  Monitoring: ["Belum ada sub kategori"],
  Panel: ["Belum ada sub kategori"],
  HUB: ["Belum ada sub kategori"],

  TTC: ["Activity", "PM", "CM", "RF", "Ancillary", "Utility"],
};


export default function Report() {

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    category: "",
    sub_category: "",
  });

  const downloadReport = () => {
    router.get(route("ticket.report.download"), filters, {
      preserveState: true,
    });
  };



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

            {/* START DATE */}
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, start_date: e.target.value })
                }
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, end_date: e.target.value })
                }
              />
            </div>

            {/* CATEGORY DROPDOWN */}
            <div>
              <label className="text-sm font-medium">Category</label>

              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters({ ...filters, category: value, sub_category: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Category" />
                </SelectTrigger>

                <SelectContent>
                  {Object.keys(CATEGORY_DATA).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SUB CATEGORY DROPDOWN */}
            <div>
              <label className="text-sm font-medium">Sub Category</label>

              <Select
                value={filters.sub_category}
                onValueChange={(value) =>
                  setFilters({ ...filters, sub_category: value })
                }
                disabled={!filters.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Sub Category" />
                </SelectTrigger>

                <SelectContent>
                  {filters.category &&
                    CATEGORY_DATA[filters.category].map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* DOWNLOAD BUTTON */}
          <Button className="mt-4" onClick={downloadReport}>
            Download Report
          </Button>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
