import React from 'react'
import BottomTray from '../bottomTray'
import styles from "../../styles/LoginTray.module.scss"
import login from "../../assets/login.jpg"
import Image from 'next/image'
import google from "../../assets/google_login.png"
import { signIn,useSession } from 'next-auth/react'
const LoginTray = ({setLoginTray}) => {
  const { data: session } = useSession();
  return (
    <BottomTray bg={true}>
        <div className={styles.login_tray_container}>
            <div className={styles.image_container}>
               <Image src={login} width={200}/> 
            </div>
            <div className={styles.login_cta} onClick={() => { if (!session) { signIn('google') } }}>
                <Image src={google}/>
            </div>
            <div className={styles.skip_cta} onClick={()=>{setLoginTray(false)}}>
                Skip for now
            </div>
        </div>
    </BottomTray>
  )
}

export default LoginTray