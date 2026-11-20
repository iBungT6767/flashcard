"use client";
import { questions } from "../data/questions";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { useQuizStore } from "../store/quizStore";
import { correctRatio } from "../lib/stats";
import { ProgressBar } from "./ProgressBar";

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
                    ถูก {correctCount} จาก {records.length} ข้อ
                </p>
                <ProgressBar current={correctCount} total={questions.length} />
                <button type="button" className="mt-4 border rounded-lg bg-white px-4 py-2 transition hover:bg-gray-100 active:scale-95" onClick={restart}>เริ่มใหม่</button>
            </div>
        );
    }
    const currentQuestion = questions[currentIndex];
    return(
        <div className="mx-auto max-w-md p-4">
            <QuestionCard question={currentQuestion}/>
            {selectedId !== null && (
                <div className="mt-4"><RatingButton onRate={(rating) => submitRating(rating,currentQuestion)}/></div>
            )}
            <p className="mt-4 text-center text-sm text-gray-500">ข้อที่ {currentIndex+1}/{questions.length}</p>
        </div>
    )
}