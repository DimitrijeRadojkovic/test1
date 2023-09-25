import React from "react";
import { useState, useEffect, createContext } from "react";
import ToDo from "./ToDo";
import "./style.css";

const ToDoContext = createContext();

let i = 0;

function App(){
    const [text, setText] = useState("");
    const [toDo, setToDo] = useState([]);


    const onSubmitHandler = e => {
        e.preventDefault();
        const newTask = {
                id: i++,
                key: Math.floor(Math.random() * 256),
                text: text,
                bg:`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        }
        setToDo(value =>  [...value, newTask]);
    }

    return (
        <main>
            <ToDoContext.Provider value={{toDo, setToDo}}>
                <div id="container">
                    {
                        toDo.map(x => {
                            
                            return <ToDo
                                key={x.key}
                                id={x.id}
                                text={x.text}
                                bg={x.bg}
                                className="container_todo"
                            />
                        })
                    }
                </div>
            </ToDoContext.Provider>
            <form onSubmit={onSubmitHandler}>
                <input type="text" onInput={e => {setText(e.target.value)}} />
                <input type="submit" value="Napravi" />
            </form>
        </main>
    )
}

export {
    App,
    ToDoContext
}