"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { CalenderGrid, DayOfTheWeek, Header } from "./Calender.styled";

import { MonthSwitch } from "src/components/MonthSwitch/MonthSwitch";
import { CalenderDay } from "src/components/CalenderDay/CalenderDay";
import { Task } from "src/components/Task/Task";
import { DebugTask } from "src/components/Task/DebugTask";

import { getMonthDays } from "src/helpers/getMonthDays";

import { months } from "src/constants/months";
import { daysOfWeek } from "src/constants/daysOfWeek";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ICalender {
  holidays: Record<string, string>[];
  tasks: Record<string, any>[];
}

export const Calender = ({ holidays, tasks }: ICalender) => {
  const router = useRouter();

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [activeTask, setActiveTask] = useState<Record<string, any> | null>(
    null
  );

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

  const handleDragStart = async (event: any) => {
    const task = event.active.data.current?.task;
    setActiveTask(task);
  };

  const handleDragEnd = async (event: any) => {
    console.log("Drag ended", event);

    const { active, over } = event;

    const task = active.data.current?.task;

    console.log("Dragged task:", task);

    if (!task || !over) return;

    const originalDate = task.dueDate.split("T")[0];
    const newDate = over.id;

    if (originalDate !== newDate) {
      await axios.put(process.env.NEXT_PUBLIC_API + `/tasks/${active.id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: newDate,
      });
    }

    setActiveTask(null);

    router.refresh();
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Header>
        <MonthSwitch setMonth={setMonth} />

        <h1>
          {months[month]} {year}
        </h1>

        <DebugTask />
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

      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
