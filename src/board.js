import React, { useEffect, useRef, useState } from "react";
import mordecai from "./images/mordecai.png";
import rigby from "./images/rigby.png";
import benson from "./images/benson.png";
import great from "./images/great.png";
import { useStore } from "./store";

const Board = () => {
  const [modal, setModal] = useState(false);
  const { tasks, addTask, moveTask } = useStore();
  const inputRef = useRef(null);

  const handleClick = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks){
      const parsedTasks = JSON.parse(savedTasks);
      useStore.setState({tasks: parsedTasks});
    }
  },[]);

  useEffect(() => {
    if (modal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modal]);

  const handleAddTask = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue !== "") {
      addTask("mordecai", inputValue);
      inputRef.current.value = "";
      setModal(false);
    }
  };

  const handleDragStart = (e, taskIndex, sourceColumn) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, destinationColumn) => {
    const taskIndex = e.dataTransfer.getData("taskIndex");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    moveTask(sourceColumn, destinationColumn, parseInt(taskIndex));
  };

  const handleRemoveTask = (taskIndex, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column].splice(taskIndex, 1);
    localStorage.removeItem('tasks', JSON.stringify(updatedTasks));
    useStore.setState({ tasks: updatedTasks });
  };

  const handleTaskChange = (e, index, column) =>{
    console.log(e);
    console.log(index);
    console.log(column);
    const updatedTasks = { ...tasks };
    updatedTasks[column][index] = e.target.value;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    useStore.setState({ tasks: updatedTasks });
    console.log(updatedTasks);
  }

  const handleSvg = () =>{
    setModal(false);
  }

  const renderTasks = (column) =>
    tasks[column].map((task, index) => (
      <div key={index} id={index} draggable onDragStart={(e) => handleDragStart(e, index, column)} className="taskbg m-2 p-2 rounded-sm cursor-pointer bg-white">
        <div className="text-sm font-medium">
        <input className="taskbg" type="text" value={task} onChange={(e) => handleTaskChange(e, index, column)}/>
        </div> 
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs">{new Date().toLocaleString()}</div> 
          <svg onClick={() => handleRemoveTask(index, column)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="1rem" height="1rem"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg> 
        </div>
      </div>
    ));

  return (
    <>
      {modal && (
        <div className="add-task">
          <div className="text-center bg-gray-200 p-6 rounded-xl shadow">
            <div className="mb-2 font-semibold text-xl">Give them a mission.</div>
            <div className="flex justify-center mb-3 shadow-2xl">
              <input className="shadow-lg bg-white" ref={inputRef} type="text"/>
              </div>
              <div className="flex justify-center gap-3">
              <button className="shadow-lg bg-transparent text-black border-black border-2 w-2/4 rounded-md font-semibold p-1" onClick={handleAddTask}>Add Task</button>
              <button onClick={handleSvg} className="hover:shadow-lg text-red-600 bg-transparent border-red-600 border-2 w-2/4 rounded-md font-semibold p-1">Cancel</button>
              </div>
          </div>
        </div>
      )}
      <div onClick={handleClick}>
        <svg
          className="svg"
          width="3rem"
          height="3rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" />
          <path
            d="M12 6V18"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12H18"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex w-max gap-4">
        <div
          className=" w-80 h-auto bg-slate-400 rounded-sm p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "mordecai")}
        >
          <div className="flex justify-left items-center">
            <img src={mordecai} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Mordecai</div>
          </div>
          {renderTasks("mordecai")}
        </div>

        <div
          className="w-80 h-auto bg-amber-600 rounded-sm p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "rigby")}
        >
          <div className=" flex justify-left items-center">
            <img src={rigby} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Rigby</div>
          </div>
          {renderTasks("rigby")}
        </div>

        <div
          className="w-80 h-auto bg-red-500 rounded-sm p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "benson")}
        >
          <div className=" flex justify-left items-center">
            <img src={benson} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Benson</div>
          </div>
          {renderTasks("benson")}
        </div>

        <div
          className="w-80 h-auto bg-cyan-300 rounded-sm p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "done")}
        >
          <div className=" flex justify-left items-center">
            <img src={great} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Great Job</div>
          </div>
          {renderTasks("done")}
        </div>
        
      </div>
    </>
  );
};

export default Board;
