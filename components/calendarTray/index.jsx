import React from 'react'
import styles from "../../styles/CalendarTray.module.scss"
import BottomTray from '../bottomTray'
import Calendar from '../calendar/Calendar'
const CalendarTray = ({closeTray}) => {
  return (
    <BottomTray bg={true} close={true}  closeHandler={()=>{closeTray()}}>
        <div className={styles.calendarTray_container}>
            <Calendar />
        </div>
    </BottomTray>
  )
}

export default CalendarTray