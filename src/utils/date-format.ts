import { format } from "date-fns";

export enum DateFormat {
  DEFAULT = "dd-MM-yyyy", // 01-07-2026
  DATE_SLASH = "dd/MM/yyyy", // 01/07/2026
  DATE_TIME = "dd-MM-yyyy hh:mm a", // 01-07-2026 10:30 AM
  DATE_TIME_24 = "dd-MM-yyyy HH:mm", // 01-07-2026 22:30
  TIME_12 = "hh:mm a", // 10:30 AM
  TIME_24 = "HH:mm", // 22:30
  MONTH_YEAR = "MMM yyyy", // Jul 2026
  FULL_DATE = "dd MMM yyyy", // 01 Jul 2026
  FULL_DATE_TIME = "dd MMM yyyy, hh:mm a", // 01 Jul 2026, 10:30 AM
  DAY_DATE = "EEEE, dd MMM yyyy", // Wednesday, 01 Jul 2026
  ISO_DATE = "yyyy-MM-dd", // 2026-07-01
  YEAR = "yyyy", // 2026
}

export const formatDate = (
  date?: string | Date | null,
  formatType: DateFormat = DateFormat.DEFAULT
): string => {
  if (!date) return "";

  try {
    return format(new Date(date), formatType);
  } catch {
    return "";
  }
};

export const getDateDifferenceInDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff =
      Math.floor(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    return diff > 0 ? diff : 0;
};