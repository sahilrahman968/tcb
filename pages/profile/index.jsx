import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.scss";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { useAdminContext } from 'providers/AdminContextProvider';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Image from 'next/image';


const Profile = () => {
  const { status, data: session } = useSession()
  const { admin, setAdmin } = useAdminContext()
  return (
    <div className={styles.container}>
      <Header title="Profile"/>
      {/* {
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
      } */}
      <div className={styles.section}>
        <Image className={styles.profile_image} src={session?.user?.image} width={50} height={50} style={{borderRadius:"50%"}}/>
        <div className={styles.name}>{session?.user?.name}</div>
        <div className={styles.email}>{session?.user?.email}</div>
      </div>
      <div className={styles.heading}>Your Order/s</div>
      <div className={styles.section}>
          
      </div>
      <div className={styles.heading}>Addresses</div>
      <div className={styles.section}>

      </div>
      <Footer />
    </div>
  )
}

export default Profile