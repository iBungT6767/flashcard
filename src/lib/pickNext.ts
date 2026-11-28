export function pickNextId(
  ids: number[],
  averages: Record<number, number>,
  lastId: number | null
): number | undefined {
  const candidates = ids.filter((id) => id !== lastId);
  if (candidates.length === 0) return ids[0];

  const weights = candidates.map((id) => averages[id] ?? 3);
  const total = weights.reduce((sum, w) => sum + w, 0);

  let roll = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}