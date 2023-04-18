import React, { useState } from "react";
import "./App.css";
import AddTasks from "./Components/AddTasks/AddTasks";
import { Task, saveTasks } from "./Models";
import TasksList from "./Components/TasksList/TasksList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskNote, setTaskNote] = useState<string>("");

  const getTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    getTasks == null ? [] : JSON.parse(getTasks)
  );

  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let grabedTask,
      uncompletedTasks = tasks,
      completedTasksArr = completedTasks;

    if (source.droppableId === "markNotCompleted") {
      grabedTask = uncompletedTasks[source.index];
      uncompletedTasks.splice(source.index, 1);
    } else {
      grabedTask = completedTasksArr[source.index];
      completedTasksArr.splice(source.index, 1);
    }

    if (destination.droppableId === "markNotCompleted")
      uncompletedTasks.splice(destination.index, 0, grabedTask);
    else completedTasksArr.splice(destination.index, 0, grabedTask);

    setCompletedTasks(completedTasksArr);
    setTasks(uncompletedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
