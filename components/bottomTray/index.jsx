import React from 'react'
import styles from "../../styles/BottomTray.module.scss"
import clear from "../../assets/close.svg"
import Image from 'next/image'

const BottomTray = ({ children, bg,close,closeHandler }) => {
  return (
    bg ?
      <div className={styles.tray_bg}>
        <div className={styles.tray_container}>
          {children}
          {
            close &&
            <div className={styles.image_container} onClick={closeHandler}>
            <Image src={clear} />
          </div>
          }
          
        </div>
      </div> :
      <div className={styles.tray_container}>
        {children}
      </div>
  )
}

export default BottomTray