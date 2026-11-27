import { describe, it, expect } from "vitest";
import { averageRatingByCard } from "./stats";
import type { AnswerRecord } from "../types";

describe("averageRatingByCard", () => {
    it("คำนวณค่าเฉลี่ยแยกตาม cardId", () => {
        const records: AnswerRecord[] = [
            {
                cardId: 10,
                selectedChoiceId: 1,
                isCorrect: true,
                rating: "hard",
            },
            {
                cardId: 10,
                selectedChoiceId: 2,
                isCorrect: false,
                rating: "easy",
            },
            {
                cardId: 20,
                selectedChoiceId: 3,
                isCorrect: true,
                rating: "very hard",
            },
        ];

        expect(averageRatingByCard(records)).toEqual({
            10: 3,
            20: 5,
        });
    });

    it("คืน object ว่างเมื่อไม่มีประวัติ", () => {
        expect(averageRatingByCard([])).toEqual({});
    });
});