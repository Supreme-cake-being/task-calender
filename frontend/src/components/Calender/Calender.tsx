"use client";

import { useEffect, useState } from "react";
import { MonthSwitch } from "src/components/MonthSwitch/MonthSwitch";
import { months } from "src/constants/months";
import { CalenderGrid, Header } from "./Calender.styled";
import { getMonthDays } from "src/helpers/getMonthDays";
import { daysOfWeek } from "src/constants/daysOfWeek";
import { CalenderDay } from "src/components/CalenderDay/CalenderDay";

export const Calender = () => {
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

  return (
    <>
      <Header>
        <MonthSwitch setMonth={setMonth} />

        <h1>
          {months[month]} {year}
        </h1>
      </Header>

      <CalenderGrid>
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}

        {calenderDays.map(({ date, currentMonth }, index) => (
          <CalenderDay key={index} date={date} currentMonth={currentMonth} />
        ))}
      </CalenderGrid>
    </>
  );
};
