import type { AnswerRecord } from "../types/index";
import { ratingScore } from "../types/index";

export function correctRatio (records:AnswerRecord[]): number{
    if(records.length === 0){
        return 0;
    }
    const correctCount = records.filter((r) => r.isCorrect).length;
    return correctCount / records.length;
}
export function averageRatingByCard(
    records:AnswerRecord[]
): Record<number,number>{
    const totals:Record<number,number> = {};
    const counts:Record<number,number> = {}; 
    for (const record of records) {
        const cardId = record.cardId;
        const score = ratingScore[record.rating];
        totals[cardId] = (totals[cardId] ?? 0) + score;
        counts[cardId] = (counts[cardId] ?? 0) + 1;
    }
    const averages: Record<number, number> = {};
    for (const cardId in totals) {
        averages[Number(cardId)] =
            totals[Number(cardId)] / counts[Number(cardId)];
    }
    return averages;
}