import React from "react"
import { Table, TableHeader, TableRow, TableBody, TableHead } from "@/components/ui/table"
import { PayrollGroup } from "@/lib/types/types"
import { PayrollGroupTableRow } from "./PayrollGroupTableRow"

interface PayrollGroupTableProps {
  payrollGroups: PayrollGroup[]
  onDelete: (id: number) => void
}

export const PayrollGroupTable: React.FC<PayrollGroupTableProps> = ({ payrollGroups, onDelete }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrollGroups.map((group) => (
          <PayrollGroupTableRow key={group.id} payrollGroup={group} onDelete={onDelete} />
        ))}
      </TableBody>
    </Table>
  </div>
)
