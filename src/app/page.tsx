import { QuizGame } from "../components/QuizGame"

export default function Home(){
  return<main className="min-h-screen bg-gray-50 text-gray-900">
    <h1 className="font-bold text-2xl m-4 text-center ">Flash Card app</h1>
    <QuizGame />
    
  </main>
}
