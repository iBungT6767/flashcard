import { SummaryView } from "@/components/SummaryView";

export default function SummaryPage(){
    return (
        <main className="min-h-screen bg-linear-to-b from-amber-100 to-white text-gray-900">
            <h1 className="m-4 text-center text-2xl font-bold">Flash Card app</h1>
            <SummaryView/>
        </main>
    );
}