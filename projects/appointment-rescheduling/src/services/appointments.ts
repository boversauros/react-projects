type AppointmentSlots = {
  Start: string;
  End: string;
};

type Timeslot = {
  Start: string;
  End: string;
  available: boolean;
};

type Day = {
  date: string;
  timeslots: Timeslot[];
};

type Week = {
  weekStartDate: string;
  days: Day[];
};

const addDays = (date: Date, days: number) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

const getDatesBetween = (startDate: Date, endDate: Date) => {
  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

export const convertToCalendarStructure = (
  data: AppointmentSlots[]
): { weeks: Week[] } => {
  const calendar: { weeks: Week[] } = { weeks: [] };
  let startOfWeek: Date | null = null;

  data.forEach((timeslot) => {
    // Parse the start date
    const startDate = new Date(timeslot.Start);

    // If startOfWeek is null, this is the first iteration, set the startOfWeek and create first week
    if (!startOfWeek) {
      startOfWeek = new Date(startDate);
      const week = {
        weekStartDate: startOfWeek.toISOString().split("T")[0],
        days: [],
      };
      calendar.weeks.push(week);
    }

    // Get the current week
    let week = calendar.weeks[calendar.weeks.length - 1];

    // If the current startDate is more than 7 days from startOfWeek, move startOfWeek and create new week
    if (
      (startDate.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24) >=
      7
    ) {
      startOfWeek = new Date(startDate);
      week = {
        weekStartDate: startOfWeek.toISOString().split("T")[0],
        days: [],
      };
      calendar.weeks.push(week);
    }

    // Find the day in the week, or create a new one if it doesn't exist
    let day = week.days.find(
      (d) => d.date === startDate.toISOString().split("T")[0]
    );
    if (!day) {
      day = { date: startDate.toISOString().split("T")[0], timeslots: [] };
      week.days.push(day);
    }

    // Add the timeslot to the day, randomly setting the availability
    const available = Math.random() > 0.1; // 90% probability of being available
    day.timeslots.push({ ...timeslot, available });
  });

  // Fill in missing days
  for (let week of calendar.weeks) {
    const weekStart = new Date(week.weekStartDate);
    const weekEnd = addDays(weekStart, 6);
    const dates = getDatesBetween(weekStart, weekEnd);
    for (let date of dates) {
      const dateString = date.toISOString().split("T")[0];
      if (!week.days.find((d) => d.date === dateString)) {
        week.days.push({ date: dateString, timeslots: [] });
      }
    }
    // Sort days
    week.days.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return calendar;
};
