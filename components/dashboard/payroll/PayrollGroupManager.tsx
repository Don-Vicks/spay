"use client"

import React, { useState, useEffect } from "react"
import { PayrollGroupDialog } from "./PayrollGroupDialog"
import { PayrollGroupTable } from "./PayrollGroupDialog"
import { PayrollGroupFormData, PayrollGroup, Organization } from "@/lib/types/types"
import { useToast } from "@/hooks/use-toast"
import { getOrganization } from "@/actions/dashboard/payroll/payroll"
import { getPayrollGroupId } from "@/lib/api/payroll"

const PayrollGroupManager: React.FC<{ initialPayrollGroups?: PayrollGroup[] }> = ({
  initialPayrollGroups = [],
}) => {
  const [payrollGroups, setPayrollGroups] = useState<PayrollGroup[]>(initialPayrollGroups)
  const [newPayrollGroup, setNewPayrollGroup] = useState<PayrollGroupFormData>({
    name: "",
    wallet_address: "",
    organization: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await getOrganization()
        setOrganizations(orgs.map((org: any) => ({ id: org.id, name: org.name })))
      } catch (error) {
        console.error("Failed to fetch organizations", error)
      }
    }
    fetchOrganizations()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPayrollGroup((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPayrollGroup = async () => {
    try {
      const id = await getPayrollGroupId()
      const newGroup = { ...newPayrollGroup, id, status: true }
      setPayrollGroups((prev) => [...prev, newGroup])
      setNewPayrollGroup({ name: "", wallet_address: "", organization: "" })
      setIsDialogOpen(false)
      toast({ title: "Payroll Group added successfully." })
    } catch {
      toast({ title: "Failed to add payroll group.", variant: "destructive" })
    }
  }

  const handleDeletePayrollGroup = (id: number) => {
    setPayrollGroups((prev) => prev.filter((group) => group.id !== id))
    toast({ title: "Payroll Group deleted." })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payroll Groups</h2>
        <PayrollGroupDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          formData={newPayrollGroup}
          organizations={organizations}
          onInputChange={handleInputChange}
          onSubmit={handleAddPayrollGroup}
        />
      </div>
      <PayrollGroupTable payrollGroups={payrollGroups} onDelete={handleDeletePayrollGroup} />
    </div>
  )
}

export default PayrollGroupManager
