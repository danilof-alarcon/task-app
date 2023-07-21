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
        if (tasksData.length === 0) return(
            <div className="empty-container">
                <h3>What an empty place!</h3>
            </div>
        ) 
    
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

            {isLoading ? (
                <h3>Loading...</h3>
            ) : (
                <div>
                    <div className="menu-container">
                        <h1>Hello {userData.name}</h1>
                        <button onClick={() => navigate("/new")}>New Task</button>
                    </div>

                    {renderMain()}

                </div>
            )}

            <button type="submit" onClick={handleLogOut} className="secondary-button">Log Out</button>
        </div>
    )
}

export default DashboardPage