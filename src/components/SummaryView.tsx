"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/store/quizStore"
import { questions } from "@/data/questions"
import { ProgressBar } from "./ProgressBar"
import { useHydrated } from "@/hook/useHydrated"
import { useEffect } from "react"

export function SummaryView() {
    const hydrated = useHydrated();
    const router = useRouter();
    const records = useQuizStore((s) => s.records);
    const restart = useQuizStore((s) => s.restart);

    useEffect(() => {
        if(hydrated && records.length === 0){
            router.replace("/");
        }
    },[hydrated,records,router])

    if(!hydrated || records.length === 0)return null;

    const correctCount = records.filter((r) => r.isCorrect).length;
    const handleAgain = () => {
        restart();
        router.push("/play");
    };
    return(
        <div className="mx-auto max-w-md p-4">
            <h2 className="text-2xl font-bold">สรุป</h2>
            <p>
                ถูก {correctCount} จาก {questions.length} ข้อ
            </p>
            <ProgressBar current={correctCount} total={questions.length}/>
            <div className="mt-6 flex gap-2">
                <button type="button" onClick={handleAgain} className="rounded-lg border bg-white px-4 py-2 transition hover:bg-gray-100 active:scale-95">
                    เล่นอีกครั้ง
                </button>
                <Link href="/" className="rounded-lg border bg-white px-4 py-2 transition hover:bg-gray-100 active:scale-95">
                    กลับหน้าแรก
                </Link>
            </div>
        </div>
    );
}