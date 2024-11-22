import AddressesTable from "@/components/dashboard/address-table";
import {getAddresses} from "@/actions/dashboard/addressbook";
import {Suspense} from "react";
import AddressesTableSkeleton from "@/components/dashboard/address-table-skeleton";

interface addressType {
    id: string;
    name: string;
    email: string;
    wallet_address: string;
    department: string;
    network: string;
    user_id: string;
    created_at: string;
}
async function Addresses() {
    const values = await getAddresses();
    const addresses = values.map((value: addressType) => ({
        id: value.id,
        name: value.name,
        email: value.email,
        wallet_address: value.wallet_address,
        department: value.department,
        network: value.network
    }));
    return addresses;
}

export default async function AddressesPage() {
    const initialAddresses = await Addresses()
    return <AddressesTable initialAddresses={initialAddresses} />
}