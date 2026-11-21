"use client"
import type { Rating } from "../types";
import { RATINGS } from "../types";

type RatingButtonProps ={
    onRate:(rating:Rating) => void;
} ;
const ratingStyle:Record<Rating,string> ={
    "very easy":"bg-green-100 border-green-300",
    easy:"bg-lime-100 border-lime-300",
    medium:"bg-yellow-100 border-yellow-300",
    hard:"bg-orange-100 border-orange-300",
    "very hard":"bg-red-100 border-red-300",
};

export function RatingButton ({onRate}:RatingButtonProps){
    return(
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {RATINGS.map((rating,index) =>(
                <button key={rating} type="button" onClick={() => onRate(rating)} className={`rounded-lg border px-4 py-3 text-sm font-medium transition active:scale-95 
                    ${index === RATINGS.length-1 ? "col-span-2 sm:col-span-1" : ""} ${ratingStyle[rating]}`}>
                    {rating}
                </button>
            ))}
        </div>
    );
}