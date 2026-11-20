"use client";
import type { Question } from "../types/index";
import  { Flashcard } from "./Flashcard";
import { ChoiceButton } from "./ChoiceButton";


type QuestionCardProps ={
    question:Question;
    selectedId:number | null;
    onSelect:(id:number) => void;
};

export function QuestionCard ({question,selectedId,onSelect}:QuestionCardProps){
    const hasAnswer = selectedId !== null;
    const isAnswerCorrect = selectedId === question.correctChoiceId;
    return(
    <div className="flex flex-col gap-2">
        <Flashcard card={question}/>
        <h2>กรุณาเลือกคำตอบ</h2>
        {question.choices.map((choice) => {
            const isSelected = selectedId === choice.id;
            const isCorrect = hasAnswer && choice.id === question.correctChoiceId;
            const isWrong = isSelected && !isCorrect;
            return(
            <ChoiceButton 
                key={choice.id} 
                choice={choice} 
                onSelect={onSelect}
                isCorrect={isCorrect}
                isWrong={isWrong}
                disabled={hasAnswer}
                />
            );
            
        })}
        {selectedId !== null && (
            isAnswerCorrect
            ?<p className="text-green-500 font-bold">ถูกต้อง</p>
            :<p className="text-red-500 font-bold">ผิด</p>
        )}
    </div>
    );
}
