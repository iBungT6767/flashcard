"use client"
import type { Rating } from "../types";
import { RATINGS } from "../types";

type RatingButtonProps ={
    onRate:(rating:Rating) => void;
} ;

export function RatingButton ({onRate}:RatingButtonProps){
    return(
        <div className="flex flex-wrap gap-2">
            {RATINGS.map((rating) =>(
                <button key={rating} type="button" onClick={() => onRate(rating)} className="rounded-lg border px-4 py-2 enabled:hover:bg-gray-100">
                    {rating}
                </button>
            ))}
        </div>
    );
}