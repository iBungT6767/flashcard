"use client";
import { useEffect, useState } from "react";
import type { Card } from "@/types";
import { StudyDeck } from "@/components/StudyDeck";
import Link from "next/link";

export default function StudyPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchCards() {
            try {
                const response = await fetch("/api/cards");

                if (!response.ok) {
                    throw new Error("ไม่สามารถดึงข้อมูลคำศัพท์ได้");
                }

                const data: Card[] = await response.json();
                setCards(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "เกิดข้อผิดพลาดในการโหลดคำศัพท์"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
    }, []);
    return (
        <main className="min-h-screen bg-linear-to-b from-sky-100 to-white text-gray-900">
            <h1 className="m-4 text-center text-2xl font-bold">
                Flash Card app
            </h1>
            <h1 className="mx-auto p-4 text-center"><Link
            href="/home"
            className="mt-8 text-center rounded-lg border bg-white px-6 py-3 transition hover:bg-gray-100 active:scale-95"
            >
            กลับหน้าแรก
            </Link></h1>
            {loading ? (
                <p className="p-4 text-center">กำลังโหลดคำศัพท์...</p>
            ) : error ? (
                <p className="p-4 text-center text-red-500">{error}</p>
            ) : (
                <StudyDeck cards={cards} />
            )}
        </main>
    );
}