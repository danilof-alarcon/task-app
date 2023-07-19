import { useContext, useState } from "react";
import { DataContex } from "./DataContext";
import { pb } from "../lib/pocketbase.api";

export const useData = () => {
    const context = useContext(DataContex)
    if (!context) {
        throw new Error("useTasks must be used within a TaskContextProvider");
    }
    return context;
}

export const DataContextProvider = ({children}) => {

    // Auth Functions

    const auth = pb.authStore.isValid
    const [userData, setUserData] = useState([])
    const [taskData, setTaskData] = useState([])

    const logInRequest = async(email, password) => {
        const authData = await pb.collection('users').authWithPassword(`${email}`, `${password}`);
        return authData
    }

    const RegisterRequest = async(name, email, password) => {
        const data = {
            "username": "",
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": password,
            "name": name
        };
    
        const createUser = await pb.collection('users').create(data);
        const logUser = await logInRequest(email, password)
        return (createUser, logUser);
    }

    const handleLogOutRequest = async() => {
        pb.authStore.clear();
    }

    // App Functions

    const getUserDataRequest = async() => {
        pb.autoCancellation(false);

        const userData = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
        setUserData(userData)
    }

    const loadTasksRequest = async() => {
        pb.autoCancellation(false);
        
        const taskData = await pb.collection('tasks').getFullList({
            filter: `user="${pb.authStore.model.id}"`,
            sort: '-created'
        });
        setTaskData(taskData)
    }

    const createTaskRequest = async(title, description) => {
        const data = {
            "title": title,
            "description": description,
            "done": false,
            "user": pb.authStore.model.id
        };
        
        const record = await pb.collection('tasks').create(data);
        return record
    }

    return (
        <DataContex.Provider value={{ auth, userData, taskData, logInRequest, RegisterRequest, getUserDataRequest, handleLogOutRequest, loadTasksRequest, createTaskRequest }}>
            {children}
        </DataContex.Provider>
    )
}