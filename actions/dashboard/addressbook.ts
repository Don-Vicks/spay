'use server'

import {createClient} from "@/utils/supabase/server";

export async function getAddresses(){
    const supabase = await createClient();
    const { data: address_books, error } = await supabase
        .from('address_books')
        .select('*')

    if(error){
        return error;
    } else {
        return address_books;
    }
}

interface addAddress {
    name: string;
    wallet_address: string;
    department: string;
    email: string;
    network: string;
}
export async function addAddressBook(newAddress: addAddress){
    const supabase = await createClient();
    const {data: { user }} = await supabase.auth.getUser();

    const {name, wallet_address, department, email, network} = newAddress;

    const { data, error } = await supabase
        .from('address_books')
        .insert([
            {
                user_id: user?.id,
                name: name,
                wallet_address: wallet_address,
                department: department,
                email: email,
                network: network,
            },
        ])
        .select()
    if(error) throw error;
    return data

}

export async function deleteAddress(id: string){
    const supabase = await createClient();
    const { error } = await supabase
        .from('address_books')
        .delete()
        .eq('id', id)
    if(error) throw error;
    return error;
}
