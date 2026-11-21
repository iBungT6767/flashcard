import { QuizGame } from "../components/QuizGame"

export default function Home(){
  return<main className="min-h-screen bg-linear-to-b from-sky-100 to-white text-gray-900">
    <h1 className="font-bold text-2xl m-4 text-center text-gray-900">Flash Card app</h1>
    <QuizGame />
    
  </main>
}
