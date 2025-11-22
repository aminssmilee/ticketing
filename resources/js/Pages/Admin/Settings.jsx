"use client"

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@components/ui/sidebar"
import { AppSidebar } from "@components/app-sidebar"
import { SiteHeader } from "@components/site-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BellIcon, UserIcon, ShieldCheckIcon, GlobeIcon } from "lucide-react"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Settings"
          description="Kelola pengaturan akun, privasi, dan sistem"
        />

        <div className="flex flex-col flex-1 px-4 py-6 gap-6">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Akun</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
              <TabsTrigger value="system">Sistem</TabsTrigger>
            </TabsList>

            {/* TAB AKUN */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Akun</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nama Lengkap</Label>
                      <Input placeholder="Stalis Ahmad Sholeh" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input placeholder="stalis@webcare.idn" />
                    </div>
                    <div>
                      <Label>Nomor Telepon</Label>
                      <Input placeholder="+62 812-3456-7890" />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input disabled value="Administrator" />
                    </div>
                  </div>
                  <Button className="mt-2">Simpan Perubahan</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB KEAMANAN */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Keamanan Akun</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label>Password Lama</Label>
                    <Input type="password" placeholder="••••••" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password Baru</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button className="mt-3">Ubah Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB SISTEM */}
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>Preferensi Sistem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BellIcon className="h-4 w-4" />
                      <Label>Aktifkan Notifikasi</Label>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GlobeIcon className="h-4 w-4" />
                      <Label>Bahasa Indonesia</Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="h-4 w-4" />
                      <Label>Tema Gelap</Label>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>

                  <Separator />
                  <Button variant="destructive">Reset Semua Pengaturan</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
