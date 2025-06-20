"use client";

import { useEffect, useState } from "react";
import { MonthSwitch } from "src/components/MonthSwitch/MonthSwitch";
import { months } from "src/constants/months";
import { CalenderGrid, DayOfTheWeek, Header } from "./Calender.styled";
import { getMonthDays } from "src/helpers/getMonthDays";
import { daysOfWeek } from "src/constants/daysOfWeek";
import { CalenderDay } from "src/components/CalenderDay/CalenderDay";
import { DndContext } from "@dnd-kit/core";

interface ICalender {
  holidays: Record<string, string>[];
  tasks: Record<string, any>[];
}

export const Calender = ({ holidays, tasks }: ICalender) => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const date = new Date();

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, []);

  useEffect(() => {
    if (month === 12) {
      setYear((prevState) => prevState + 1);
      setMonth(0);
    }

    if (month === -1) {
      setYear((prevState) => prevState - 1);
      setMonth(11);
    }
  }, [month]);

  const calenderDays = getMonthDays(month, year);

  const thisMonthHolidays = holidays.filter(
    ({ date }) => new Date(date).getMonth() === month
  );
  const thisMonthTasks = tasks.filter(
    ({ dueDate }) => new Date(dueDate).getMonth() === month
  );

  console.log(holidays, tasks);
  console.log(calenderDays);

  return (
    <DndContext>
      <Header>
        <MonthSwitch setMonth={setMonth} />

        <h1>
          {months[month]} {year}
        </h1>
      </Header>

      <CalenderGrid>
        {daysOfWeek.map((day) => (
          <DayOfTheWeek key={day}>
            <p>{day}</p>
          </DayOfTheWeek>
        ))}

        {calenderDays.map(({ day, date, currentMonth }, index) => (
          <CalenderDay
            key={index}
            day={day}
            date={date}
            currentMonth={currentMonth}
            holidays={thisMonthHolidays.filter(
              (holiday) =>
                currentMonth && new Date(holiday.date).getDate() === day
            )}
            tasks={thisMonthTasks.filter(
              ({ dueDate }) => dueDate.split("T")[0] === date
            )}
          />
        ))}
      </CalenderGrid>
    </DndContext>
  );
};
