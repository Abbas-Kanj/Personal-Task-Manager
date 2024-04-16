import React, { useState } from "react";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const taskContent = [
  {
    id: 1,
    description: "todo 1",
  },
  {
    id: 2,
    description: "todo 2",
  },
  {
    id: 3,
    description: "todo 3",
  },
];

const Board = () => {
  const [tasks, updateTasks] = useState(taskContent);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTasks(items);
  }
  return (
    <div className="flex column center">
      <div className="flex column center add-tasks">
        <h3 className="bold">Add Task</h3>
        <input type="text" name="" id="" placeholder="...." />
      </div>
      <div className="flex justify-evenly p container">
        <div className="todo">
          <h3 className="bold medium-font">Todos</h3>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  className="mg-top bg-blue"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map(({ id, description }, i) => (
                    <Draggable key={id} draggableId={String(id)} index={i}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {description}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
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
