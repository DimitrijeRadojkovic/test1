import React from "react";
import { useState, useEffect } from "react";
import ToDo from "./ToDo";
import "./style.css";

export default function App(){
    const [text, setText] = useState("");
    const [toDo, setToDo] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        setToDo(value =>  [...value, <ToDo key={Math.floor(Math.random() * 256)} text={text} bg={`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`} />]);
    }

    return (
        <main>
            <div id="container">
                {
                    toDo.map(x => x)
                }
            </div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" onInput={e => {setText(e.target.value)}} />
                <input type="submit" value="Napravi" />
            </form>
        </main>
    )
}