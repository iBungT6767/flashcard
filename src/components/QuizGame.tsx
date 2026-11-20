"use client";
import { useState } from "react";
import type { AnswerRecord ,Rating } from "../types";
import { questions } from "../data/questions";
import { QuestionCard } from "./QuestionCard";
import { RatingButton } from "./RatingButtons";
import { correctRatio } from "../lib/stats";

export function QuizGame(){
    const [currentIndex,setCurrentIndex] = useState(0);

    const [records,setRecords] = useState<AnswerRecord[]>([]);

    const [selectedId,setSelectedId] = useState<number | null>(null);

    const handleRestart = () =>{
        setCurrentIndex(0);
        setRecords([]);
        setSelectedId(null);
    };
    if(currentIndex >= questions.length) {
        const correctCount = records.filter((r) => r.isCorrect).length;
        const percent = Math.round(correctRatio(records)*100);

        return(
            <div className="mx-auto max-w-md p-4">
                <h2 className="text-2xl font-bold">สรุปผล</h2>
                <p className="mt-2">
                    ถูก{correctCount}จาก{records.length} ข้อ({percent}%)
                </p>
                <button type="button" onClick={handleRestart} className="mt-4 rounded-lg border px-4 py-2 hover:bg-gray-100">
                    เล่นอีกครั้ง
                </button>
            </div>
        );
    }
    
    const currentQuestion =questions[currentIndex];
    
    const handleRate =(rating:Rating) =>{
        if (selectedId === null)return;

        const newRecord:AnswerRecord ={
            cardId:currentQuestion.id,
            selectedChoiceId:selectedId,
            isCorrect:selectedId === currentQuestion.correctChoiceId,
            rating:rating
        };

        setRecords((prev) =>[...prev,newRecord]);
        setSelectedId(null);
        setCurrentIndex((prev) => prev+1);
    };

    return(
        <div className="mx-auto max-w-md p-4">
            <QuestionCard question={currentQuestion} selectedId={selectedId} onSelect={setSelectedId}/>
            {selectedId !== null && (
                <div className="mt-4">
                    <RatingButton onRate={handleRate}/>
                </div>
            )}
            <p className="mt-4">ข้อที่ {currentIndex+1}/{questions.length}</p>
        </div>
    )
    
}