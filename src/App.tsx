import React, { useState } from "react";
import "./App.css";
import AddTasks from "./Components/AddTasks/AddTasks";
import { Task, saveTasks } from "./Models";
import TasksList from "./Components/TasksList/TasksList";

const App: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskNote, setTaskNote] = useState<string>("");

  const getTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    getTasks == null ? [] : JSON.parse(getTasks)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle) {
      const newTask: Task = {
        _id: new Date(),
        taskTitle,
        taskNote,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);

      saveTasks([...tasks, newTask]);
      setTaskTitle("");
      setTaskNote("");
    }
  };
  console.log(tasks);

  return (
    <div className="App">
      <h1 className="title">
        Tra<span style={{ color: "#389393" }}>k</span>er Tas
        <span style={{ color: "#389393" }}>k</span>
      </h1>

      <AddTasks
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskNote={taskNote}
        setTaskNote={setTaskNote}
        handleSubmit={handleSubmit}
      />

      <TasksList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
