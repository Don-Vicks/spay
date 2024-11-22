"use client"

import * as React from "react"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addAddressBook, deleteAddress} from "@/actions/dashboard/addressbook";

interface Address {
    id: number
    name: string
    email: string,
    wallet_address: string
    department: string,
    network: string,
}

export default function AddressesTable({ initialAddresses }: { initialAddresses: Address[] }) {
    const [addresses, setAddresses] = React.useState(initialAddresses)
    const [newAddress, setNewAddress] = React.useState({ name: "", email: "", wallet_address: "", department: "", network: "" })
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const { toast } = useToast()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewAddress(prev => ({ ...prev, [name]: value }))
    }

    const handleAddAddress = async () => {
        try {
            const response = await addAddressBook(newAddress);
            // if (!response.ok) {
            //     throw new Error('Failed to add address')
            // }
            //
            // const addedAddress: Address = await response.json()
            setAddresses(prev => [...prev, newAddress])
            setNewAddress({ name: "", wallet_address: "", department: "", email: "", network: "" })
            setIsDialogOpen(false)
            toast({
                title: "Address added",
                description: "The new address has been successfully added.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add the address. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteAddress = async (id: string) => {
        try {
           await deleteAddress(id);

            setAddresses(prev => prev.filter(address => address.id !== id))
            toast({
                title: "Address deleted",
                description: "The address has been successfully deleted.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the address. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Address Book</h1>
            <div className="mb-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#7A75B5] hover:bg-[#6A65A5] text-white">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Address
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new address here. So you can easily use them when creating Payrolls
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="street" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newAddress.name}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="street" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newAddress.email}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="city" className="text-right">
                                    Wallet Address
                                </Label>
                                <Input
                                    id="wallet_address"
                                    name="wallet_address"
                                    value={newAddress.wallet_address}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Select
                                    onValueChange={(value) =>
                                        setNewAddress((prev) => ({...prev, network: value}))
                                    }>
                                    <Label htmlFor="city" className="text-right">
                                        Network
                                    </Label>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                            placeholder={
                                                newAddress.department || "Select a Network"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Solana">Solana</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Select
                                    onValueChange={(value) =>
                                        setNewAddress((prev) => ({...prev, department: value}))
                                    }>
                                    <Label htmlFor="city" className="text-right">
                                        Department
                                    </Label>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                            placeholder={
                                                newAddress.department || "Select a Department"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IT">IT</SelectItem>
                                        <SelectItem value="HR">HR</SelectItem>
                                        <SelectItem value="Marketing & Sales">Marketing & Sales</SelectItem>
                                        <SelectItem value={"Operations"}>Operations</SelectItem>
                                        <SelectItem value={'Internal Team'}>Internal Team</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddAddress}>Save address</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Wallet Address</TableHead>
                            <TableHead>Network</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {addresses.map((address) => (
                            <TableRow key={address.id}>
                                <TableCell>{address.name}</TableCell>
                                <TableCell>{address.email}</TableCell>
                                <TableCell>{address.department}</TableCell>
                                <TableCell>{address.wallet_address}</TableCell>
                                <TableCell>{address.network}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="mr-2">
                                        <Pencil className="h-4 w-4"/>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}