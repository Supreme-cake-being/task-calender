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
}

export const Calender = ({ holidays }: ICalender) => {
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

  console.log(
    holidays.filter(({ date }) => new Date(date).getMonth() === month)
  );

  const thisMonthHolidays = holidays.filter(
    ({ date }) => new Date(date).getMonth() === month
  );

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

        {calenderDays.map(({ date, currentMonth }, index) => (
          <CalenderDay
            key={index}
            date={date}
            currentMonth={currentMonth}
            holidays={thisMonthHolidays.filter(
              (holiday) =>
                currentMonth && new Date(holiday.date).getDate() === date
            )}
          />
        ))}
      </CalenderGrid>
    </DndContext>
  );
};
