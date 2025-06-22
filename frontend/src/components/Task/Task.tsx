"use client";

import { Bar, Box, TaskName } from "./Task.styled";

interface ITask {
  title: string;
  description: string;
  status: "in progress" | "done";
  dueDate: string;
}

export const Task = ({ title, description, status, dueDate }: ITask) => {
  return (
    <Box>
      <Bar />
      <TaskName>{title}</TaskName>
    </Box>
  );
};
