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
    const [tasksData, setTasksData] = useState([])
    const [oneTaskData, setOneTaskData] = useState([])

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
        setTasksData(taskData)
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

    const loadOneTaskRequest = async(id) => {
        pb.autoCancellation(false);

        const record = await pb.collection('tasks').getOne(id);
        setOneTaskData(record)
    }

    const updateTaskRequest = async(id, title, description) => {
        pb.autoCancellation(false);

        const data = {
            "title": title,
            "description": description,
        };
        
        const record = await pb.collection('tasks').update(id, data);
        return record
    }

    const deleteTaskRequest = async(id) => {
        pb.autoCancellation(false);

        await pb.collection('tasks').delete(id);
        
        setTasksData(tasksData.filter(task => task.id !== id))
    }

    const toggleDoneRequest = async(value, id) => {
        pb.autoCancellation(false);

        const data = {
            "done": !value
        };
        
        await pb.collection('tasks').update(id, data);

        setTasksData(
            tasksData.map((task) => task.id == id ? { ... task, done: !task.done} : task)
        )
    }

    return (
        <DataContex.Provider value={{ auth, userData, tasksData, oneTaskData, logInRequest, RegisterRequest, getUserDataRequest, handleLogOutRequest, loadTasksRequest, createTaskRequest, loadOneTaskRequest, updateTaskRequest, deleteTaskRequest, toggleDoneRequest }}>
            {children}
        </DataContex.Provider>
    )
}