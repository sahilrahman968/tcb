import React from 'react'
import styles from "../../styles/Navbar.module.scss"
import Image from 'next/image'
import back from "../../assets/back.png"
import { useRouter } from 'next/router'

const Header = ({title}) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
          <Image src={back} width={20} height={20} onClick={()=>{router.back();}}/>
          {title}
      </div>
    </div>
  )
}

export default Header