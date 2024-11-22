"use client"

import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, Users, Calendar, CreditCard, Download, Plus, MoreHorizontal, Search, RefreshCcw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Simulated API call
const fetchPayrollData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalPayroll: 135000,
                employeesPaid: 1234,
                nextPayday: "July 15",
                pendingApprovals: 23,
                payrollData: [
                    { month: "Jan", total: 120000 },
                    { month: "Feb", total: 125000 },
                    { month: "Mar", total: 122000 },
                    { month: "Apr", total: 130000 },
                    { month: "May", total: 128000 },
                    { month: "Jun", total: 135000 },
                ],
                recentActions: [
                    { name: "June Payroll", date: "Jun 30, 2023", amount: "$130,000" },
                    { name: "Bonus Distribution", date: "Jun 15, 2023", amount: "$25,000" },
                    { name: "May Payroll", date: "May 31, 2023", amount: "$128,000" },
                    { name: "New Hire Payroll", date: "May 15, 2023", amount: "$5,000" },
                    { name: "April Payroll", date: "Apr 30, 2023", amount: "$125,000" },
                ],
                employees: [
                    { name: "Alice Johnson", department: "Engineering", salary: "$85,000", lastPaid: "Jun 30, 2023", status: "Paid" },
                    { name: "Bob Smith", department: "Marketing", salary: "$72,000", lastPaid: "Jun 30, 2023", status: "Paid" },
                    { name: "Carol Williams", department: "HR", salary: "$68,000", lastPaid: "Jun 30, 2023", status: "Processing" },
                    { name: "David Brown", department: "Finance", salary: "$90,000", lastPaid: "May 31, 2023", status: "On Hold" },
                ]
            })
        }, 1500)
    })
}

export default function RobustPayrollDashboard() {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedDepartment, setSelectedDepartment] = React.useState("All")

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await fetchPayrollData()
            setData(result)
        } catch (err) {
            setError("Failed to fetch payroll data. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    const filteredEmployees = data?.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDepartment === "All" || employee.department === selectedDepartment)
    ) || []

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-[#4B4B4D]">Payroll Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button className="bg-[#7A75B5] hover:bg-[#6A65A5] text-white" onClick={fetchData} disabled={loading}>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button className="bg-[#7A75B5] hover:bg-[#6A65A5] text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button className="bg-[#7A75B5] hover:bg-[#6A65A5] text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        New Payroll
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {['Total Payroll', 'Employees Paid', 'Next Payday', 'Pending Approvals'].map((title, index) => (
                    <Card key={title} className="border-l-4 border-[#7A75B5]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-[#4B4B4D]">
                                {title}
                            </CardTitle>
                            {[DollarSign, Users, Calendar, CreditCard][index] && React.createElement([DollarSign, Users, Calendar, CreditCard][index], { className: "h-4 w-4 text-[#7A75B5]" })}
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="h-8 w-[100px]" />
                            ) : (
                                <>
                                    <div className="text-2xl font-bold text-[#4B4B4D]">
                                        {index === 0 && `$${data?.totalPayroll.toLocaleString()}`}
                                        {index === 1 && data?.employeesPaid.toLocaleString()}
                                        {index === 2 && data?.nextPayday}
                                        {index === 3 && data?.pendingApprovals}
                                    </div>
                                    <p className="text-xs text-[#7A75B5]">
                                        {index === 0 && "+5.2% from last month"}
                                        {index === 1 && "+3 from last month"}
                                        {index === 2 && "In 7 days"}
                                        {index === 3 && "5 urgent"}
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="text-[#4B4B4D]">Payroll Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {loading ? (
                            <Skeleton className="h-[350px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={data?.payrollData}>
                                    <XAxis
                                        dataKey="month"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Bar dataKey="total" fill="#7A75B5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="text-[#4B4B4D]">Recent Payroll Actions</CardTitle>
                        <CardDescription className="text-[#7A75B5]">
                            You have processed 5 payrolls this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                data?.recentActions.map((action, index) => (
                                    <div key={index} className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
                                            <AvatarFallback className="bg-[#7A75B5] text-white">{action.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none text-[#4B4B4D]">{action.name}</p>
                                            <p className="text-sm text-[#7A75B5]">
                                                {action.date}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-[#4B4B4D]">{action.amount}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#4B4B4D]">Employee Payroll Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-4">
                        <Input
                            placeholder="Search employees..."
                            className="max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Departments</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                        <Search className="h-4 w-4 text-[#7A75B5]" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-[#7A75B5]">Employee</TableHead>
                                <TableHead className="text-[#7A75B5]">Department</TableHead>
                                <TableHead className="text-[#7A75B5]">Salary</TableHead>
                                <TableHead className="text-[#7A75B5]">Last Paid</TableHead>
                                <TableHead className="text-[#7A75B5]">Status</TableHead>
                                <TableHead className="text-right text-[#7A75B5]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <TableRow key={i}>
                                        {Array(6).fill(0).map((_, j) => (
                                            <TableCell key={j}>
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <TableRow key={employee.name}>
                                        <TableCell className="font-medium">{employee.name}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.salary}</TableCell>
                                        <TableCell>{employee.lastPaid}</TableCell>
                                        <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          employee.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              employee.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                                    <DropdownMenuItem>Update salary</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>Payroll history</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}