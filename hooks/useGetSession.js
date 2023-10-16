import { getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

const useGetSession = () => {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null);
    // const {loading,session} = useSession()
    useEffect(() => {
        const checkSession = async () => {
            try {
                setLoading(true);
                const session = await getSession()
                setSession(session)
                setLoading(false)
            }
            catch (err) {
                setLoading(false);
            }
        }

        checkSession();
    }, [])
    return { loading, session }
}

export default useGetSession