"use client";

import { useDraggable } from "@dnd-kit/core";
import { Bar, Box, TaskName } from "./Task.styled";

interface ITask {
  task: Record<string, any>;
}

export const Task = ({ task }: ITask) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
    data: {
      task,
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <Box>
        <Bar />
        <TaskName>{task.title}</TaskName>
      </Box>
    </div>
  );
};
