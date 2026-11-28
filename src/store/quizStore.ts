import { create } from "zustand";
import type { AnswerRecord,Question,Rating } from "@/types/index";
import { persist } from "zustand/middleware";

type QuizState = {
    questions:Question[];
    currentIndex: number;
    records:AnswerRecord[];
    selectedId:number|null;
    history: Pick<AnswerRecord, "cardId" | "rating">[];

    initializeQuestions:(questions:Question[]) => void;
    initializeRecords: (records: AnswerRecord[]) => void;
    selectChoice:(id:number) => void;
    submitRating:(rating:Rating,question:Question) => void;
    restart:() => void;
    initializeHistory: (
        history: Pick<AnswerRecord, "cardId" | "rating">[]
    ) => void;
    };

export const useQuizStore = create<QuizState>()(
    persist(
        (set,get) => ({
    history: [],
    questions:[],
    currentIndex:0,
    records: [],
    selectedId:null,
    selectChoice:(id) => set({selectedId:id}),
    initializeQuestions:(questions) =>set({ questions, currentIndex: 0,selectedId: null,records: [],}),
    initializeRecords: (records) => set({ records }),
    initializeHistory: (history) => set({ history }),
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
        currentIndex: state.currentIndex,
        selectedId: state.selectedId,
      }),
    }
  )
);