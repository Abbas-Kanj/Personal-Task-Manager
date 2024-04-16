import React, { useState } from "react";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const todotasks = [
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

const inprogresstasks = [
  {
    id: 1,
    description: "inprogress 1",
  },
  {
    id: 2,
    description: "inprogress 2",
  },
  {
    id: 3,
    description: "inprogress 3",
  },
];

const donetasks = [
  {
    id: 1,
    description: "done 1",
  },
  {
    id: 2,
    description: "done 2",
  },
  {
    id: 3,
    description: "done 3",
  },
];

const Board = () => {
  const [tasks, updateTasks] = useState(todotasks);
  const [inprogress, updateInprogress] = useState(inprogresstasks);
  const [done, updateDone] = useState(donetasks);

  function handleOnDragEndTodo(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTasks(items);
  }

  function handleOnDragEndInProgress(result) {
    if (!result.destination) return;

    const items = Array.from(inprogress);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateInprogress(items);
  }

  function handleOnDragEndDone(result) {
    if (!result.destination) return;

    const items = Array.from(done);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateDone(items);
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
          <DragDropContext onDragEnd={handleOnDragEndTodo}>
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
                          className="bg-white "
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
          <DragDropContext onDragEnd={handleOnDragEndInProgress}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  className="mg-top bg-blue"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {inprogress.map(({ id, description }, i) => (
                    <Draggable key={id} draggableId={String(id)} index={i}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white "
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
        <div className="done">
          <h3 className="bold medium-font">Done</h3>
          <DragDropContext onDragEnd={handleOnDragEndDone}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  className="mg-top bg-blue"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {done.map(({ id, description }, i) => (
                    <Draggable key={id} draggableId={String(id)} index={i}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white "
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
      </div>
    </div>
  );
};

export default Board;
