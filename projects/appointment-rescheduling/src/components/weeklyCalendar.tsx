import { FC, useState } from "react";

//Assign Button component that recives hour and disabled props
interface ButtonProps {
  hour: string;
  disabled: boolean;
  selected?: boolean;
}

//Button component that recives hour and disabled props
const Button: FC<ButtonProps> = ({ hour, disabled, selected = false }) => {
  return (
    <button
      className={`rounded-lg px-6 py-2 text-lg border-2 border-transparent font-semibold ${
        disabled
          ? "line-through bg-transparent text-slate-300"
          : "hover:border-blue-700 hover:"
      }
      ${selected ? "bg-blue-500 text-white" : "text-blue-600 bg-blue-100"}
      `}
      disabled={disabled}
    >
      {hour}
    </button>
  );
};

export const WeeklyCalendar: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [fullHeight, setFullHeight] = useState<boolean>(false);

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
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ];

  return (
    <nav
      className={`flex w-full overflow-hidden p-6 relative ${
        fullHeight ? "h-auto" : "h-[36rem]"
      }`}
    >
      <button onClick={handleLeftArrowClick} aria-label="Previous week">
        &lt;
      </button>
      <ul className={`flex w-full justify-around ${fullHeight ? "pb-16" : ""}`}>
        {weekDays.map((day, index) => (
          <li key={index} className={`text-center px-4 py-2 `}>
            <section
              className={`${
                isToday(day) ? "bg-blue-500 rounded-lg text-white" : ""
              }`}
            >
              <div>{dayNames[day.getDay()]}</div>
              <div>
                {day.getDate()} {monthNames[day.getMonth()]}
              </div>
            </section>

            <section className="flex flex-col gap-4 mt-4">
              <Button hour="8:00" disabled={true} />
              <Button hour="9:00" disabled={false} />
              <Button hour="10:00" disabled={false} />
              <Button hour="11:00" disabled={false} />
              <Button hour="12:00" disabled={false} />
              <Button hour="13:00" disabled={false} selected />
              <Button hour="14:00" disabled={false} />
              <Button hour="15:00" disabled={false} />
              <Button hour="16:00" disabled={false} />
              <Button hour="17:00" disabled={false} />
            </section>
          </li>
        ))}
      </ul>
      <button onClick={handleRightArrowClick} aria-label="Next week">
        &gt;
      </button>
      <div className="absolute bottom-0 left-0 w-full z-10 bg-white text-center py-6 border-t-2">
        <button onClick={() => setFullHeight(!fullHeight)}>
          {fullHeight ? "Less" : "See more hours"}
        </button>
      </div>
    </nav>
  );
};
