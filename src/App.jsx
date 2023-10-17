import React from "react";
import { useState, useEffect, createContext } from "react";
import ToDo from "./ToDo";
import "./style.css";

const ToDoContext = createContext();

let i = 0;

function App(){
    const [text, setText] = useState("");
    const [toDo, setToDo] = useState([]);


    const onSubmitHandler = async(e) => {
        e.preventDefault();
        

        const res = await fetch("http://www.test1baza.com/newTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "text= " + text
        });
        i++;
        const json = await res.json();
        console.log(json);
        if(json.ok){
            const newTask = {
                id: i++,
                key: toDo.length,
                text: text,
                bg:`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            }
            setToDo(value =>  [...value, newTask]);
        }
    }

    const addNote = (newTask) => {
        setToDo(value =>  [...value, newTask]);
    }   
        
    const getNotes = async () => {
        const res = await fetch("http://www.test1baza.com/getTasks.php");
        const json = await res.json();
        console.log(json);
        for(let i = 0; i < json.length; i++){
            addNote({
                id: json[i].id,
                key: i,
                text: json[i].text,
                bg:`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            });
        }
    }

    useEffect(() => {getNotes()}, []);

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
    ToDoContext,
    
}