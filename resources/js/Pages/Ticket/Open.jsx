"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePage, router } from "@inertiajs/react";


// ================================
// ⬇️  PASTE CATEGORY_DATA DI SINI
// ================================
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


  // ============================
  // CATEGORY KHUSUS BANJAR
  // ============================
  "RF (KB)": ["RF"],
  "Utility (KB)": ["Utility", "-"],
  "Ancillary (KB)": ["Dehidrator", "Rain Blower", "Lampu AWL", "Lampu Kingpost", "Lampu HUB", "TFCU/GPS", "10 MHz Distribution"],
  "Activity (KB)": ["Belum ada sub kategori"],
  "Antenna Issue (KB)": ["Belum ada sub kategori"],
  "Diesel Refill (KB)": ["Belum ada sub kategori"],
  "Electrical Report (KB)": ["Belum ada sub kategori"],
  "Guest (KB)": ["10 MHz Distribution"],
  "PM (KB)": ["PM"],
  "CM (KB)": ["CM"],
  "Weather (KB)": ["Belum ada sub kategori"],
  "TTC (KB)": ["Activity", "PM", "CM", "RF", "Ancillary", "Utility"],
  "Monitoring (KB)": ["CSM", "Compass", "Grafana"],
  "Panel (KB)": ["Belum ada sub kategori"],
  "Lainnya (KB)": ["-"],
};
// ================================


// ================================
// ⬇️  MULAI COMPONENT OPEN()
// ================================
export default function Open() {

  const { gateway } = usePage().props;

  const [selectedCategory, setSelectedCategory] = useState("");
  const subCategories = selectedCategory ? CATEGORY_DATA[selectedCategory] : [];
  const now = new Date().toISOString().slice(0, 16);

  const [form, setForm] = useState({
    gateway_id: gateway?.id ?? null,
    start_date: now,
    category: "",
    sub_category: "",
    serial_number: "",
    flag: "",
    alarm: "",
    indication: "",
    action: "",
    description: "",
  });

  

  const submitTicket = () => {
    router.post("/ticket/open", form);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Open Ticket"
          description="Buat tiket baru untuk pelaporan event, alarm, atau PM/CM."
        />

        <div className="px-4 py-6 lg:px-6 space-y-8">
          <div className="border rounded-xl p-6 shadow-sm bg-card">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Gateway */}
              <div>
                <Label>Gateway</Label>
                <Input
                  // value={gateway ? `${gateway.code} ${gateway.name}` : "-"}
                  value={gateway ? `${gateway.name}` : "-"}
                  readOnly
                  className="bg-muted text-black"
                />
                <small className="text-xs text-muted-foreground">
                  * Auto Generate
                </small>
              </div>

              {/* Start Date */}
              <div>
                <Label>Start Date</Label>
                <Input
                  type="datetime-local"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                />
                <small className="text-xs text-muted-foreground">
                  * Auto Generate Date & Time
                </small>
              </div>


              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  onValueChange={(val) => {
                    setSelectedCategory(val);
                    setForm({ ...form, category: val });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Category" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.keys(CATEGORY_DATA).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub Category */}
              <div>
                <Label>Sub Category</Label>
                <Select
                  disabled={!selectedCategory}
                  onValueChange={(sub) =>
                    setForm({ ...form, sub_category: sub })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Sub Category" />
                  </SelectTrigger>

                  <SelectContent>
                    {subCategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Serial Number */}
              <div>
                <Label>Serial Number</Label>
                <Input
                  placeholder="Contoh : GS-123456"
                  onChange={(e) =>
                    setForm({ ...form, serial_number: e.target.value })
                  }
                />
              </div>

              {/* Flag */}
              <div>
                <Label>Flag</Label>
                <Select
                  onValueChange={(v) => setForm({ ...form, flag: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Flag" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                    <SelectItem value="cm">CM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alarm */}
              <div className="md:col-span-2">
                <Label>Alarm</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, alarm: e.target.value })
                  }
                />
              </div>

              {/* Indication */}
              <div className="md:col-span-2">
                <Label>Indication</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, indication: e.target.value })
                  }
                />
              </div>

              {/* Action */}
              <div className="md:col-span-2">
                <Label>Action</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, action: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={6}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="px-6" onClick={submitTicket}>
                Submit Ticket
              </Button>
            </div>

          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
