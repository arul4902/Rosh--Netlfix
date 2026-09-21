/** Persist only known memory IDs and finite, normalized playback positions. */
export function readMemoryState(savedJson: string | null, progressJson: string | null, ids: readonly string[]) {
  const allowed = new Set(ids);
  const parse = (value: string | null): unknown => {
    try { return JSON.parse(value ?? 'null'); } catch { return null; }
  };
  const savedValue = parse(savedJson);
  const saved = Array.isArray(savedValue)
    ? [...new Set(savedValue.filter((id): id is string => typeof id === 'string' && allowed.has(id)))]
    : [];
  const progressValue = parse(progressJson);
  const progress: Record<string, number> = {};
  if (progressValue && typeof progressValue === 'object' && !Array.isArray(progressValue)) {
    for (const [id, value] of Object.entries(progressValue)) {
      if (allowed.has(id) && typeof value === 'number' && Number.isFinite(value)) {
        progress[id] = Math.max(0, Math.min(1, value));
      }
    }
  }
  return { saved, progress };
}

export function resumeSlide(progress: number | undefined, count: number) {
  if (!count || !progress || progress >= 1 || !Number.isFinite(progress)) return 0;
  return Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
}

export function adjacentMemory<T extends { id: string }>(items: readonly T[], id: string, direction: number) {
  if (!items.length) return undefined;
  const index = items.findIndex(item => item.id === id);
  if (index < 0) return items[0];
  return items[(index + direction + items.length) % items.length];
}
