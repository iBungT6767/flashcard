import type { Card, Choice, Five, Question,} from "@/types";

export function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function createQuestions(cards: Card[]): Question[] {
    if (cards.length < 5) {
        return [];
    }
    return cards.map((card) => {
        const wrongCards = cards.filter(
            (item) => item.id !== card.id
        );
        const selectedWrong = shuffle(wrongCards).slice(0, 4);
        const options = shuffle([
            card,
            ...selectedWrong,
        ]);
        const choices: Five<Choice> = options.map(
            (item, index) => ({
                id: index + 1,
                text: item.thai,
            })
        ) as Five<Choice>;
        const correctChoiceId =
            options.findIndex((item) => item.id === card.id) + 1;
        return {
            ...card,
            choices,
            correctChoiceId,
        };
    });
}