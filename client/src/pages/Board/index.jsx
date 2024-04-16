import React, { useState } from "react";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const columnsFromBackend = {
  todos: {
    title: "Todos",
    items: [
      { id: "1", content: "todo 1" },
      { id: "2", content: "todo 2" },
      { id: "3", content: "todo 3" },
    ],
  },
  inprogress: {
    title: "In Progress",
    items: [],
  },
  done: {
    title: "Done",
    items: [],
  },
};

const Board = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newItems = Array.from(start.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      const newColumn = {
        ...start,
        items: newItems,
      };

      setColumns({
        ...columns,
        [newColumn.title.toLowerCase()]: newColumn,
      });
    } else {
      const startItems = Array.from(start.items);
      const [removed] = startItems.splice(source.index, 1);
      const newStart = {
        ...start,
        items: startItems,
      };

      const finishItems = Array.from(finish.items);
      finishItems.splice(destination.index, 0, removed);
      const newFinish = {
        ...finish,
        items: finishItems,
      };

      setColumns({
        ...columns,
        [newStart.title.toLowerCase()]: newStart,
        [newFinish.title.toLowerCase()]: newFinish,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex column center">
        <div className="flex column center add-tasks">
          <h3 className="bold">Add Task</h3>
          <input type="text" name="" id="" placeholder="...." />
        </div>
        <div className="flex container">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="flex p column" key={columnId}>
              <div className={columnId}>
                <h3 className="bold medium-font">{column.title}</h3>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <ul
                      className="mg-top bg-blue"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {column.items.map(({ id, content }, i) => (
                        <Draggable key={id} draggableId={id} index={i}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white"
                            >
                              {content}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
