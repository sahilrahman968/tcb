import React from 'react'
import styles from "../../styles/Navbar.module.scss"

const Header = ({title}) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
          {title}
      </div>
    </div>
  )
}

export default Header