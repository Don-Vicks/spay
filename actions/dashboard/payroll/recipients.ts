"use server"

import {createClient} from "@/utils/supabase/server";
import {newRecipient} from "@/lib/types/types";

export async function getAddresses() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const { data: address_books, error } = await supabase
        .from('address_books')
        .select('id, name')
        .eq('user_id', user?.id);
       //console.log(address_books);
       return address_books;
}

export async function getStablecoins(){
    const supabase = await createClient();

    const {data: stablecoins, error } = await supabase
        .from('stablecoins')
        .select('id, name, symbol')
        .eq('status', true)
    //console.log(stablecoins);
    return stablecoins;
}

export async function getRecipients(id: string){
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const {data: payroll_recipients, error } = await supabase
        .from('payroll_recipients')
        .select(`*, payroll_groups (id, name), address_books (id, name), stablecoins (id, name)`)
        .eq('user_id', user?.id)
        .eq('payroll_group_id', id)
   console.log(payroll_recipients, id, error);
    return payroll_recipients;
}

export async function addRecipient(groupId: string, payment: Omit<newRecipient, "id">){
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('payroll_recipients')
        .insert([
            {
                user_id: user?.id,
                payroll_group_id: groupId,
                stablecoin_id: payment.stablecoinId,
                address_id: payment.recipientId,
                amount: payment.amount,
                schedule: payment.schedule,
                status: payment.status,
            },
        ])
        .select()

    return data;
}

export async function deleteRecipient(groupId:string, recipientId: string){
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();


    const { error } = await supabase
        .from('payroll_recipients')
        .delete()
        .eq('payroll_group_id', groupId)
        .eq('id', recipientId)
        .eq('user_id', user?.id);

    return error;
}