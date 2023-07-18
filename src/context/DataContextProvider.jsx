import { useContext } from "react";
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

    const auth = pb.authStore.isValid

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

    const getUserDataRequest = async() => {
        pb.autoCancellation(false);
        const record = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
        return record
    }

    const handleLogOutRequest = async() => {
        pb.authStore.clear();
    }

    return (
        <DataContex.Provider value={{ auth, logInRequest, RegisterRequest, getUserDataRequest, handleLogOutRequest }}>
            {children}
        </DataContex.Provider>
    )
}