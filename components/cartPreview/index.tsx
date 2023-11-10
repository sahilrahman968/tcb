import React from 'react'
import styles from "../../styles/CartPreview.module.scss"

const CartPreview = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.section_1}>Preview</div>
            <div className={styles.section_2}></div>
        </div>
    </div>
  )
}

export default CartPreview