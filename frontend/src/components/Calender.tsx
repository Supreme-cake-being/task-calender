"use client";

import { useEffect, useState } from "react";
import { MonthSwitch } from "src/components/MonthSwitch/MonthSwitch";

export const Calender = () => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const date = new Date();

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, []);

  return (
    <>
      <div>
        <MonthSwitch setMonth={setMonth} />
      </div>
    </>
  );
};
