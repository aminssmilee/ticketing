"use client"

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@components/ui/sidebar"
import { AppSidebar } from "@components/app-sidebar"
import { SiteHeader } from "@components/site-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SearchIcon, PackageIcon, UsersIcon, FileTextIcon } from "lucide-react"

const mockData = {
  products: ["Mini E-Commerce", "Company Profile", "Landing Page"],
  users: ["Stalis Ahmad", "Admin WebCare", "Member 01"],
  orders: ["INV-00123", "INV-00124"],
}

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState({})

  const handleSearch = () => {
    const filtered = {
      products: mockData.products.filter((p) =>
        p.toLowerCase().includes(query.toLowerCase())
      ),
      users: mockData.users.filter((u) =>
        u.toLowerCase().includes(query.toLowerCase())
      ),
      orders: mockData.orders.filter((o) =>
        o.toLowerCase().includes(query.toLowerCase())
      ),
    }
    setResults(filtered)
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          title="Search"
          description="Cari data produk, user, atau order di seluruh sistem"
        />

        <div className="flex flex-col px-4 py-6 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pencarian Global</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                placeholder="Ketik kata kunci..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>
                <SearchIcon className="h-4 w-4 mr-2" /> Cari
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Produk</TabsTrigger>
              <TabsTrigger value="users">User</TabsTrigger>
              <TabsTrigger value="orders">Order</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <PackageIcon className="h-4 w-4 mr-2 inline" /> Produk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results.products?.length ? (
                    <ul className="list-disc pl-6 space-y-1">
                      {results.products.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Tidak ada hasil ditemukan.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <UsersIcon className="h-4 w-4 mr-2 inline" /> User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results.users?.length ? (
                    <ul className="list-disc pl-6 space-y-1">
                      {results.users.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Tidak ada hasil ditemukan.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FileTextIcon className="h-4 w-4 mr-2 inline" /> Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results.orders?.length ? (
                    <ul className="list-disc pl-6 space-y-1">
                      {results.orders.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Tidak ada hasil ditemukan.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
