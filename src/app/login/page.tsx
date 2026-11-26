"use client";
import { SubmitEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState<string | null>(null);
    const[loading,setLoading] = useState(false);

    async function handleLogin(event:SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setError(null);

       const {error} = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
       });
       setLoading(false);
       if(error){
        setEmail("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
       }
       router.replace("/home");
       router.refresh();
    }
    return (
        <main className="min-h-screen bg-linear-to-b from-amber-100 to-white px-4 py-12 text-gray-900">
            <form onSubmit={handleLogin}className="mx-auto max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm">
                <h1 className="text-center text-2xl font-bold">เข้าสู่ระบบ</h1>
                <div>
                    <label htmlFor="email" className="mb-1 block">
                        Email
                    </label>
                    <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border px-3 py-2"/>
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block">Password</label>
                    <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border px-3 py-2"/>
                </div>
                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </button>
                <p className="text-center text-sm">
                    ยังไม่มีบัญชี{""}
                    <Link href="/signup" className="text-blue-600 hover:underline">สมัครสมาชิก</Link>
                </p>
            </form>
        </main>
    );
}