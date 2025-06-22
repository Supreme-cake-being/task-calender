"use client";

import { useDroppable } from "@dnd-kit/core";
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
  const { setNodeRef } = useDroppable({ id: date });

  return (
    <Box $currentMonth={currentMonth} ref={setNodeRef}>
      <Day>{day}</Day>

      {holidays?.map(({ date, localName }) => (
        <Holiday key={date} localName={localName} />
      ))}

      {tasks?.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </Box>
  );
};
