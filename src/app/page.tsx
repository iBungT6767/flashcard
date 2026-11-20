import { QuestionCard } from "../components/QuestionCard"
import { question1 } from "../data/questions"
import { QuizGame } from "../components/QuizGame"
import { RatingButton } from "../components/RatingButtons"


export default function Home(){
  return<main>
    <h1 className="font-bold text-2xl m-4 text-center ">Flash Card app</h1>
    <div className="font-bold text-2xl m-4 text-center "><QuizGame /></div>
  </main>
}
