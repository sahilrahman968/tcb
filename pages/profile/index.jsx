import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.scss";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { useAdminContext } from 'providers/AdminContextProvider';
import Footer from '../../components/footer';


const Profile = () => {
  const { status, data: session } = useSession()
  const { admin, setAdmin } = useAdminContext()
  return (
    <div style={{ marginTop: "120px" }}>
      {
        status === "loading" ?
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
      <Footer />
    </div>
  )
}

export default Profile