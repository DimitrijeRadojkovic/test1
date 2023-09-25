import { useContext, useRef } from "react";
import { ToDoContext } from "./App";

const ToDo = ({id, text, bg}) => {
    const {toDo, setToDo} = useContext(ToDoContext);

    const deleteHandler = () => {
        const updatedToDo = toDo.filter(x => x.id !== id);
        setToDo(updatedToDo);
        console.log(toDo);
    }

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        e.dataTransfer.setData("text/plain", id.toString());
    };

    const dragEnter = (e, position) => {
        e.preventDefault();
    };

    const drop = (e) => {
        e.preventDefault();
        const dragItemId = e.dataTransfer.getData("text/plain");
        const dragItemIndex = parseInt(dragItemId, 10);
        const updatedToDo = [...toDo];
        const [draggedItem] = updatedToDo.splice(dragItemIndex, 1);
        updatedToDo.splice(id, 0, draggedItem);
        setToDo(updatedToDo);
    };

    return (
        <div onDragStart={(e) => dragStart(e, id)} onDragEnter={(e) => dragEnter(e, id)} onDragEnd={drop}  style={{backgroundColor: bg}} id={id} draggable>
            <p>{text}</p>
            <button onClick={deleteHandler}>Obrisi</button>
        </div>
    )
}

export default ToDo;