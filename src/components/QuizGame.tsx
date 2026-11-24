"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Card, Question, Rating } from "@/types";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { ProgressBar } from "./ProgressBar";
import { useQuizStore } from "@/store/quizStore";
import { useHydrated } from "@/hook/useHydrated";
import {createQuestions} from "@/lib/buildQuestions";

export function QuizGame() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentIndex = useQuizStore((s) => s.currentIndex);
    const selectedId = useQuizStore((s) => s.selectedId);
    const submitRating = useQuizStore((s) => s.submitRating);
    const router = useRouter();
    const hydrated = useHydrated();
    useEffect(() => {
        let cancelled = false;
        async function fetchCards() {
            try {
                const response = await fetch("/api/cards");
                if (!response.ok) {
                    throw new Error("ไม่สามารถดึงข้อมูลคำศัพท์ได้");
                }
                const data: Card[] = await response.json();
                const generatedQuestions = createQuestions(data);
                if(!cancelled){
                    setQuestions(generatedQuestions);
                }
            } catch (error) {
                if(!cancelled){
                     setError(
                    error instanceof Error
                        ? error.message
                        : "เกิดข้อผิดพลาด"
                );
                }
            } finally {
                if(!cancelled){
                    setLoading(false);
                }
            }
        }
        fetchCards();
        return () => {
            cancelled = true;
        };
    }, []);
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
    if (!hydrated || loading) {
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
                        onRate={(rating: Rating) =>
                            submitRating(rating, currentQuestion)
                        }
                    />
                </div>
            )}
        </div>
    );
}