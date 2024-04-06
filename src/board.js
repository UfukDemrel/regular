import React, { useEffect, useRef, useState } from "react";
import mordecai from "./images/mordecai.png";
import rigby from "./images/rigby.png";
import benson from "./images/benson.png";
import pops from "./images/pops.png";
import skips from "./images/skips.png";
import muscleman from "./images/kasadam.png";
import highfive from "./images/cakbeslik.png";
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

  const handleAddTask = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      addTask("mordecai", e.target.value.trim());
      e.target.value = "";
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
      <div key={index} id={index} draggable onDragStart={(e) => handleDragStart(e, index, column)} className="taskbg m-2 p-2 rounded-md cursor-pointer">
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
          <div className="text-center bg-gray-400 p-6 rounded-xl shadow">
          <svg onClick={handleSvg} className="cursor-pointer flex justify-end text-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="1rem" height="1rem"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg> 
            <img className="w-60" src="https://upload.wikimedia.org/wikipedia/tr/6/61/Regular_Show.png" alt="alt" />
            <div className="mb-2 font-semibold text-xl">Give them a mission.</div>
            <input
              className="shadow bg-transparent"
              ref={inputRef}
              type="text"
              onKeyDown={handleAddTask}
            />
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

      <div className="flex gap-4 w-full flex-wrap justify-center">
        <div
          className="w-80 h-auto bg-slate-400 rounded-md p-2 shadow"
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
          className="w-80 h-auto bg-amber-600 rounded-md p-2 shadow"
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
          className="w-80 h-auto bg-red-500 rounded-md p-2 shadow"
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
          className="w-80 h-auto bg-rose-300 rounded-md p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pops")}
        >
          <div className=" flex justify-left items-center">
            <img src={pops} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Pops</div>
          </div>
          {renderTasks("pops")}
        </div>

        <div
          className="w-80 h-auto bg-cyan-400 rounded-md p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "skips")}
        >
          <div className=" flex justify-left items-center">
            <img src={skips} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Skips</div>
          </div>
          {renderTasks("skips")}
        </div>

        <div
          className="w-80 h-auto bg-lime-300 rounded-md p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "muscleman")}
        >
          <div className=" flex justify-left items-center">
            <img src={muscleman} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">Muscle man</div>
          </div>
          {renderTasks("muscleman")}
        </div>

        <div
          className="w-80 h-auto bg-slate-300 rounded-md p-2 shadow"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "highfive")}
        >
          <div className=" flex justify-left items-center">
            <img src={highfive} className=" w-14 rounded-full" alt="alt" />
            <div className="font-semibold ml-2">High Five</div>
          </div>
          {renderTasks("highfive")}
        </div>

        <div
          className="w-80 h-auto bg-cyan-300 rounded-md p-2 shadow"
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
