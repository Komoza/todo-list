import { useState } from "react";
import React, { useRef } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: "Task #1",
      text: "I need to do something",
      done: true,
      isExpanded: false,
    },
    {
      id: 1,
      name: "Task #2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi officiis eos magni dicta! Ullam repellendus at culpa ex, rerum ea perferendis porro velit magni temporibus nam quae, consectetur facilis blanditiis eos possimus veniam alias sapiente doloremque ipsa. Minima nostrum accusamus quisquam minus natus corrupti doloribus amet pariatur veritatis facere.",
      done: false,
      isExpanded: false,
    },
    {
      id: 2,
      name: "Task #3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi officiis eos magni dicta! Ullam repellendus at culpa ex, rerum ea perferendis porro velit magni temporibus nam quae, consectetur facilis blanditiis eos possimus veniam alias sapiente doloremque ipsa. Minima nostrum accusamus quisquam minus natus corrupti doloribus amet pariatur veritatis facere.",
      done: true,
      isExpanded: false,
    },
    {
      id: 3,
      name: "Task #4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi officiis eos magni dicta! Ullam repellendus at culpa ex, rerum ea perferendis porro velit magni temporibus nam quae, consectetur facilis blanditiis eos possimus veniam alias sapiente doloremque ipsa. Minima nostrum accusamus quisquam minus natus corrupti doloribus amet pariatur veritatis facere.",
      done: false,
      isExpanded: false,
    },
    {
      id: 4,
      name: "Task #5",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi officiis eos magni dicta! Ullam repellendus at culpa ex, rerum ea perferendis porro velit magni temporibus nam quae, consectetur facilis blanditiis eos possimus veniam alias sapiente doloremque ipsa. Minima nostrum accusamus quisquam minus natus corrupti doloribus amet pariatur veritatis facere.",
      done: false,
      isExpanded: false,
    },
    {
      id: 5,
      name: "Task #6",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi officiis eos magni dicta! Ullam repellendus at culpa ex, rerum ea perferendis porro velit magni temporibus nam quae, consectetur facilis blanditiis eos possimus veniam alias sapiente doloremque ipsa. Minima nostrum accusamus quisquam minus natus corrupti doloribus amet pariatur veritatis facere.",
      done: true,
      isExpanded: false,
    },
  ]);
  const renderTasks = () => {
    return tasks.map((task) => (
      <div key={task.id} className="task-box" id={`task-box-${task.id}`}>
        <li
          id={`task-${task.id}`}
          key={task.id}
          className="task"
          onClick={() => handleTaskClick(task.id)}
        >
          {task.name}
          {task.isExpanded && <div className="task-text">{task.text}</div>}
        </li>
        <div className="edit"></div>
        <div className="trash" onClick={() => handleTrashClick(task.id)}></div>
      </div>
    ));
  };

  const taskTextRef = useRef(null);
  const taskNameRef = useRef(null);

  const [showTextArea, setShowTextArea] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleTrashClick = (index) => {
    const taskBox = document.getElementById(`task-box-${index}`);
    taskBox.classList.add("deleted");

    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTimeout(() => {
      document.querySelector('.deleted').classList.remove('deleted');
      setTasks(newTasks.map((task, i) => ({ ...task, id: i })));
    }, 600);
  };

  const handleAddTask = () => {
    if (taskName === "" || taskText === "") return;
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length,
        name: taskName,
        text: taskText,
        done: false,
        isExpanded: false,
      },
    ]);
    setTaskText("");
    setTaskName("");
    setShowTextArea(false);
  };

  const handleTaskClick = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isExpanded: !task.isExpanded } : task
      )
    );
  };

  const handleCancelTask = () => {
    setTaskText("");
    setTaskName("");
    setShowTextArea(false);
  };

  const handleToggleTextArea = () => {
    setShowTextArea(!showTextArea);
    setTimeout(() => taskNameRef.current.focus(), 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancelTask();
    }
  };

  const handleKeyDownName = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      taskTextRef.current.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancelTask();
    }
  };

  // start
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Todo List</h1>
        <ul className="tasks">{renderTasks()}</ul>
        <div className="add-box">
          {showTextArea ? (
            <textarea
              ref={taskNameRef}
              type="text"
              className="add-task-name"
              placeholder="Write name task"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              onKeyDown={handleKeyDownName}
            />
          ) : null}
          {showTextArea ? (
            <textarea
              ref={taskTextRef}
              type="text"
              className="add-task-text"
              placeholder="Write discription task"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : null}
          <div className="button-box">
            <button
              data-edit="false"
              className={
                (taskText === "" || taskName === "") && showTextArea
                  ? "add-task"
                  : "add-task --active"
              }
              onClick={showTextArea ? handleAddTask : handleToggleTextArea}
            >
              {showTextArea ? "Save" : "Add"}
            </button>

            {showTextArea ? (
              <button
                data-edit="false"
                className="add-task --active"
                onClick={handleCancelTask}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
