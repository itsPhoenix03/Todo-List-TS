import React from "react";
import "./TasksList.css";
import { Task } from "../../Models";
import TaskTemplate from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksList = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  return (
    <>
      <div className="wrapper-container">
        <Droppable droppableId="markNotCompleted">
          {(provided) => (
            <div
              className="new-tasks-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="container-heading">Next Up</span>

              <div className="tasksList">
                {tasks.map((task, index) => (
                  <TaskTemplate
                    index={index}
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={`${task._id}`}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="markCompleted">
          {(provided) => (
            <div
              className="completed-tasks-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="container-heading">Completed One's</span>

              <div className="tasksList">
                {completedTasks.map((task, index) => (
                  <TaskTemplate
                    index={index}
                    task={task}
                    tasks={completedTasks}
                    setTasks={setCompletedTasks}
                    key={`${task._id}`}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TasksList;
