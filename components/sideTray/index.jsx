import React from 'react'
import styles from "../../styles/SideTray.module.scss"
import { useState } from 'react'

const SideTray = (props) => {
  const {top,children,side,triggerText} = props
  const [open,setOpen] = useState(false);  
  return (
    <div className={styles.sideTray_container} style={{top,right: side === "right" ? "0":null,left: side === "left" ? "0":null }}>
        <div className={styles.trigger} onClick={()=>{setOpen(prev=>!prev)}}>
            <div className={styles.triggerText}>
                {
            triggerText?.split(" ")?.reverse()?.map((letter,index)=>{
                return <span className={styles.letter} key={index}>{letter}</span>
            })
            }
            </div>
        </div>
        <div className={styles.content_area} style={{width:open?"200px":"0px"}}>
        {
            children
        }
        </div>
    </div>
  )
}

export default SideTray