import { createContext, useState, useEffect } from "react";
import AxiosConfig from "../api/AxiosConfig";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await AxiosConfig.get('/api/user')
            if (response && response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>
    )
}

export default UserContext;