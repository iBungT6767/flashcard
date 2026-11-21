import type { Question } from "../types/index";

export const question1: Question = {
  id: 1,
  english: "Egg",
  thai: "ไข่",
  difficulty: 1,
  example: "I buy an egg at the market",
  choices: [
    { id: 1, text: "ไข่" },
    { id: 2, text: "หนังสือ" },
    { id: 3, text: "แมว" },
    { id: 4, text: "ราคาถูก" },
    { id: 5, text: "ปืน" },
  ],
  correctChoiceId: 1
};
export const question2: Question ={
  id:2,
  english:"Book",
  thai:"หนังสือ",
  difficulty:2,
  example:"I have a book",
  choices:[
    { id: 1, text: "ไข่" },
    { id: 2, text: "หนังสือ" },
    { id: 3, text: "แมว" },
    { id: 4, text: "ราคาถูก" },
    { id: 5, text: "ปืน" },
  ],
  correctChoiceId:2
};
export const question3: Question ={
  id:3,
  english:"Cat",
  thai:"แมว",
  difficulty:1,
  choices:[
    { id: 1, text: "ไข่" },
    { id: 2, text: "หนังสือ" },
    { id: 3, text: "แมว" },
    { id: 4, text: "ราคาถูก" },
    { id: 5, text: "ปืน" },
  ],
  correctChoiceId:3
};
export const question4: Question ={
  id:4,
  english:"remember",
  thai:"จำได้",
  difficulty:3,
  choices:[
    { id: 1, text: "ไข่" },
    { id: 2, text: "ใบ้" },
    { id: 3, text: "ไม่รู้" },
    { id: 4, text: "ราคาถูก" },
    { id: 5, text: "จำได้" },
  ],
  correctChoiceId:5
};
export const question5: Question ={
  id:5,
  english:"anxious",
  thai:"กังวล",
  difficulty:5,
  choices:[
    { id: 1, text: "ไข่" },
    { id: 2, text: "ใบ้" },
    { id: 3, text: "ป่วย" },
    { id: 4, text: "กังวล" },
    { id: 5, text: "จำได้" },
  ],
  correctChoiceId:4
};
export const questions:Question[]=[
  question1,
  question2,
  question3,
  question4,
  question5
];
