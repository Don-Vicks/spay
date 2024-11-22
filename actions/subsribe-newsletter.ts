'use server'

import {createClient} from "@/utils/supabase/server";

export async function joinNewsletter(email: string){
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('newsletter_users')
        .insert([
            {
                email: email,
            },
        ])
        .select()
    if(error) throw error;
    return data

}