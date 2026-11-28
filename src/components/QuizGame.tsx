"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Card, Rating,AnswerRecord } from "@/types";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { ProgressBar } from "./ProgressBar";
import { useQuizStore } from "@/store/quizStore";
import { useHydrated } from "@/hook/useHydrated";
import {createQuestions} from "@/lib/buildQuestions";
import { averageRatingByCard } from "@/lib/stats";
import { useRequireLogin } from "@/hook/useRequireLogin";
import { loadRecords,saveRecord } from "@/lib/recordsApi";

export function QuizGame() {
    const initializeRecords = useQuizStore((s) => s.initializeRecords);
    const initializeHistory = useQuizStore((s) => s.initializeHistory);
    const questions = useQuizStore((s) => s.questions);
    const initializeQuestions = useQuizStore(
        (s) => s.initializeQuestions
    );
    const ready = useRequireLogin();
    const hydrated = useHydrated();
    const [loading, setLoading] = useState(true);
    const isLoading = !hydrated || (loading && questions.length === 0);
    const [error, setError] = useState<string | null>(null);
    const currentIndex = useQuizStore((s) => s.currentIndex);
    const selectedId = useQuizStore((s) => s.selectedId);
    const submitRating = useQuizStore((s) => s.submitRating);
    const router = useRouter();

    async function handleRate(rating:Rating) {
    if(selectedId === null) return;

    const record : AnswerRecord = {
        cardId:currentQuestion.id,
        selectedChoiceId:selectedId,
        isCorrect: selectedId === currentQuestion.correctChoiceId,
        rating,
    };
    const saved = await saveRecord(record);
    if(!saved){
        setError("บันทึกประวัติไม่สำเร็จ กรุณาลองอีกครั้ง");
        return;
    }
    submitRating(rating, currentQuestion);
}

    useEffect(() => {
        if (!hydrated || !ready || questions.length) return;
    let cancelled = false;
    async function fetchCards() {
    try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
            throw new Error("ไม่สามารถดึงข้อมูลคำศัพท์ได้");
        }
        const data: Card[] = await response.json();
        const loadedHistory = await loadRecords();

        if(cancelled) return;

        initializeRecords(loadedHistory);

        const averageByCard = averageRatingByCard(loadedHistory);
        const generatedQuestions = createQuestions(data,averageByCard).slice(0,10);

        initializeQuestions(generatedQuestions);
    } catch (err) {
        if (!cancelled) {
            setError(
            err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาด"
            );
        }
    } finally {
        if (!cancelled) setLoading(false);
    }
    }
    
    fetchCards();
    return () => {
        cancelled = true;
    };
},  [hydrated, questions.length, initializeQuestions,ready,initializeHistory]);
    useEffect(() => {
        if (
            hydrated &&
            !loading &&
            questions.length > 0 &&
            currentIndex >= questions.length
        ) {
            router.push("/summary");
        }
    }, [hydrated, loading, questions.length, currentIndex, router]);
    if (isLoading) {
        return <p className="p-4 text-center">กำลังโหลดคำศัพท์...</p>;
    }
    if (error) {
        return <p className="p-4 text-center text-red-500">{error}</p>;
    }
    if (questions.length === 0) {
        return <p className="p-4 text-center">ต้องมีคำศัพท์อย่างน้อย 5 คำเพื่อเริ่มเล่น</p>;
    }
    if (currentIndex >= questions.length) {
        return null;
    }
    if (!ready){
        return null;
    }
    const currentQuestion = questions[currentIndex];
    return (
        <div className="mx-auto max-w-md p-4">
            <ProgressBar
                current={currentIndex}
                total={questions.length}
            />
            <QuestionCard question={currentQuestion} />
            {selectedId !== null && (
                <div className="mt-4">
                    <RatingButton
                        onRate={handleRate}
                    />
                </div>
            )}
        </div>
    );
}