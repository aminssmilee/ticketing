"use client"
import * as React from "react"
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { columns } from "./columns"
import DraggableRow from "./DraggableRow"
import { dummyProducts } from "./dummyData"
import FilterTambahProduk from "./FilterTambahProduk"
import { Button } from "@/components/ui/button"

export function DataTable() {
  const [data, setData] = React.useState(dummyProducts)
  const [filtered, setFiltered] = React.useState(dummyProducts)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor))

  const handleFilterChange = (filters) => {
    const { kategori, status, minHarga, maxHarga } = filters
    setFiltered(
      data.filter((item) => {
        const matchCategory = kategori ? item.category === kategori : true
        const matchStatus = status
          ? status === "aktif"
            ? item.is_active === 1
            : item.is_active === 0
          : true
        const price = parseFloat(item.price)
        const matchMin = minHarga ? price >= parseFloat(minHarga) : true
        const matchMax = maxHarga ? price <= parseFloat(maxHarga) : true
        return matchCategory && matchStatus && matchMin && matchMax
      })
    )
  }

  const handleAddProduct = (product) => {
    const newData = [product, ...data]
    setData(newData)
    setFiltered(newData)
  }

  const dataIds = React.useMemo(() => filtered.map((d) => d.id), [filtered])
  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setFiltered((items) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <FilterTambahProduk onFilterChange={handleFilterChange} onAddProduct={handleAddProduct} />
      </div>

      {/* Table */}
      <div className="rounded-md border bg-background overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>{header.column.columnDef.header}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-4">
        <Button onClick={() => table.nextPage()}>Halaman berikutnya</Button>
      </div>
    </div>
  )
}
