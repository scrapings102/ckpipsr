/**
 * A staff member's total experience, worked out on the site so it grows by
 * itself: the years they brought with them, plus the full years completed
 * here since they joined. Ported from the CKPCMC site, which does the same.
 *
 * The joining date is read by its parts, never with `new Date("YYYY-MM-DD")`,
 * which parses as UTC midnight and lands on the previous day west of
 * Greenwich. `today` is a parameter so the count is testable and the caller
 * decides when "now" is.
 */

/** "YYYY-MM-DD" as numbers, or null when it is not a real calendar date. */
function dateParts(value: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  // Rejects 2021-02-30 and the like: a local date built from the parts must
  // read back as the same parts.
  const check = new Date(y, m - 1, d);
  if (check.getFullYear() !== y || check.getMonth() !== m - 1 || check.getDate() !== d) return null;
  return { y, m, d };
}

/**
 * Full years from `joinedOn` to `today`. A joining date on 29 February
 * completes its year on 1 March in a non-leap year. A date still to come
 * counts as none.
 */
export function fullYearsSince(joinedOn: string, today: Date): number | null {
  const joined = dateParts(joinedOn);
  if (!joined) return null;
  const month = today.getMonth() + 1;
  const day = today.getDate();
  let years = today.getFullYear() - joined.y;
  if (month < joined.m || (month === joined.m && day < joined.d)) years -= 1;
  return Math.max(0, years);
}

/**
 * Past experience plus full years since joining, or null when neither is
 * known (the page then shows no experience).
 * Only one of them set uses what is there.
 */
export function totalExperienceYears(
  pastExperienceYears: number | null | undefined,
  joinedOn: string | null | undefined,
  today: Date,
): number | null {
  const past =
    typeof pastExperienceYears === "number" && Number.isFinite(pastExperienceYears) && pastExperienceYears >= 0
      ? pastExperienceYears
      : null;
  const since = joinedOn ? fullYearsSince(joinedOn, today) : null;
  if (past === null && since === null) return null;
  return (past ?? 0) + (since ?? 0);
}

/** "1 year", "11 years". */
export function formatYears(years: number): string {
  return `${years} ${years === 1 ? "year" : "years"}`;
}

/** The experience line for a person, "28 years", or null when none is set. */
export function experienceText(
  pastExperienceYears: number | null | undefined,
  joinedOn: string | null | undefined,
  today: Date,
): string | null {
  const total = totalExperienceYears(pastExperienceYears, joinedOn, today);
  return total === null ? null : formatYears(total);
}
