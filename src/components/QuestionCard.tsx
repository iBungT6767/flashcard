"use client";
import type { Question } from "../types/index";
import  { Flashcard } from "./Flashcard";
import { ChoiceButton } from "./ChoiceButton";
import { useQuizStore } from "../store/quizStore";


type QuestionCardProps ={
    question:Question;
};

export function QuestionCard ({question}:QuestionCardProps){
    const selectedId =useQuizStore((s) => s.selectedId);
    const selectChoice =useQuizStore((s) => s.selectChoice);
    const hasAnswer = selectedId !== null;
    const isAnswerCorrect = selectedId === question.correctChoiceId;

    return (
        <div className="flex flex-col gap-2">
            <Flashcard card={question}/>
            {question.choices.map((choice) => (
                <ChoiceButton 
                    key ={choice.id} 
                    choice ={choice} 
                    onSelect ={selectChoice} 
                    isCorrect ={hasAnswer && choice.id === question.correctChoiceId}
                    isWrong ={selectedId === choice.id && !isAnswerCorrect}
                    disabled ={hasAnswer}
                />
            ))}
            {hasAnswer && (
                isAnswerCorrect
                    ? <p className="font-bold text-green-500">ถูกต้อง</p>
                    : <p className="font-bold text-red-500">ผิด</p>
            )}
        </div>
    );
}
