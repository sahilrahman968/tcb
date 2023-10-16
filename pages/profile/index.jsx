import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.scss";
import { signIn, signOut } from 'next-auth/react'
import useGetSession from 'hooks/useGetSession';
import Link from 'next/link';
import { useAdminContext } from 'providers/AdminContextProvider';


const Profile = () => {
  const { session, loading } = useGetSession()
  const { admin,setAdmin } = useAdminContext()
  return (
    <div style={{ marginTop: "120px" }}>
      {
        loading ?
          <div>Loading</div> :
          session ?
            <div>
              Profile Page
              {
                admin && <Link href="/admin">go to admin dashboard</Link>
              }
              <div onClick={() => { signOut(); setAdmin(false) }}>Sign out</div>
            </div>
            : <div onClick={() => signIn('google')}>Sign in</div>
      }
    </div>
  )
}

export default Profile