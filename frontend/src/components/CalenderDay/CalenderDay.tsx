"use client";

import { Box, Day } from "./CalenderDay.styled";
import { Holiday } from "src/components/Holiday/Holiday";
import { Task } from "src/components/Task/Task";

interface ICalenderDay {
  day: number;
  date: string;
  currentMonth: boolean;
  holidays?: Record<string, any>[];
  tasks?: Record<string, any>[];
}

export const CalenderDay = ({
  day,
  date,
  currentMonth,
  holidays,
  tasks,
}: ICalenderDay) => {
  if (tasks && tasks.length >= 1) {
    console.log(day, tasks);
  }

  return (
    <Box $currentMonth={currentMonth}>
      <Day>{day}</Day>

      {holidays?.map(({ date, localName }) => (
        <Holiday key={date} localName={localName} />
      ))}

      {tasks?.map(({ _id, title, description, status, dueDate }) => (
        <Task
          key={_id}
          title={title}
          description={description}
          status={status}
          dueDate={dueDate}
        />
      ))}
    </Box>
  );
};
