import { StartButton } from "@/components/StartButton"
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton";

export default function Home(){
  return<main className="min-h-screen bg-linear-to-b from-amber-100 to-white text-gray-900">
    <div className="mx-auto p-4 text-center ">
      <div className="flex justify-start"><LogoutButton /></div>
      <h1 className="font-bold text-2xl m-4 text-center text-gray-900">Flash Card app</h1>
      <p className="mt-2 text-gray-500">กรุณาเลือก</p>
        <StartButton/>  <Link
        href="/cards/new"
        className="mt-8 inline-block rounded-lg border bg-white px-6 py-3 transition hover:bg-gray-100 active:scale-95"
      >
        เพิ่มคำศัพท์
      </Link>
    </div>
      
  </main>
}

