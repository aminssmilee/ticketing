"use client"

import * as React from "react"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Basic inputs
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Badges
import { Badge } from "@/components/ui/badge"

// Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Tabs
import { Tabs, TabsContent } from "@/components/ui/tabs"

// Dropdown
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Select
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

// Sheet (sidebar)
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"


import {
  GripVerticalIcon,
  SearchIcon,
  ColumnsIcon,
  XIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
  FilterIcon,
  CheckCircle2Icon,
  Loader2Icon,
} from "lucide-react"

// ✔ Dummy ticket data
export const dummyTickets = [
  {
    id: 1,
    gateway: "GW01",
    serial: "GS-12345",
    flag: "Event",
    alarm: "BUC1 Hang",
    status: "Open",
    pic: "SNT Team",
  },
  {
    id: 2,
    gateway: "GW02",
    serial: "AN-93211",
    flag: "PM",
    alarm: "Low Voltage",
    status: "Close",
    pic: "UOM Team",
  },
]

// ✔ Drag handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3" />
    </Button>
  )
}

// ✔ Columns (khusus ticket)
const columns = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "serial",
    header: "Serial",
  },
  {
    accessorKey: "flag",
    header: "Flag",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-2">
        {row.original.flag}
      </Badge>
    ),
  },
  {
    accessorKey: "alarm",
    header: "Alarm",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "Open" ? (
        <Badge className="gap-1 text-green-600" variant="outline">
          <CheckCircle2Icon className="size-3" /> Open
        </Badge>
      ) : (
        <Badge className="gap-1 text-red-600" variant="outline">
          <Loader2Icon className="size-3" /> Close
        </Badge>
      ),
  },
  {
    accessorKey: "pic",
    header: "PIC",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem>
            <PencilIcon className="size-4 mr-2" /> Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-600">
            <Trash2Icon className="size-4 mr-2" /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// ✔ Sortable row
function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      data-dragging={isDragging}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="data-[dragging=true]:opacity-70"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// ===================
// MAIN DATATABLE
// ===================
export function TicketTable() {
  const [data, setData] = React.useState(dummyTickets)
  const [search, setSearch] = React.useState("")
  const [sorting, setSorting] = React.useState([])
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  const filtered = React.useMemo(() => {
    if (!search) return data
    return data.filter((t) =>
      Object.values(t).some((x) =>
        String(x).toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, data])

  const ids = filtered.map((x) => x.id)

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Tabs defaultValue="outline" className="flex flex-col gap-6">

      {/* Toolbar */}
      <div className="flex justify-between items-center px-4">

        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 size-4 text-muted-foreground" />

          <Input
            className="pl-8 w-64"
            placeholder="Cari ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1"
              onClick={() => setSearch("")}
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ColumnsIcon className="size-4 mr-2" /> Kolom
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {table.getAllColumns().map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={(v) => col.toggleVisibility(v)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLE */}
      <TabsContent value="outline">
        <div className="overflow-hidden rounded-lg border">

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={({ active, over }) => {
              if (active.id !== over?.id) {
                const oldIndex = ids.indexOf(active.id)
                const newIndex = ids.indexOf(over.id)
                setData((arr) => arrayMove(arr, oldIndex, newIndex))
              }
            }}
          >
            <Table className="text-sm">
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((h) => (
                      <TableHead key={h.id}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </TabsContent>
    </Tabs>
  )
}
