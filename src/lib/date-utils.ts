import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
  isYesterday,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

export const DATE_FORMAT = "dd-MM-yyyy";
export const SQL_DATE_FORMAT = "yyyy-MM-dd";

/**
 * Get the first date of the current month
 */
export const getFirstDateOfMonth = (date: Date = new Date()): Date => {
  return startOfMonth(date);
};

/**
 * Get the last date of the current month
 */
export const getLastDateOfMonth = (date: Date = new Date()): Date => {
  return endOfMonth(date);
};

/**
 * Get today's date formatted as YYYY-MM-DD
 */
export const getToday = (): Date => {
  return new Date();
};

/**
 * Get yesterday's date
 */
export const getYesterday = (): Date => {
  return subDays(new Date(), 1);
};

/**
 * Get tomorrow's date
 */
export const getTomorrow = (): Date => {
  return addDays(new Date(), 1);
};

/**
 * Get the first day of the current week (Monday)
 */
export const getStartOfWeek = (date: Date = new Date()): Date => {
  return startOfWeek(date, { weekStartsOn: 1 });
};

/**
 * Get the last day of the current week (Sunday)
 */
export const getEndOfWeek = (date: Date = new Date()): Date => {
  return endOfWeek(date, { weekStartsOn: 1 });
};

/**
 * Add days to a given date
 */
export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};

export const addDaysToToday = (days: number): Date => {
  return addDays(new Date(), days);
};

/**
 * Subtract days from a given date
 */
export const subtractDaysFromDate = (date: Date, days: number): Date => {
  return subDays(date, days);
};

export const subtractDaysFromToday = (days: number): Date => {
  return subDays(new Date(), days);
};

/**
 * Add months to a given date
 */
export const addMonthsToDate = (date: Date, months: number): Date => {
  return addMonths(date, months);
};

export const addMonthsToToday = (months: number): Date => {
  return addMonths(new Date(), months);
};

/**
 * Subtract months from a given date
 */
export const subtractMonthsFromDate = (date: Date, months: number): Date => {
  return subMonths(date, months);
};

export const subtractMonthsFromToday = (months: number): Date => {
  return subMonths(new Date(), months);
};

/**
 * Add years to today's date
 */
export const addYearsToToday = (years: number): Date => {
  return addYears(new Date(), years);
};

/**
 * Subtract years from today's date
 */
export const subtractYearsFromToday = (years: number): Date => {
  return subYears(new Date(), years);
};

/**
 * Add weeks to today's date
 */
export const addWeeksToToday = (weeks: number): Date => {
  return addWeeks(new Date(), weeks);
};

/**
 * Subtract weeks from today's date
 */
export const subtractWeeksFromToday = (weeks: number): Date => {
  return subWeeks(new Date(), weeks);
};

/**
 * Get difference between two dates in days
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  return differenceInDays(date1, date2);
};

/**
 * Check if a date is today
 */
export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};

/**
 * Check if a date is tomorrow
 */
export const isDateTomorrow = (date: Date): boolean => {
  return isTomorrow(date);
};

/**
 * Check if a date is yesterday
 */
export const isDateYesterday = (date: Date): boolean => {
  return isYesterday(date);
};

/**
 * Check if a date is before today
 */
export const isDateBeforeToday = (date: Date): boolean => {
  return isBefore(date, new Date());
};

/**
 * Check if a date is after today
 */
export const isDateAfterToday = (date: Date): boolean => {
  return isAfter(date, new Date());
};

/**
 * Get month name based on month number (1-12)
 * @param monthNumber - The month number (1 for January, 2 for February, etc.)
 * @param short - If true, returns short form (Jan, Feb, etc.), otherwise full name
 * @returns The month name as a string
 */
export const getMonthName = (monthNumber: number, short: boolean = true): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Month number must be between 1 and 12.");
  }

  return short ? months[monthNumber - 1].slice(0, 3) : months[monthNumber - 1];
};

/**
 * Get the start date of the financial year
 * (Default: April 1st of the current financial year)
 */
export const getFinancialYearStart = (date: Date = new Date()): Date => {
  const year =
    date.getMonth() < 3 ? date.getFullYear() - 1 : date.getFullYear(); // If before April, take previous year
  return new Date(year, 3, 1); // April 1st
};

/**
 * Get the end date of the financial year
 * (Default: March 31st of the current financial year)
 */
export const getFinancialYearEnd = (date: Date = new Date()): Date => {
  const year =
    date.getMonth() < 3 ? date.getFullYear() : date.getFullYear() + 1; // If before April, take current year
  return new Date(year, 2, 31); // March 31st
};

/**
 * Get financial year in string format (e.g., "2024-2025")
 */
export const getFinancialYearString = (date: Date = new Date()): string => {
  const startYear =
    date.getMonth() < 3 ? date.getFullYear() - 1 : date.getFullYear();
  const endYear = startYear + 1;
  return `${startYear}-${endYear}`;
};

/**
 * Get financial year start and end dates as an object
 */
export const getFinancialYearDates = (
  date: Date = new Date()
): { start: Date; end: Date } => {
  return {
    start: getFinancialYearStart(date),
    end: getFinancialYearEnd(date),
  };
};


export const  formatDate =(date: string|Date): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
