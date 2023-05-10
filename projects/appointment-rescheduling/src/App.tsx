import { CalendarIcon } from "./components/CalendarIcon";
import { CardWrapper } from "./components/layout/CardWrapper";
import { WeeklyCalendar } from "./components/weeklyCalendar";

function App() {
  return (
    <div className="container mx-auto px-4 pt-32">
      <header>
        <h1 className="text-3xl font-light">
          Confirm your appointment with{" "}
          <span className="font-bold">Dr. Simeon Molas</span>
        </h1>
      </header>
      <main className="mt-10">
        <CardWrapper>
          <div className="flex items-center gap-8 p-6">
            <CalendarIcon className="h-10 w-10 text-gray-500" />
            <p className="text-2xl">On Friday, 21 May 2021 at 10:30</p>
          </div>
        </CardWrapper>
        <div className="mt-10">
          <CardWrapper>
            <WeeklyCalendar />
          </CardWrapper>
        </div>
      </main>
    </div>
  );
}

export default App;
