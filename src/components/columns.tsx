"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { School } from "./dashboard"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"


export const columns: ColumnDef<School>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div className="text-center">{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          School Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: "registrations",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-end w-full"
        >
          Registrations
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("registrations"))
      return <div className="text-right font-medium">{amount}</div>
    },
  },
  {
    accessorKey: "programme",
    header: "Programme",
    cell: ({ row }) => <div>{row.getValue("programme")}</div>,
  },
  {
    accessorKey: "academicYear",
    header: "Academic Year",
    cell: ({ row }) => <div>{row.getValue("academicYear")}</div>,
  },
]
