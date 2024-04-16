import React from "react";
import "./style.css";

const Board = () => {
  return (
    <div className="flex column center">
      <div className="flex column center add-tasks">
        <h3 className="bold">Add Task</h3>
        <input type="text" name="" id="" placeholder="...." />
      </div>
      <div className="flex justify-evenly p container">
        <div className="todo">
          <h3 className="bold medium-font">Todos</h3>
          <ul className="mg-top bg-blue">
            <li>TODO 1</li>
            <li>TODO 1</li>
            <li>TODO 1</li>
          </ul>
        </div>
        <div className=" in-prog">
          <h3 className="bold medium-font">In Progress</h3>
          <ul className="mg-top bg-blue">
            <li>In Progress 1</li>
            <li>In Progress 1</li>
            <li>In Progress 1</li>
          </ul>
        </div>
        <div className="done">
          <h3 className="bold medium-font">Done</h3>
          <ul className="mg-top bg-blue">
            <li>Done 1</li>
            <li>Done 1</li>
            <li>Done 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Board;
