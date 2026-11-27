"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogout() {
        setLoading(true);
        setError(null);

        const { error } = await supabaseBrowser.auth.signOut();

        setLoading(false);

        if (error) {
            setError("ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง");
            return;
        }

        router.replace("/login");
        router.refresh();
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
            </button>

            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}