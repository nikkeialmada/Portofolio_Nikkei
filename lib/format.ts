const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2025-06-12" -> "2025" */
export function formatYear(date: string): string {
  return String(date).slice(0, 4);
}

/** "2025-06" -> "June 2025", "2025-06-12" -> "12 June 2025" */
export function formatDate(date: string): string {
  const parts = String(date).split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) return String(date);
  const monthName = MONTHS[month - 1];
  const day = Number(parts[2]);
  return day ? `${monthName} ${day}, ${year}` : `${monthName} ${year}`;
}
