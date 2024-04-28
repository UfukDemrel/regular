import React, { useEffect, useState } from "react";
import "./App.css";

function Zustand() {
  const [tasks, setTasks] = useState([]);
  const storageKey = 'kanbanTasks';
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(storageKey));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, category) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task.id.toString() === taskId) {
        return { ...task, category };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = (category) => {
    const newTask = { id: tasks.length + 1, title: `New Task ${tasks.length + 1}`, category };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() !== '') {
      const newColumn = { title: newColumnName, category: newColumnName.toLowerCase().replace(/\s/g, '-') };
      setNewColumnName('');
      const updatedColumns = [...columns, newColumn];
      setColumns(updatedColumns);
      const updatedTasks = [...tasks];
      updatedTasks.forEach(task => {
        if (!task.hasOwnProperty(newColumn.category)) {
          task[newColumn.category] = [];
        }
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="add-column">
          <input type="text" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} placeholder="Enter Column Name" />
          <button onClick={handleAddColumn}>Add Column</button>
        </div>
      <div className="board">
        {columns.map((column,index) => (
          <div className="column" id={column.id} key={index} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.category)}>
            <h2>{column.title}</h2>
            {tasks.filter(task => task.category === column.category).map((task) => (
              <div className="taskdiv" key={task.id}>
                <div className="task" draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                  {task.title}
                </div>
                <div onClick={() => handleRemoveTask(task.id)}>Remove</div>
              </div>
            ))}
            <button onClick={() => handleAddTask(column.category)}>Add Task</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Zustand;
