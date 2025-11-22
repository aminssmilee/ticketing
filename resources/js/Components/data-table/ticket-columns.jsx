import { Badge } from "@/components/ui/badge"

export const ticketColumns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "serial",
    header: "Serial Number",
  },
  {
    accessorKey: "flag",
    header: "Flag",
  },
  {
    accessorKey: "alarm",
    header: "Alarm",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")

      return (
        <Badge
          variant="outline"
          className={
            status === "Open"
              ? "bg-red-100 text-red-600 border-red-300"
              : "bg-green-100 text-green-600 border-green-300"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "pic",
    header: "PIC",
  },
]
