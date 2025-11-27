import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export const getAdminUserColumns = () => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "outline"}>
        {row.original.role}
      </Badge>
    ),
  },

  {
    header: "Department",
    accessorKey: "department.name",
    cell: ({ row }) => row.original.department?.name || "-",
  },

  {
    header: "Sub Dept",
    cell: ({ row }) => row.original.sub_department?.name || "-",
  },

  {
    header: "Gateway",
    cell: ({ row }) => row.original.gateway?.name || "-",
  },

  {
    header: "Position",
    cell: ({ row }) => row.original.position?.name || "-",
  },

  // ==========================
  // 🎯 ACTION COLUMN (⋮)
  // ==========================
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">

            <DropdownMenuItem
              onClick={() =>
                window.location.href = `/ticket/users/${user.id}/detail`
              }
            >
              Lihat Detail
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("user-edit", { detail: user })
                )
              }
            >
              Edit User
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("user-change-role", { detail: user })
                )
              }
            >
              Ubah Role
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("user-delete", { detail: user.id })
                )
              }
            >
              Hapus User
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
