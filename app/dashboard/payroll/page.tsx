"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import PayrollGroupTableSkeleton from "@/components/skeletons/payroll-skeleton"
import {addGroup, deleteGroup, getGroups, getOrganization, updateGroup} from "@/actions/dashboard/payroll/payroll"

const fetchPayrollGroups = async () => {
    return await getGroups()
}

const fetchOrganizations = async () => {
    return await getOrganization()
}

const PayrollGroupManager = () => {
    const [payrollGroups, setPayrollGroups] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    //const [currentGroup, setCurrentGroup] = useState({ id: null, name: "", organization: "" })
    const [currentGroup, setCurrentGroup] = useState([])
    const { toast } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            const [groups, orgs] = await Promise.all([fetchPayrollGroups(), fetchOrganizations()])
            setPayrollGroups(groups)
            setOrganizations(orgs)
        }
        fetchData()
    }, [])

    const handleInputChange = (e) => {
        setCurrentGroup((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAddGroup = async () => {
        const newGroupData = { ...currentGroup }
        const {name, organization} = newGroupData;
        await addGroup(name, organization);
        //setPayrollGroups((prev) => [...prev, newGroupData])
        setIsDialogOpen(false)
        toast({ title: "Group Added", description: "New payroll group added successfully." })
    }

    const handleEditGroup = (id: string) => {
        const groupToEdit = payrollGroups.find((group) => group.id === id)
        setCurrentGroup(groupToEdit)
        setIsEditDialogOpen(true)
    }

    const handleSaveEdit =  async () => {
        // console.log(currentGroup.name, currentGroup.organization, currentGroup.status, currentGroup.id)
        setPayrollGroups((prev) =>
            prev.map((group) => (group.id === currentGroup.id ? { ...currentGroup } : group))
        )
        await updateGroup(currentGroup.id, currentGroup.name, currentGroup.organization, currentGroup.status);
        setIsEditDialogOpen(false)
        toast({ title: "Group Updated", description: "Payroll group updated successfully." })
    }

    const handleDeleteGroup = async (id: string) => {
        await deleteGroup(id);
        setPayrollGroups((prev) => prev.filter((group) => group.id !== id))
        toast({ title: "Group Deleted", description: "Payroll group deleted successfully." })
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Payroll Groups</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Group
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Payroll Group</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    value={currentGroup.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <Label>Organization</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setCurrentGroup((prev) => ({
                                            ...prev,
                                            organization: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizations.map((org) => (
                                            <SelectItem key={org.id} value={org.id}>
                                                {org.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={handleAddGroup} className="mt-4">
                            Save
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
            {payrollGroups.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Organization</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payrollGroups.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell>{group.name}</TableCell>
                                <TableCell>{group.organizations.name}</TableCell>
                                <TableCell>
                                    <Switch disabled={true} checked={group.status} />
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button onClick={() => handleEditGroup(group.id)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={() => handleDeleteGroup(group.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button>
                                    <Link href={`/dashboard/payroll/recipient/${group.id}`}>
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <PayrollGroupTableSkeleton />
            )}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Payroll Group</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                name="name"
                                value={currentGroup.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label>Organization</Label>
                            <Select
                                onValueChange={(value) =>
                                    setCurrentGroup((prev) => ({
                                        ...prev,
                                        organization: value,
                                    }))
                                }
                                value={currentGroup.organization}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Organization"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {organizations.map((org) => (
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Switch
                                checked={currentGroup.status}
                                onCheckedChange={(value) =>
                                    setCurrentGroup((prev) => ({...prev, status: value}))
                                }
                                aria-readonly
                            />
                        </div>
                    </div>
                    <Button onClick={handleSaveEdit} className="mt-4">
                        Save Changes
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default function PayrollGroupPage() {
    return (
        <React.Suspense fallback={<PayrollGroupTableSkeleton />}>
            <PayrollGroupManager />
        </React.Suspense>
    )
}
