import { useNavigate } from "react-router-dom"
import { useData } from "../context/DataContextProvider"

function TaskCard( {task} ) {

    const navigate = useNavigate()
    const { deleteTaskRequest, toggleDoneRequest } = useData()

    return(
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
            <button onClick={() => {deleteTaskRequest(task.id)}}>Delete</button>
            <button onClick={() => {toggleDoneRequest(task.done, task.id)}}>{task.done == 1 ? "true" : "false"}</button>
        </div>
    )
}

export default TaskCard