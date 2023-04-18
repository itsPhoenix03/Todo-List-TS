import React from "react";
import "./TasksList.css";
import { Task } from "../../Models";
import TaskTemplate from "../Task/Task";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksList = ({ tasks, setTasks }: Props) => {
  return (
    <div className="tasksList">
      {!tasks && (
        <span style={{ color: "white", border: "1px solid yellow" }}>
          No tasks
        </span>
      )}
      {tasks &&
        tasks.map((task) => (
          <TaskTemplate
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            key={`${task._id}`}
          />
        ))}
    </div>
  );
};

export default TasksList;
