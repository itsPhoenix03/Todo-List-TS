import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import AddTasks from "./Components/AddTasks/AddTasks";
import { Task, saveCompletedTasks, saveTasks } from "./Models";
import TasksList from "./Components/TasksList/TasksList";

const App: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskNote, setTaskNote] = useState<string>("");

  const getTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    getTasks == null ? [] : JSON.parse(getTasks)
  );

  const getCompletedTasks = localStorage.getItem("completedTasks");
  const [completedTasks, setCompletedTasks] = useState<Task[]>(
    getCompletedTasks === null ? [] : JSON.parse(getCompletedTasks)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle) {
      const newTask: Task = {
        _id: uuid(),
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

    if (source.droppableId === "uncompleted") {
      grabedTask = uncompletedTasks[source.index];
      uncompletedTasks.splice(source.index, 1);
    } else {
      grabedTask = completedTasksArr[source.index];
      completedTasksArr.splice(source.index, 1);
    }

    if (destination.droppableId === "uncompleted") {
      grabedTask.isCompleted = false;
      uncompletedTasks.splice(destination.index, 0, grabedTask);
    } else {
      grabedTask.isCompleted = true;
      completedTasksArr.splice(destination.index, 0, grabedTask);
    }

    setCompletedTasks(completedTasksArr);
    saveCompletedTasks(completedTasksArr);

    setTasks(uncompletedTasks);
    saveTasks(uncompletedTasks);
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
