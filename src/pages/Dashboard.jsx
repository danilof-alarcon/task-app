import "./styles/Dashboard.css"
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

function DashboardPage() {

    // Auth

    const { auth, userData, tasksData, getUserDataRequest, handleLogOutRequest, loadTasksRequest } = useData()
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

    const [isLoading, setIsLoading] = useState(Boolean(tasksData));

    useEffect(() => {
        if(tasksData) {
            const fetchData = async() => {
                await getUserDataRequest();
                await loadTasksRequest();
                setIsLoading(false);
            }

            fetchData();
        }
    }, [])

    function renderMain() {
        if (tasksData.length === 0) return <h3>No tasks yet...</h3>
    
        return tasksData.map( task => (
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

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Hello {userData.name}</p>
                    <a href="/new">New Task</a>

                    {renderMain()}
                </div>
            )}

            <button type="submit" onClick={handleLogOut} className="secondary-button">Log Out</button>
        </div>
    )
}

export default DashboardPage