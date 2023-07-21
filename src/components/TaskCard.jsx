import "./TaskCard.css"
import { useNavigate } from "react-router-dom"
import { useData } from "../context/DataContextProvider"
import { AiOutlineCheckSquare, AiOutlineBorder, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";


function TaskCard( {task} ) {

    const navigate = useNavigate()
    const { deleteTaskRequest, toggleDoneRequest } = useData()

    return(
        <div className="task-container">
            <button className="toggle-button" onClick={() => {toggleDoneRequest(task.done, task.id)}}>{task.done == 1 ? <AiOutlineCheckSquare /> : <AiOutlineBorder />}</button>
            <div className="task-info-container">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>
            <button onClick={() => navigate(`/edit/${task.id}`)} className="action-button edit"><AiTwotoneEdit /></button>
            <div className="button-separator"></div>
            <button onClick={() => {deleteTaskRequest(task.id)}} className="action-button delete"><AiFillDelete /></button>
        </div>
    )
}

export default TaskCard