"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export function useRequireLogin() {
    const router = useRouter();
    const [checked,setChecked] = useState(false);

    useEffect(() =>{
        let cancelled = false;
        supabaseBrowser.auth.getSession().then(({data}) =>{
            if(cancelled) return;
            if(!data.session) router.replace("/login");
            else setChecked(true);
        });
        return() => {cancelled = true;}; 
    },[router])
    return checked;
}