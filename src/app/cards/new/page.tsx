import Link from "next/link";
import { AddCardForm } from "@/components/AddCardForm";

export default function NewCardPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-100 to-white text-gray-900">
    <div className="mx-auto max-w-md p-4 text-center">
        <h1 className="m-4 text-center text-2xl font-bold text-gray-900">
            เพิ่มคำศัพท์ใหม่
        </h1>
        <AddCardForm />
        <Link
        href="/home"
        className="mt-4 block text-center text-blue-600"
        >
        กลับหน้าแรก
        </Link>
    </div>
    </main>
  );
}