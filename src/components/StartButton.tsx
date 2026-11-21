"use client"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/store/quizStore"

export function StartButton(){
    const router = useRouter();
    const restart = useQuizStore((s) => s.restart);

    const handleStart = () => {
        restart();
        router.push("/play");
    };

    return (
        <button type="button" onClick={handleStart} className="mt-8 inline-block rounded-lg border bg-white px-6 py-3 transition hover:bg-gray-100 active:scale-95">
            เริ่มเกม
        </button>
    )
}