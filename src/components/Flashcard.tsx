import type { Card } from "@/types/index";


type FlashcardProps ={
    card:Card;
};
export function Flashcard ({card}:FlashcardProps){
    return <div>
        <div className="rounded-2xl bg-amber-100 p-6 text-center shadow-md sm:p-10">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl">{card.english}</h2>
        </div>
        {card.example&&(
            <p className="mt-4">Example: {card.example}</p>
        )}
    </div>
}