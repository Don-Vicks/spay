//
//
// export default function PayrollGroupTableSkeleton: React.FC = () => (
//
// )

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const PayrollGroupTableSkeleton = () => {
    return (
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
                    {[...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-[150px]"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-[50px]"/></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-4 w-[100px]"/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
export default PayrollGroupTableSkeleton
