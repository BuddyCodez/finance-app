import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function FormatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US")
}
export function convertMiliUnitsToAmount(amount: number) {
  return amount / 1000
}
export function convertAmountToMiliUnits(amount: number) {
  return Math.round(amount * 1000);
}
export function calculatePercentageChange(current: number, previous: number) {
  if (previous == 0) {
    return current == 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}
export function fillMissingDays(activeDays: {
  date: Date,
  income: number,
  expense: number
}[], startDate: Date, endDate: Date) {
  if (activeDays.length === 0) {
    return [];
  }
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });
  const transactionsByDays = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    return found || { date: day, income: 0, expense: 0 }
  })
  return transactionsByDays;
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
}
export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`
  }
  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`
  }
  // return `${format(period.from, "LLL dd, y")} - Present`
  return format(period.from, "LLL dd, y")
}
export function formatPercentage(v: number | undefined, options: { addPrefix?: boolean } = {
  addPrefix: false
}) {
  const value = v ?? 0;
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);
  if (options.addPrefix && value > 0) {
    return `+${result}`
  }
  return result
}