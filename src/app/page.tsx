import { StartButton } from "@/components/StartButton"

export default function Home(){
  return<main className="min-h-screen bg-linear-to-b from-amber-100 to-white text-gray-900">
    <div className="mx-auto max-w-md p-4 text-center">
      <h1 className="font-bold text-2xl m-4 text-center text-gray-900">Flash Card app</h1>
      <p className="mt-2 text-gray-500">เลือก</p>
        <StartButton/>
    </div>
  </main>
}
