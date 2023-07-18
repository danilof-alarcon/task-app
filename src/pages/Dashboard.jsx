import "./styles/Dashboard.css"
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";

function DashboardPage() {

    // Auth

    const { auth, getUserDataRequest, handleLogOutRequest } = useData()
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

    const [userData, setUserData] = useState('');

    useEffect(() => {
        getUserDataRequest().then(userData => {
          setUserData(userData);
        });
    }, []);

    async function handleLogOut() {
        await handleLogOutRequest()
        window.location.reload()
    }

    return(
        <div className="dashboard-container">
            <h1>Dashboard Page</h1>
            <p>👋 Hello {userData.name}</p>
            <button type="submit" onClick={handleLogOut} className="secondary-button">Log Out</button>
        </div>
    )
}

export default DashboardPage