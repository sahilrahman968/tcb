import React from 'react'
import styles from "../../styles/BottomTray.module.scss"

const BottomTray = ({children}) => {
  return (
    <div className={styles.tray_container}>
      {children}
    </div>
  )
}

export default BottomTray