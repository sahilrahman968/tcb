import React from 'react'
import styles from "../../styles/Navbar.module.scss"
import Image from 'next/image'
import back from "../../assets/back.png"
import { useRouter } from 'next/router'
import LinearLoader from '../loading'

const Header = ({ title,loading }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
      <div className={styles.heading}>
        <Image src={back} width={20} height={20} onClick={() => { router.back(); }} />
        {title}
      </div>
      </div>
      <div className={styles.loading_container}>
      <LinearLoader loading={loading} />
      </div>
    </div>

  )
}

export default Header