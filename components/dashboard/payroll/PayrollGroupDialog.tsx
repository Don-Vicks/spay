import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PayrollGroupForm } from "./PayrollGroupForm"
import { PayrollGroupFormData, Organization } from "@/lib/types/types"

interface PayrollGroupDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: PayrollGroupFormData
  organizations: Organization[]
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

export const PayrollGroupDialog: React.FC<PayrollGroupDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  organizations,
  onInputChange,
  onSubmit,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button className="bg-[#7A75B5] hover:bg-[#6A65A5] text-white">
        Add New Payroll Group
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Payroll Group</DialogTitle>
      </DialogHeader>
      <PayrollGroupForm
        formData={formData}
        organizations={organizations}
        onInputChange={onInputChange}
      />
      <DialogFooter>
        <Button type="submit" onClick={onSubmit}>
          Save Payroll Group
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
