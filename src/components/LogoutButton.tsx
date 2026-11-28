"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useQuizStore } from "@/store/quizStore";

export function LogoutButton() {
  const router = useRouter();
  const restart = useQuizStore((s) => s.restart);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    restart();
    router.replace("/login");
  };

  return (
    <button type="button" onClick={handleLogout} className="rounded-lg border bg-red-500 text-white transition active:scale-95 px-4 py-2">
      ออกจากระบบ
    </button>
  );
}