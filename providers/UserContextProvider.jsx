import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { searchUsers } from '../apiConsumers/user';

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
    const { data: session } = useSession()
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getUserData = async () => {
            if (session?.user) {
                const userData = await searchUsers({ email: session?.user?.email })
                if (userData?.length)
                    setUserData(userData?.[0])
                else
                    setUserData(null)
            }
            else {
                setUserData(null)
            }
        }
        getUserData()
    }, [session?.user])
    return (
        <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
    )
}

export const useUserContext = () => {
    const { userData, setUserData } = useContext(UserContext);
    console.log("USER>>>>",userData)
    return { userData, setUserData }
}

export default UserContextProvider
