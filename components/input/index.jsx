import React from 'react'
import styles from '../../styles/Input.module.scss'
import Image from 'next/image'
import clear from "../../assets/clear.png"
const Input = () => {
  return (
    <>
    <div className={styles.input_container}>
        <input/>
        <Image src={clear} alt="clear search" width={14} height={14}/>
    </div>
    <div>
      <Image/>
    </div>
    </>
  )
}

export default Input