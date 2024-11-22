"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import {Switch} from "@/components/ui/switch";
import {cn} from  "@/lib/utils"
import {
    getStablecoins,
    getRecipients,
    addPayment,
    deletePayment,
    getAddresses, addRecipient, deleteRecipient
} from "@/actions/dashboard/payroll/recipients"
import {Stablecoin, Recipient, newRecipient, RecipientsTable} from "@/lib/types/types";
import {getGroup} from "@/actions/dashboard/payroll/payroll";
import {useRouter} from "next/navigation";

const PaymentForm: React.FC<{
    recipients: Recipient[]
    stablecoins: Stablecoin[]
    onSubmit: (payment: Omit<Payment, 'id'>) => void
    onCancel: () => void
}> = ({ recipients, stablecoins, onSubmit, onCancel }) => {
    const [form, setForm] = useState<Omit<newRecipient, 'id'>>({ recipientId: 0, stablecoinId: 0, amount: '', schedule: '', status: false })

    const handleChange = (name: string, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
    }
   const schedules = ['hourly', 'daily', 'weekly', 'monthly', 'yearly'];
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                    onValueChange={(value) => handleChange('recipientId', String(value))}
                    onOpenChange={(open) => {
                        if (open) {
                            const input = document.querySelector('[role="combobox"]') as HTMLInputElement;
                            if (input) input.focus();
                        }
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Search for a recipient"/>
                    </SelectTrigger>
                    <SelectContent>
                        <div className="relative">
                            <Input
                                className="mb-2"
                                placeholder="Search..."
                                onChange={(e) => {
                                    const searchTerm = e.target.value.toLowerCase();
                                    const filtered = recipients.filter(recipient =>
                                        recipient.name.toLowerCase().includes(searchTerm)
                                    );
                                    // Update visible options
                                }}
                            />
                        </div>
                        {recipients.map((recipient) => (
                            <SelectItem
                                key={recipient.id}
                                value={recipient.id}
                            >
                                {recipient.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="stablecoin">Stablecoin</Label>
                <Select onValueChange={(value) => handleChange('stablecoinId', Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a stablecoin"/>
                    </SelectTrigger>
                    <SelectContent>
                        {stablecoins.map((stablecoin) => (
                            <SelectItem key={stablecoin.id} value={stablecoin.id.toString()}>
                                {stablecoin.name} ({stablecoin.symbol})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={form.amount}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                    required
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="stablecoin">Schedule</Label>
                <Select onValueChange={(value) => handleChange('schedule', String(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a payment schedule"/>
                    </SelectTrigger>
                    <SelectContent>
                        {schedules.map((schedule) => (
                            <SelectItem key={schedule} value={schedule}>
                                {schedule.toUpperCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className={'grid w-full items-center gap-1.5'}>
                <Label htmlFor="status">Status</Label>
                <Switch checked={form.status}
                        onCheckedChange={(value) =>
                            setForm((prev) => ({...prev, status: value}))
                        }
                        aria-readonly/>
            </div>
            <DialogFooter className={'gap-2'}>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </DialogFooter>
        </form>
    )
}

const PaymentsTable: React.FC<{ groupId: string }> = ({groupId}) => {
    const [payments, setPayments] = useState<RecipientsTable[]>([])
    //const [payments, setPayments] = useState([])
    const [recipients, setRecipients] = useState<Recipient[]>([])
    const [stablecoins, setStablecoins] = useState<Stablecoin[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {toast} = useToast()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedRecipients, fetchedStablecoins, fetchedData] = await Promise.all([
                    getAddresses(),
                    getStablecoins(),
                    getRecipients(groupId)
                ])
                setRecipients(fetchedRecipients || [])
                setStablecoins(fetchedStablecoins || [])
                setPayments(fetchedData || [])
            } catch (error) {
                console.error('Error fetching data:', error)
                toast({
                    title: "Error",
                    description: "Failed to fetch data. Please try again.",
                    variant: "destructive",
                })
            }
        }
        fetchData()
    }, [groupId, toast])

    const handleAdd = () => setIsDialogOpen(true)

    const handleDelete = async (recipientId: string) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            //try {
                await deleteRecipient(groupId, recipientId)
                //setPayments(payments.filter(p => p.id !== paymentId))
                toast({
                    title: "Success",
                    description: "Recipient deleted successfully.",
                })
            // } catch (error) {
            //     //console.error('Error deleting recipient:', error)
            //     toast({
            //         title: "Error",
            //         description: "Failed to delete recipient. Please try again.",
            //         variant: "destructive",
            //     })
           // }
        }
    }

    const handleSubmit = async (recipient: Omit<newRecipient, 'id'>) => {
        try {
            const newRecipient = await addRecipient(groupId, recipient)
            setPayments([...payments, newRecipient])
            setIsDialogOpen(false)
            toast({
                title: "Success",
                description: "Payroll Recipient added successfully.",
            })
        } catch (error) {
            console.error('Error adding recipient:', error)
            toast({
                title: "Error",
                description: "Failed to add recipient. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recipients</h2>
                <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Recipient
                </Button>
            </div>
            {payments.length === 0 ? (
                <p>No recipients found.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Recipient Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => {
                            return (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment?.address_books?.name}</TableCell>
                                    <TableCell>{payment.amount} {''} {payment?.stablecoins.name}</TableCell>
                                    <TableCell>{payment.schedule}</TableCell>
                                    <TableCell>
                                        <Switch disabled={true} checked={payment.status}/>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(payment.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Recipient</DialogTitle>
                    </DialogHeader>
                    <PaymentForm
                        recipients={recipients}
                        stablecoins={stablecoins}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

const Page = () => {
    const { id } = useParams()
    const groupId = Array.isArray(id) ? id[0] : id
    // useEffect(() => {
    //      const groupName = async (id: string) => {
    //          return await getGroup(id)
    //      };
    //
    //      groupName(groupId);
    // }, []);


    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Payroll Group Recipients</h1>
            <PaymentsTable groupId={groupId} />
        </div>
    )
}

export default Page