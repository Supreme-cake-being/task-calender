"use client";

import axios from "axios";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { CalenderGrid, DayOfTheWeek, Header } from "./Calender.styled";
import { MonthSwitch } from "src/components/MonthSwitch/MonthSwitch";
import { CalenderDay } from "src/components/CalenderDay/CalenderDay";
import { Task } from "src/components/Task/Task";
import { Debug } from "src/components/Debug";
import { getMonthDays } from "src/helpers/getMonthDays";

import { months } from "src/constants/months";
import { daysOfWeek } from "src/constants/daysOfWeek";

export interface ITaskType {
  _id: string;
  title: string;
  description: string;
  status: "in progress" | "done";
  dueDate: string;
}

export interface ITasksByDate {
  [date: string]: ITaskType[];
}

interface ICalender {
  holidays: Record<string, string>[];
  tasks: ITaskType[];
}

export const Calender = ({ holidays, tasks }: ICalender) => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [tasksByDate, setTasksByDate] = useState<ITasksByDate>({});
  const [activeTask, setActiveTask] = useState<ITaskType | null>(null);

  // Initialize month/year on mount
  useEffect(() => {
    const now = new Date();
    setMonth(now.getMonth());
    setYear(now.getFullYear());
  }, []);

  // Group tasks once on mount
  useEffect(() => {
    const grouped: ITasksByDate = {};
    tasks.forEach((task) => {
      const dateKey = task.dueDate.split("T")[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(task);
    });
    setTasksByDate(grouped);
  }, []); // Only run once to initialize

  // useEffect(() => {
  //   console.log(tasksByDate);
  // }, [tasksByDate]);

  const calenderDays = getMonthDays(month, year);
  const thisMonthHolidays = holidays.filter(
    ({ date }) => new Date(date).getMonth() === month
  );

  const handleDragStart = (event: any) => {
    const task = event.active.data.current?.task;
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = String(active.id);
    const sourceDate = String(active.data.current?.task?.dueDate.split("T")[0]);
    const targetDate = String(over.id);

    if (!sourceDate || !targetDate) return;

    if (isNaN(Date.parse(targetDate))) {
      setTasksByDate((prev) => {
        const updatedDayTasks = [...(prev[sourceDate] || [])];
        const oldIndex = updatedDayTasks.findIndex(
          (task) => task._id === activeTaskId
        );
        const newIndex = over.data?.current?.sortable?.index;

        if (oldIndex === -1 || newIndex === undefined || oldIndex === newIndex)
          return prev;

        const [movedTask] = updatedDayTasks.splice(oldIndex, 1);
        updatedDayTasks.splice(newIndex, 0, movedTask);

        return { ...prev, [sourceDate]: updatedDayTasks };
      });
    } else {
      setTasksByDate((prev) => {
        const sourceTasks = [...(prev[sourceDate] || [])];
        const targetTasks = [...(prev[targetDate] || [])];

        const movedTaskIndex = sourceTasks.findIndex(
          (task) => task._id === activeTaskId
        );

        if (movedTaskIndex === -1) return { ...prev };

        const movedTask = {
          ...sourceTasks[movedTaskIndex],
          dueDate: targetDate,
        };

        const newSourceTasks = sourceTasks.filter(
          (task) => task._id !== activeTaskId
        );
        const newTargetTasks = [...targetTasks, movedTask];

        const updated = {
          ...prev,
          [sourceDate]: newSourceTasks,
          [targetDate]: newTargetTasks,
        };

        if (updated[sourceDate]?.length === 0) {
          delete updated[sourceDate];
        }

        const { title, description, status } = active.data.current?.task;
        axios.put(process.env.NEXT_PUBLIC_API + `/tasks/${activeTaskId}`, {
          title,
          description,
          status,
          dueDate: targetDate,
        });

        return { ...updated };
      });
    }

    setActiveTask(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Header>
        <MonthSwitch setMonth={setMonth} />
        <h1>
          {months[month]} {year}
        </h1>
        <Debug />
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
            tasks={tasksByDate[date] || []}
            setTasksByDate={setTasksByDate}
          />
        ))}
      </CalenderGrid>

      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
