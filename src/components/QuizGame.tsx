"use client";
import { questions } from "../data/questions";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { useQuizStore } from "../store/quizStore";
import { correctRatio } from "../lib/stats";

export function QuizGame(){
    const currentIndex = useQuizStore((s) => s.currentIndex);
    const records = useQuizStore((s) => s.records);
    const selectedId = useQuizStore((s) => s.selectedId);
    const submitRating = useQuizStore((s) => s.submitRating);
    const restart = useQuizStore((s) => s.restart);

    if(currentIndex >= questions.length) {
        const correctCount = records.filter((r) => r.isCorrect).length;
        const percent = Math.round(correctRatio(records) * 100);
        return(
            <div className="mx-auto max-w-md p-4">
                <h2 className="text-2xl font-bold">สรุปผล</h2>
                <p className="mt-2">
                    ถูก {correctCount} จาก {records.length} ข้อ ({percent}%)
                </p>
                <button type="button" className="w-full border rounded-lg p-4 text-left" onClick={restart}>เริ่มใหม่</button>
            </div>
        );
    }
    const currentQuestion = questions[currentIndex];
    return(
        <div className="mx-auto max-w-md p-4">
            <QuestionCard question={currentQuestion}/>
            {selectedId !== null && (
                <RatingButton onRate={(rating) => submitRating(rating,currentQuestion)}/>
            )}
            <p>ข้อที่ {currentIndex+1}/{questions.length}</p>
        </div>
    )
}