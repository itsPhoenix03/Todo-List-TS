import React, { useRef } from "react";
import "./AddTasks.css";

type Props = {
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskNote: string;
  setTaskNote: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
};

const AddTasks = ({
  taskTitle,
  setTaskTitle,
  taskNote,
  setTaskNote,
  handleSubmit,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="addTasksForm"
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="List a new Task Title!"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="input__title"
      />

      <input
        ref={inputRef}
        type="text"
        placeholder="Attach a note to it also!"
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
        className="input__note"
      />

      <button type="submit" className="button__submit">
        Add
      </button>
    </form>
  );
};

export default AddTasks;
