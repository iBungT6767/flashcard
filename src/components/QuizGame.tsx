"use client";
import { questions } from "@/data/questions";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { useHydrated } from "@/hook/useHydrated";

export function QuizGame(){
    const hydrated = useHydrated();
    const currentIndex = useQuizStore((s) => s.currentIndex);
    const selectedId = useQuizStore((s) => s.selectedId);
    const submitRating = useQuizStore((s) => s.submitRating);
    const router = useRouter();

    useEffect(() => {
        if(hydrated && currentIndex >= questions.length){
            router.push("/summary");
        }
    },[hydrated,currentIndex,router]);

    if (!hydrated || currentIndex >= questions.length) return null;

    const currentQuestion = questions[currentIndex];
    return(
        <div className="mx-auto max-w-md p-4">
            <ProgressBar current={currentIndex} total={questions.length} />
            <QuestionCard question={currentQuestion}/>
            {selectedId !== null && (
                <div className="mt-4"><RatingButton onRate={(rating) => submitRating(rating,currentQuestion)}/></div>
            )}
        </div>
    )
}