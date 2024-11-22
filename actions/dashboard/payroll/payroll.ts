'use server'

import {createClient} from "@/utils/supabase/server";

interface Organization {
    id: number;  // or more specifically: number | string
    name: number;  // or more specifically: string
}

export async function getOrganization(){
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const { data: organizations, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('user_id', user?.id)

    console.log(error, organizations)
    if(error){
        return error;
    } else {
        return organizations
    }
}

export async function getGroups() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const {data: payroll_groups, error} = await supabase
        .from('payroll_groups')
        .select(`*,
        organizations (name) `)
        .eq('user_id', user?.id)

    if (error) {
        return error;
    } else {
        return payroll_groups;
    }
}

export async function getGroup(id: string) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const {data: payroll_groups, error} = await supabase
        .from('payroll_groups')
        .select('name')
        .eq('user_id', user?.id)
        .eq('id', id)


    if (error) {
        return error;
    } else {
        return payroll_groups;
    }
}

export async function addGroup(name:string, organization: string) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();


    const { data, error } = await supabase
        .from('payroll_groups')
        .insert([
            {
                user_id: user?.id,
                organization_id: organization,
                name: name,
                status: true
            }
        ])
        .select()

    //console.log(data, organization, name);
    return data;
}

export async function updateGroup(id:string, name:string, organization: string, status: boolean) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('payroll_groups')
        .update({ name: name, organization_id: organization, status: status })
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()

    return data;
}
export async function deleteGroup(id: string) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const {error} = await supabase
        .from('payroll_groups')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)
    return error;
}