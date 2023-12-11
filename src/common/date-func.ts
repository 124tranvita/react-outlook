import * as DateFns from "date-fns";

/**
 * Add hours to current time
 */
export const addHours = (
  value: Date | string | undefined,
  hours: number
): Date => {
  if (!value || value === undefined) return new Date();

  const dt = value instanceof Date ? value : DateFns.parseISO(value);

  return new Date(DateFns.addHours(dt, hours));
};
