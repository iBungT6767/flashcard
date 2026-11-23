"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Card, Choice, Five, Question, Rating } from "@/types";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { ProgressBar } from "./ProgressBar";
import { useQuizStore } from "@/store/quizStore";
import { useHydrated } from "@/hook/useHydrated";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function createQuestions(cards: Card[]): Question[] {
    if (cards.length < 5) {
        throw new Error("ต้องมีคำศัพท์อย่างน้อย 5 คำเพื่อสร้างตัวเลือก");
    }
    return cards.map((card) => {
        const wrongCards = cards.filter(
            (item) => item.id !== card.id
        );
        const selectedWrong = shuffle(wrongCards).slice(0, 4);
        const options = shuffle([
            card,
            ...selectedWrong,
        ]);
        const choices: Five<Choice> = options.map(
            (item, index) => ({
                id: index + 1,
                text: item.thai,
            })
        ) as Five<Choice>;
        const correctChoiceId =
            options.findIndex((item) => item.id === card.id) + 1;
        return {
            ...card,
            choices,
            correctChoiceId,
        };
    });
}
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
        async function fetchCards() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("/api/cards");
                if (!response.ok) {
                    throw new Error("ไม่สามารถดึงข้อมูลคำศัพท์ได้");
                }
                const data: Card[] = await response.json();
                const generatedQuestions = createQuestions(data);
                setQuestions(generatedQuestions);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "เกิดข้อผิดพลาด"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
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
        return <p className="p-4 text-center">ยังไม่มีคำศัพท์ในระบบ</p>;
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