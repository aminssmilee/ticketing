import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function WorkInstruction() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          title="Work Instruction"
          description="Kelola dokumen WI (Work Instruction) untuk kebutuhan teknis lapangan."
        />

        <div className="px-4 py-6 space-y-8 lg:px-6">

          {/* Upload WI */}
          <div className="space-y-3 border p-4 rounded-lg">
            <h2 className="font-semibold text-lg">Upload WI Baru</h2>

            <Input placeholder="Category" />
            <Input placeholder="Sub Category" />
            <Input placeholder="Description" />
            <Input placeholder="Tags (pisahkan dengan koma)" />
            <Input type="file" />

            <Button className="mt-2">Upload</Button>
          </div>

          {/* List WI */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">List Work Instruction</h2>

            <table className="w-full text-sm border">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Sub</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Document</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-2 border text-center">1</td>
                  <td className="p-2 border">PM</td>
                  <td className="p-2 border">Redundancy</td>
                  <td className="p-2 border">WI pelaksanaan test redundancy</td>
                  <td className="p-2 border">
                    <Button size="sm">View</Button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 border text-center">2</td>
                  <td className="p-2 border">PM</td>
                  <td className="p-2 border">Warming Up</td>
                  <td className="p-2 border">Tata cara warming up genset</td>
                  <td className="p-2 border">
                    <Button size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
