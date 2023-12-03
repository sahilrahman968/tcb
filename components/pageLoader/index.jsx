import React from 'react'
import styles from "../../styles/PageLoader.module.scss"
import loading from "../../assets/loading.gif"
import Image from 'next/image'
const PageLoader = () => {
  return (
    <div className={styles.container}>
        <Image src={loading} width={400}/>
    </div>
  )
}

export default PageLoader