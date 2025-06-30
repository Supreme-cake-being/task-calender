"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Box, CreateButton, Day, Holidays, Tasks } from "./CalenderDay.styled";
import { Holiday } from "src/components/Holiday/Holiday";
import { Task } from "src/components/Task/Task";
import { ITaskType, ITasksByDate } from "src/components/Calender/Calender";
import axios from "axios";

interface ICalenderDay {
  day: number;
  date: string;
  currentMonth: boolean;
  holidays?: Record<string, any>[];
  tasks?: Record<string, any>[];
  setTasksByDate: Dispatch<SetStateAction<ITasksByDate>>;
}

export const CalenderDay = ({
  day,
  date,
  currentMonth,
  holidays,
  tasks,
  setTasksByDate,
}: ICalenderDay) => {
  // console.log(tasks);

  const [isShown, setIsShown] = useState(false);

  const { setNodeRef } = useDroppable({ id: date });

  const createNewTask = async (date: string) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_API + `/tasks`, {
      title: "Task",
      description: "Description",
      status: "in progress",
      dueDate: date,
    });
    const newTask = response.data;

    setTasksByDate((prev) => {
      if (prev[date]) {
        const newTasks = [...prev[date], newTask];

        return {
          ...prev,
          [date]: newTasks,
        };
      } else {
        return {
          ...prev,
          [date]: [newTask],
        };
      }
    });
  };

  return (
    <Box
      $currentMonth={currentMonth}
      ref={setNodeRef}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Day>{day}</Day>

      <Holidays>
        {holidays?.map(({ date, localName }) => (
          <Holiday key={date} localName={localName} />
        ))}
      </Holidays>

      {tasks && (
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <Tasks>
            {tasks.map((task) => (
              <Task key={task._id} task={task} />
            ))}
          </Tasks>
        </SortableContext>
      )}

      {isShown && (
        <CreateButton type="button" onClick={() => createNewTask(date)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12H20M12 4V20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CreateButton>
      )}
    </Box>
  );
};
