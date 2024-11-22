import {TableHead, TableHeader, TableRow, TableBody, TableCell, Table} from "@/components/ui/table";
import {Skeleton} from 'react'

export default function AddressesTableSkeleton() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-8 w-16 ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
