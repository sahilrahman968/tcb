import React, { useContext, useState } from 'react'

const adminContext = React.createContext(null);
const AdminContextProvider = ({ children }) => {
    const [admin,setAdmin] = useState(false);
    return (
        <adminContext.Provider value={{admin,setAdmin}}>
            {children}
        </adminContext.Provider>
    )
}

export const useAdminContext = () => {
    const {admin,setAdmin} = useContext(adminContext);
    return {admin,setAdmin}
}

export default AdminContextProvider