const ToDo = ({text, bg}) => {
    return (
        <div className="container_todo" style={{backgroundColor: bg}}>
            <p>{text}</p>
        </div>
    )
}

export default ToDo;