
import type { Card } from "../types/index";


type FlashcardProps ={
    card:Card;
};
export function Flashcard ({card}:FlashcardProps){
    return <div>
        <div>
            <h2 className="border rounded-lg p-8 text-4xl bg-blue-400 text-gray-900 cursor-pointer">{card.english}</h2>
        </div>
        {card.example&&(
            <p className="mt-4">Example: {card.example}</p>
        )}
    </div>
}