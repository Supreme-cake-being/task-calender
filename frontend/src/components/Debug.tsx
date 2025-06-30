import { CreateButton } from "./CalenderDay/CalenderDay.styled";
import { Task } from "./Task/Task";
import { ConfirmButton, InputBox, TaskInput } from "./Task/Task.styled";

export const Debug = () => {
  return (
    <div style={{ display: "none" }}>
      <Task
        task={{
          _id: "test",
          title: "Test Task",
          description: "",
          status: "done",
          dueDate: "2025-06-01",
        }}
      />

      <CreateButton>Create Button</CreateButton>

      <InputBox />
      <TaskInput />
      <ConfirmButton />
    </div>
  );
};
