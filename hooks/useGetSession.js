import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

const useGetSession = () => {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null);
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