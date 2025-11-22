"use client"

import * as React from "react"
import { usePage } from "@inertiajs/react"
import {
  BarChartIcon,
  ClipboardListIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  FileTextIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }) {
  // 🔹 Ambil data user login dari Laravel (Inertia shared prop)
  const { auth } = usePage().props
  const user = auth?.user

  // Jika belum login (null), tampilkan user kosong biar gak error
  const currentUser = user || {
    name: "Guest",
    email: "Not logged in",
    avatar: "/avatars/default.png",
  }

  const data = {
    user: currentUser,
    navMain: [
      {
        title: "Dashboard",
        url: route("admin.dashboard"),
        icon: LayoutDashboardIcon,
      },
      {
        title: "Products",
        url: route("admin.products"),
        icon: BarChartIcon,
      },
    ],
    users: [
      {
        name: "Management Users",
        url: route("admin.users"),
        icon: UsersIcon,
      },
    ],
    media: [
      {
        name: "Banner",
        url: route("admin.banner"),
        icon: FolderIcon,
      },
    ],
    orders: [
      {
        name: "Orders",
        url: route("admin.orders"),
        icon: FileTextIcon,
      },
    ],
    documents: [
      {
        name: "Reports",
        url: route("admin.reports"),
        icon: ClipboardListIcon,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: route("admin.settings"),
        icon: SettingsIcon,
      },
      {
        title: "Get Help",
        url: route("admin.getHelp"),
        icon: HelpCircleIcon,
      },
      {
        title: "Search",
        url: route("admin.search"),
        icon: SearchIcon,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href={route("admin.dashboard")}>
                <span className="text-base font-semibold">appcare.id</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments label="Users" items={data.users} />
        <NavDocuments label="Media" items={data.media} />
        <NavDocuments label="Orders" items={data.orders} />
        <NavDocuments label="Documents" items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer - User info */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
