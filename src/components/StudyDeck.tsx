"use client";
import { useState } from "react";
import type { Card } from "@/types";

type StudyDeckProps = {
    cards: Card[];
};
export function StudyDeck({ cards }: StudyDeckProps) {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const current = cards[index];
    if (!current) {
        return <p className="p-4 text-center">ยังไม่มีคำศัพท์</p>;
    }
    const go = (step: number) => {
        setFlipped(false);
        setIndex((prev) => (prev + step + cards.length) % cards.length);
    };
    return (
        <div className="mx-auto max-w-md p-4">
            <button
                type="button"
                onClick={() => setFlipped((prev) => !prev)}
                className="w-full rounded-2xl bg-amber-100 p-10 text-center text-3xl font-bold shadow-md transition active:scale-95"
            >
                {flipped ? current.thai : current.english}
            </button>

            <p className="mt-2 text-center text-sm text-gray-500">
                {index + 1}/{cards.length} · แตะการ์ดเพื่อพลิก
            </p>

            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    className="flex-1 rounded-lg border bg-white py-2"
                >
                    ก่อนหน้า
                </button>

                <button
                    type="button"
                    onClick={() => go(1)}
                    className="flex-1 rounded-lg border bg-white py-2"
                >
                    ถัดไป
                </button>
            </div>
        </div>
    );
}