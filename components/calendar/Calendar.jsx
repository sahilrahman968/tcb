import React from 'react'
import styles from "../../styles/Calendar.module.scss"
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
    const selectedDate = "115January"

    const checkSelected = (x, y, month) => {
        return selectedDate === (x + "" + y + month)
    }


    const checkBooked = (x, y, month) => {
        return bookedDates?.includes(x + "" + y + month);
    }
    return (
        <div className={styles.calendar_container}>
            {
                new Array(12).fill("").map((_, x) => {
                    if ((x + 1) === 1 || (x + 1) === 3 || (x + 1) === 5 || (x + 1) === 7 || (x + 1) === 8 || (x + 1) === 10 || (x + 1) === 12) {
                        return <div className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(31).fill("").map((_, y) => {
                                        return <div
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "green", color: "#FFF" } : {}}
                                        >
                                            {y + 1}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    else if ((x + 1) === 4 || (x + 1) === 6 || (x + 1) === 9 || (x + 1) === 11) {
                        return <div className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(30).fill("").map((_, y) => {
                                        return <div
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "green", color: "#FFF" } : {}}
                                        >
                                            {y + 1}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    else if ((x + 1) === 2) {
                        return <div className={styles.month_container}>
                            <div className={styles.month}>{getMonth(x + 1)}</div>
                            <div className={styles.dates_container}>
                                {
                                    new Array(28).fill("").map((_, y) => {
                                        return <div
                                            className={styles.date}
                                            style={checkBooked((x + 1), (y + 1), getMonth(x + 1)) ? {
                                                background: "#ddd"
                                            } : checkSelected((x + 1), (y + 1), getMonth(x + 1)) ? { background: "green", color: "#FFF" } : {}}
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