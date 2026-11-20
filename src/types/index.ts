export type Card = {
  id: number;
  english: string;
  thai: string;
  difficulty: number;
  example?: string;
};

export const RATINGS = ["very easy", "easy", "medium", "hard", "very hard"] as const;
export type Rating = (typeof RATINGS)[number];

export type Choice = {
  id: number;
  text: string;
};
export type Five<T> = [T, T, T, T, T];
export type Question = Card & {
  choices: Five<Choice>;
  correctChoiceId: number;
};
export type AnswerRecord = {
  cardId: number;
  selectedChoiceId: number;
  isCorrect: boolean;
  rating: Rating;
};
export type NewCard = Omit<Card, "id">;
export type CardUpdate = Partial<Omit<Card, "id">>;
export type Sum ={
  total:number;
  count:number;
};
export type GameState = |{
  status:"playing"; currentIndex:number
}
|{
  status:"finished"; score:number
};
