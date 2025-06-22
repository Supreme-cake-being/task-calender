"use client";

import { Task } from "./Task";

export const DebugTask = () => {
  return (
    <Task
      task={{
        _id: "test",
        title: "Test Task",
        description: "",
        status: "done",
        dueDate: "2025-06-01",
      }}
    />
  );
};
