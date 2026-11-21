import { QuizGame } from "@/components/QuizGame";

export default function PlayPage() {
    return(
        <main className="min-h-screen bg-linear-to-b from-sky-100 to-white text-gray-900">
            <h1 className="m-4 text-center text-2xl font-bold">Flash Card app</h1>
            <QuizGame/>
        </main>
    );
}