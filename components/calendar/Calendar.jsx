import React, { useState } from 'react'
import styles from "../../styles/Calendar.module.scss"

const currentDate = new Date();
const year = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const Calendar = () => {
    const getMonth = (month) => {
        switch (month) {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        }
    }

    const bookedDates = ["13January", "114November", "220February"]
    const [selectedDate, setSelectedDate] = useState("")

    const selectDate = (x, y, month) => {
        setSelectedDate(x + "" + y + month)
    }
    const clickHandler = (x, y, month) => {
        if (checkBooked((x), (y), getMonth(x))){
            return
        }
        selectDate(x, y, month)
    }

    const checkSelected = (x, y, month) => {
        return selectedDate === (x + "" + y + month)
    }

    const checkBooked = (x, y, month) => {
        if (x < currentMonth)
            return true
        else if (y - 1 <= currentDay && x <= currentMonth)
            return true
        return bookedDates?.includes(x + "" + y + month);
    }
    return (
        <div className={styles.calendar_container}>
            {
                new Array(12).fill("").map((_, x) => {
                    if ((x + 1) === 1 || (x + 1) === 3 || (x + 1) === 5 || (x + 1) === 7 || (x + 1) === 8 || (x + 1) === 10 || (x + 1) === 12) {
                        return <div key={x} className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(31).fill("").map((_, y) => {
                                        return <div
                                            onClick={() => clickHandler((x + 1), (y + 1), getMonth(x + 1))}
                                            key={y}
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "rgb(27, 166, 114)", color: "#FFF" } : {}}
                                        >
                                            {y + 1}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    else if ((x + 1) === 4 || (x + 1) === 6 || (x + 1) === 9 || (x + 1) === 11) {
                        return <div key={x} className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(30).fill("").map((_, y) => {
                                        return <div
                                            onClick={() => clickHandler((x + 1), (y + 1), getMonth(x + 1))}
                                            key={y}
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "rgb(27, 166, 114)", color: "#FFF" } : {}}
                                        >
                                            {y + 1}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    else if ((x + 1) === 2) {
                        return <div key={x} className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(28).fill("").map((_, y) => {
                                        return <div
                                            onClick={() => clickHandler((x + 1), (y + 1), getMonth(x + 1))}
                                            key={y}
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "rgb(27, 166, 114)", color: "#FFF" } : {}}
                                        >
                                            {y + 1}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default Calendar