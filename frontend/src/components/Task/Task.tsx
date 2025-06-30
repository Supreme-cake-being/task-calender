"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Bar,
  Box,
  DragHandle,
  ConfirmButton,
  InputBox,
  TaskInput,
  TaskName,
} from "./Task.styled";
import { useState } from "react";
import axios from "axios";

interface ITask {
  task: Record<string, any>;
}

export const Task = ({ task }: ITask) => {
  const [isEdited, setIsEdited] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      data: {
        task,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleIsEdited = () => setIsEdited(!isEdited);

  const handleSubmit = async () => {
    console.log("edited");
    await axios.put(process.env.NEXT_PUBLIC_API + `/tasks/${task._id}`, {
      title: taskTitle,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });
    toggleIsEdited();
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <Box>
        <DragHandle {...listeners}>
          <Bar />
        </DragHandle>

        {!isEdited && <TaskName onClick={toggleIsEdited}>{taskTitle}</TaskName>}

        {isEdited && (
          <InputBox>
            <TaskInput
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <ConfirmButton onClick={handleSubmit}>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ConfirmButton>
          </InputBox>
        )}
      </Box>
    </div>
  );
};
