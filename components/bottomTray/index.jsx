import React from 'react'
import styles from "../../styles/BottomTray.module.scss"

const BottomTray = ({ children, bg }) => {
  return (
    bg ?
      <div className={styles.tray_bg}>
        <div className={styles.tray_container}>
          {children}
        </div>
      </div> :
      <div className={styles.tray_container}>
        {children}
      </div>
  )
}

export default BottomTray