import { FC, useState } from "react";

export const WeeklyCalendar: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const generateWeekDays = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleLeftArrowClick = (): void => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const handleRightArrowClick = (): void => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const weekDays: Date[] = generateWeekDays(currentDate);
  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <nav className="flex gap-4 w-full p-6">
      <button onClick={handleLeftArrowClick} aria-label="Previous week">
        &lt;
      </button>
      <ul className="flex w-full justify-around">
        {weekDays.map((day, index) => (
          <li
            key={index}
            className={`text-center px-4 py-2 
            ${isToday(day) ? "bg-red-500 rounded-lg text-white" : ""}`}
          >
            <div>{day.getDate()}</div>
            <div>{dayNames[day.getDay()]}</div>
          </li>
        ))}
      </ul>
      <button onClick={handleRightArrowClick} aria-label="Next week">
        &gt;
      </button>
    </nav>
  );
};
