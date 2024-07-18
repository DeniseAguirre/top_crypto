import { format, toZonedTime } from "date-fns-tz";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatDate = (date: Date) => {
  const zonedDate = toZonedTime(date, userTimeZone);
  return format(zonedDate, "MM/dd/yyyy, HH:mm:ss", {
    timeZone: userTimeZone,
  });
};
