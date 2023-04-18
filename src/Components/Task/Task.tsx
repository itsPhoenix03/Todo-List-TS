import React, { useState } from "react";
import "./Task.css";
import { Task, saveTasks } from "../../Models";
import { AiFillDelete, AiFillEdit, AiOutlineUndo } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskTemplate = ({ index, task, tasks, setTasks }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editTitle, setEditTitle] = useState(task.taskTitle);

  const handleEdit = (id: Date) => {
    const updatedTaskTitle = tasks.map((task) =>
      task._id === id ? { ...task, taskTitle: editTitle } : task
    );
    setTasks(updatedTaskTitle);
    saveTasks([...updatedTaskTitle]);
    // setIsEditable(false);
  };

  const handleDone = (id: Date) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    saveTasks([...updatedTasks]);
  };

  const handleDelete = (id: Date) => {
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
    saveTasks([...updatedTasks]);
  };

  return (
    <Draggable draggableId={`${task._id}`} index={index}>
      {(porvided, snapshot) => (
        <div
          ref={porvided.innerRef}
          {...porvided.dragHandleProps}
          {...porvided.draggableProps}
          className={`
            ${
              task.isCompleted ? "task-container isCompleted" : "task-container"
            }
            ${snapshot.isDragging ? "dragging" : ""}
          `}
        >
          <div className="task-left-section">
            {isEditable ? (
              <input
                className="task-upper"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  handleEdit(task._id);
                  setIsEditable((prev) => (e.key === "Enter" ? !prev : prev));
                }}
              />
            ) : task.isCompleted ? (
              <s className="task-strick">
                <span className="task-upper">{task.taskTitle}</span>
              </s>
            ) : (
              <div className="task-upper">{task.taskTitle}</div>
            )}

            {task.taskNote && <div className="task-lower">{task.taskNote}</div>}
          </div>

          <div className="task-right-section">
            <span className="icons">
              <AiFillEdit
                className="icon edit"
                onClick={() => {
                  if (!task.isCompleted) {
                    setIsEditable((prev) => !prev);
                    handleEdit(task._id);
                  }
                }}
              />
            </span>
            <span className="icons">
              <AiFillDelete
                className="icon delete"
                onClick={() => handleDelete(task._id)}
              />
            </span>
            <span className="icons">
              {!task.isCompleted ? (
                <MdDone
                  className="icon check"
                  onClick={() => handleDone(task._id)}
                />
              ) : (
                <AiOutlineUndo
                  className="icon undo"
                  onClick={() => handleDone(task._id)}
                />
              )}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskTemplate;
