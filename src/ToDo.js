import { useContext, useRef,  useState } from "react";
import { ToDoContext } from "./App";

const ToDo = ({id, text, bg}) => {
    const {toDo, setToDo} = useContext(ToDoContext);
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const deleteHandler = async () => {
        console.log("id koji se brise: " + id);
        const res = await fetch("http://www.test1baza.com/deleteTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=" + id
        });
        const json = await res.json();
        if(json.result){
            console.log("uspesno obrisano");
            const updatedToDo = toDo.filter(x => x.id !== id);
            setToDo(updatedToDo);
        }
        else{
            console.log("greska pri brisanju");
        }
    }

    const editHandler = () => {
        setEditing(true);
    };

    const saveEditHandler = async () => {
        const updatedToDo = toDo.map(item =>
            item.id === id ? { ...item, text: editedText } : item
        );
        setToDo(updatedToDo);

        const res = await fetch("http://www.test1baza.com/editTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=" + id + "&text=" + text
        });
        const json = await res.json();
        console.log(json);

        setEditing(false);
    };

    const cancelEditHandler = () => {
        setEditing(false);
    };

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
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={saveEditHandler}>Sacuvaj</button>
                    <button onClick={cancelEditHandler}>Otkazi</button>
                </>
            ) : (
                <>
                    <p>{text}</p>
                    <button onClick={editHandler}>Izmeni</button>
                    <button onClick={async () => {await deleteHandler()}}>Obrisi</button>
                </>
            )}
        </div>
    )
}

export default ToDo;