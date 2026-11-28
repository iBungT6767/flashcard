import type { Card, Choice, Five, Question,} from "@/types";
import { pickNextId } from "@/lib/pickNext";

export function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function createQuestions(cards: Card[],averageByCard: Record<number,number> = {}): Question[] {
    if (cards.length < 5) {
        return [];
    }
    const orderedCard = [...cards].sort(
        (a,b) => (averageByCard[b.id] ?? 0) - (averageByCard[a.id] ?? 0)
    );
    return orderedCard.map((card) => {
        const wrongCards = cards.filter(
            (item) => item.id !== card.id
        );
        const selectedWrong = shuffle(wrongCards).slice(0, 4);
        const options = shuffle([
            card,
            ...selectedWrong,
        ]);
        const choices: Five<Choice> = options.map(
            (item) => ({
                id: item.id,
                text: item.thai,
            })
        ) as Five<Choice>;
        const correctChoiceId = card.id;
        return {
            ...card,
            choices,
            correctChoiceId,
        };
    });
}
export function buildOrder(
    ids: number[],
    averages: Record<number, number>,
    length: number
): number[] {
    const order: number[] = [];
    const remaining = [...ids];
    let lastId: number | null = null;

    while (order.length < length) {
    const next = pickNextId(remaining, averages, lastId);
    if (next === undefined) break;
    order.push(next);
    const selectedIndex = remaining.indexOf(next);
    remaining.splice(selectedIndex, 1);
    lastId = next;
    }
    return order;
}