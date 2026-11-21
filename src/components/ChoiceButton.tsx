"use client";
import type { Choice } from "../types/index";

type ChoiceButtonProps ={
    choice:Choice;
    onSelect:(id:number) => void;
    isCorrect:boolean;
    isWrong:boolean;
    disabled:boolean;
};

export function ChoiceButton({choice,onSelect,isCorrect,isWrong,disabled}:ChoiceButtonProps){
    let buttonColor = "bg-white text-gray-900 enabled:hover:bg-gray-100 transition enabled:active:scale-95";
    if (isCorrect) {
        buttonColor = "bg-green-500 text-white";
    }
    else if (isWrong){
        buttonColor = "bg-red-500 text-white";
    }
    return(<button type="button" disabled={disabled} onClick={() => onSelect(choice.id)} className={`w-full border rounded-lg p-4 text-left disabled:cursor-not-allowed ${buttonColor}`}>
        {choice.text}
        
    </button>
    );
}