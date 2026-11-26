"use client";
import Link from "next/link";
import { useState,type SubmitEvent } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function SingupPage(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[message,setMessage] = useState<string | null>(null);
    const[error,setError] = useState<string | null>(null);
    const[loading,setLoading] = useState(false);

    async function handleSignup(event:SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setMessage(null);
        setError(null);

        const {data,error} = await supabaseBrowser.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if(error){
            setError(error.message);
            return;
        }

        if(data.session){
            setMessage("สมัครสมาชิกสำเร็จ สามารถเข้าสู่ระบบได้แล้ว");
        }else{
            setMessage("สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี");
        }
    }
    return(
        <main className="min-h-screen bg-linear-to-b from-amber-100 to-white px-4 py-12 text-gray-900">
            <form onSubmit={handleSignup} className="mx-auto max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm">
                <h1 className="text-center text-2xl font-bold">
                    สมัครสมาชิก
                </h1>
                <div>
                    <label htmlFor="email" className="mb-1 block">
                        Email
                    </label>
                    <input id="email" type="email" autoCapitalize="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border px-3 py-2"/>
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block">
                        Password
                    </label>
                    <input id="password" type="password" autoCapitalize="new-password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border px-3 py-2"/>
                    <p className="mt-1 text-sm text-gray-500">
                        รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
                    </p>
                </div>
                {error &&(
                    <p role="alert" className="text-sm text-red-600">{error}</p>
                )}
                {message &&(
                    <p role="status" className="text-sm text-green-700">{message}</p>
                )}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
                </button>
                <p className="text-center text-sm">มีบัญชีแล้ว{""}
                    <Link href="/login" className="text-blue-600 hover:underline">
                    เข้าสู้ระบบ
                    </Link>
                </p>
            </form>
        </main>
    );
}