import { create } from "zustand";
import type { AnswerRecord,Question,Rating } from "@/types/index";
import { persist } from "zustand/middleware";

type QuizState = {
    questions:Question[];
    currentIndex: number;
    records:AnswerRecord[];
    selectedId:number|null;

    initializeQuestions:(questions:Question[]) => void;
    selectChoice:(id:number) => void;
    submitRating:(rating:Rating,question:Question) => void;
    restart:() => void;
};

export const useQuizStore = create<QuizState>()(
    persist(
        (set,get) => ({
    questions:[],
    currentIndex:0,
    records: [],
    selectedId:null,
    selectChoice:(id) => set({selectedId:id}),
    initializeQuestions:(questions) =>set({ questions }),
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

    restart:()=> set({questions:[], currentIndex:0,records:[],selectedId:null}),
}),
{
      name: "quiz-storage",
      partialize:(state) => ({
        questions: state.questions,
        records: state.records,
        currentIndex: state.currentIndex,
        selectedId: state.selectedId,
      }),
    }
  )
);