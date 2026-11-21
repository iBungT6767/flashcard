import { create } from "zustand";
import type { AnswerRecord,Question,Rating } from "@/types/index";

type QuizState = {
    currentIndex: number;
    records:AnswerRecord[];
    selectedId:number|null;
    selectChoice:(id:number) => void;
    submitRating:(rating:Rating,question:Question) => void;
    restart:() => void;
};

export const useQuizStore = create<QuizState>()((set,get) => ({
    currentIndex:0,
    records: [],
    selectedId:null,
    selectChoice:(id) => set({selectedId:id}),
    submitRating:(rating,question) =>{
        const {selectedId} = get();
        if(selectedId === null) return;

        const newRecord:AnswerRecord ={
            cardId:question.id,
            selectedChoiceId:selectedId,
            isCorrect:selectedId===question.correctChoiceId,
            rating,
        };
        set((state) =>({
            records:[...state.records,newRecord],
            selectedId:null,
            currentIndex:state.currentIndex+1,
        }));
    },

    restart:()=> set({currentIndex:0,records:[],selectedId:null}),
}));