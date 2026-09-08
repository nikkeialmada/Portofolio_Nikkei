const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** "2025-06-12" -> "2025" */
export function formatYear(date: string): string {
  return String(date).slice(0, 4);
}

/** "2025-06" -> "Juni 2025", "2025-06-12" -> "12 Juni 2025" */
export function formatDate(date: string): string {
  const parts = String(date).split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) return String(date);
  const monthName = MONTHS_ID[month - 1];
  const day = Number(parts[2]);
  return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}
