"use client"

import React from "react"
import { SidebarProvider, SidebarInset } from "@components/ui/sidebar"
import { AppSidebar } from "@components/app-sidebar"
import { SiteHeader } from "@components/site-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { MessageSquareIcon, MailIcon, BookOpenIcon, HelpCircleIcon } from "lucide-react"

export default function GetHelp() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Get Help"
          description="Temukan bantuan, panduan, atau hubungi tim support"
        />

        <div className="flex flex-col px-4 py-6 gap-6">
          {/* Pencarian Bantuan */}
          <Card>
            <CardHeader>
              <CardTitle>Cari Bantuan</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input placeholder="Masukkan kata kunci (misal: reset password)" />
              <Button>Search</Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="faq1">
                  <AccordionTrigger>Bagaimana cara mengganti password?</AccordionTrigger>
                  <AccordionContent>
                    Masuk ke halaman <strong>Settings → Keamanan</strong>, lalu isi password lama dan baru.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq2">
                  <AccordionTrigger>Bagaimana cara menambah produk baru?</AccordionTrigger>
                  <AccordionContent>
                    Buka <strong>Products</strong> → klik tombol “Tambah Produk” di kanan atas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq3">
                  <AccordionTrigger>Apa fungsi halaman Reports?</AccordionTrigger>
                  <AccordionContent>
                    Halaman <strong>Reports</strong> menampilkan analitik penjualan dan aktivitas visitor.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Kontak Bantuan */}
          <Card>
            <CardHeader>
              <CardTitle>Hubungi Kami</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <Button variant="outline">
                <MessageSquareIcon className="mr-2 h-4 w-4" /> Live Chat
              </Button>
              <Button variant="outline">
                <MailIcon className="mr-2 h-4 w-4" /> Email Support
              </Button>
              <Button variant="outline">
                <BookOpenIcon className="mr-2 h-4 w-4" /> Dokumentasi
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
