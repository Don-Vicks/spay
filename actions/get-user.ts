'use server'

import {createClient} from "@/utils/supabase/server";
import {redirect, router} from 'next/navigation'

export const getUser = async () => {
    const supabase = await createClient();
    const {data: { user }} = await supabase.auth.getUser();
    if(user){
        return user;
    } else {
        return null;
    }
};

export const signOut = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.getUser.signOut();
    if(error){
        console.log(error)
        return error;
    } else {
        return null;
        redirect('/');
    }
};