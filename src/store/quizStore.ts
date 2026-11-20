import { create } from "zustand";
import type { AnswerRecord } from "../types/index";

type QuizState = {
    currentIndex: number;
    records:AnswerRecord[];
    addRecord:(record:AnswerRecord) => void;
    restart:() => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
    currentIndex:0,
    records: [],
    addRecord: (record) => 
        set((state) =>({
            records:[...state.records,record],
            currentIndex:state.currentIndex+1,
        })),
    restart:()=> set({currentIndex:0,records:[]}),
}));