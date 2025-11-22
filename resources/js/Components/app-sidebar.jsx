"use client"

import * as React from "react"
import { usePage } from "@inertiajs/react"
import {
  LayoutDashboardIcon,
  ListIcon,
  FileTextIcon,
  BookOpenIcon,
  SettingsIcon
} from "lucide-react"

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

  const { auth } = usePage().props
  const user = auth?.user || {
    name: "Guest",
    email: "Not logged in",
    avatar: "/avatars/default.png",
  }

  const data = {
    user,
    navMain: [
      {
        title: "Open Ticket",
        url: route("ticket.open"),
        icon: LayoutDashboardIcon,
      },
      {
        title: "List Ticket",
        url: route("ticket.list"),
        icon: ListIcon,
      },
      {
        title: "Report Ticket",
        url: route("ticket.report"),
        icon: FileTextIcon,
      },
      {
        title: "Work Instruction",
        url: route("ticket.wi"),
        icon: BookOpenIcon,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: route("ticket.settings"),
        icon: SettingsIcon,
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
              <a href={route("ticket.dashboard")}>
                <span className="text-base font-semibold">PSN Ticketing</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
