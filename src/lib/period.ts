const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

/** Decimal year, so "July 2020" becomes 2020.5 and bars land mid-year. */
function toDecimalYear(text: string, fallbackMonth: number): number | null {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  if (!yearMatch) return null;
  const year = Number(yearMatch[0]);
  const monthKey = text.trim().slice(0, 3).toLowerCase();
  const month = monthKey in MONTHS ? MONTHS[monthKey] : fallbackMonth;
  return year + month / 12;
}

export interface Span { start: number; end: number; ongoing: boolean }

/**
 * Parses the period strings used across the CV — "May 2025 – Present",
 * "March 2017 – 2019", "2010 – 2016", "2026" — into a numeric span the
 * schedule can lay out. Returns null when a string cannot be read, so callers
 * drop that row rather than render a bar in the wrong place.
 */
export function parsePeriod(period: string, now = 2026.6): Span | null {
  const parts = period.split(/[–—-]/).map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;

  const start = toDecimalYear(parts[0], 0);
  if (start === null) return null;

  if (parts.length === 1) {
    // A single year, e.g. an award: give it a short readable bar.
    return { start, end: start + 0.85, ongoing: false };
  }

  const tail = parts[1];
  if (/present|current|now/i.test(tail)) {
    return { start, end: now, ongoing: true };
  }

  // An end month means the role ran through that month, so push to its end.
  const end = toDecimalYear(tail, 11);
  if (end === null) return { start, end: start + 0.85, ongoing: false };
  return { start, end: Math.max(end + 1 / 12, start + 0.2), ongoing: false };
}
