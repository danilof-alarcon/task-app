import "./styles/Dashboard.css"
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";

function DashboardPage() {

    // Auth
    const { auth, userData, taskData, getUserDataRequest, handleLogOutRequest, loadTasksRequest } = useData()
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    if (!auth) {
        return null;
    }

    // Code

    useEffect(() => {
        getUserDataRequest();
        loadTasksRequest();
    }, []);

    function renderMain() {
        if (taskData.length === 0) return <h3>No hay tareas aún...</h3>
    
        return taskData.map( task => (
            <TaskCard task={task} key={task.id}/>
        )) 
    }

    async function handleLogOut() {
        await handleLogOutRequest()
        window.location.reload()
    }

    return(
        <div className="dashboard-container">
            <h1>Dashboard Page</h1>
            <p>👋 Hello {userData.name}</p>
            <br />

            {renderMain()}

            <br />
            <button type="submit" onClick={handleLogOut} className="secondary-button">Log Out</button>
        </div>
    )
}

export default DashboardPage