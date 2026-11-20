import type { AnswerRecord } from "../types/index";

export function correctRatio (records:AnswerRecord[]): number{
    if(records.length === 0){
        return 0;
    }
    const correctCount = records.filter((r) => r.isCorrect).length;
    return correctCount / records.length;
}