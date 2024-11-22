export interface PayrollGroup {
    id: number
    name: string
    organization: string
    status: boolean
}

export interface Organization {
    id: number
    name: string
}

export interface PayrollGroupFormData {
    name: string
    wallet_address: string
    organization: string
}

interface Stablecoin {
    id: number
    name: string
    symbol: string
}

interface Recipient {
    id: string
    name: string
}

interface Recipients {
    id: string,
    name: string
    payroll_group_name: string
    stablecoin_name: string
    recipient_name: string
    status: boolean
}

interface newRecipient {
    id: number
    recipientId: number
    stablecoinId: number
    amount: number
    schedule: string
    status: boolean
}

interface RecipientsTable {
    id: string;
    user_id: string;
    payroll_groupId: string;
    addressId: string;
    stablecoinId: number;
    amount: number;
    status: boolean;
    lastPaymentDate: null | string; // Consider using Date type if needed
    paymentStatus: null | string; // Consider using a specific PaymentStatus enum
    schedule: 'hourly' | 'daily' | 'weekly' | 'monthly'; // Add more options as needed
    createdAt: string; // Consider using Date type if needed

    payrollGroups: {
        id: string;
        name: string;
    };

    addressBooks: {
        id: string;
        name: string;
    };

    stablecoins: {
        id: number;
        name: string;
    };
}