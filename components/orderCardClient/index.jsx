import React, { useState } from 'react'
import styles from "../../styles/OrderCardClient.module.scss"
import Image from 'next/image'
import down from "../../assets/down.png"

const OrderCardClient = ({ orderDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.section_1}>
                <div className={styles.header}>
                    <div className={styles.heading}>
                        <div>November 26</div>
                        <i>(Delivery)</i>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.indicator}></div>
                        <div className={styles.status_text}>Pending</div>
                    </div>
                </div>
            </div>
            <div className={styles.section_2}>
                <div className={styles.content}>
                    <div>November 26, 2:43pm</div>
                    <i>(Placed on)</i>
                </div>
                <div className={styles.show_more_cta} onClick={() => setShowDetails(prev => !prev)}>
                    Show Order Details <Image src={down} height={10} width={10} />
                </div>
            </div>
            {
                showDetails &&
                <>
                    <div className={styles.section_3}>
                        <>
                            <div className={styles.heading}>Sl. No.</div>
                            <div className={styles.heading}>Item</div>
                            <div className={styles.heading}>Price</div>
                            <div className={styles.heading}>Qty.</div>
                            <div className={styles.heading}>Total</div>
                        </>
                        {
                            [1, 2, 3, 4, 5]?.map(() => {
                                return (
                                    <>
                                        <div>1.</div>
                                        <div>Shawarma Roll</div>
                                        <div>Rs. 250</div>
                                        <div>3</div>
                                        <div>Rs.{250 * 3}</div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className={styles.section_4}>
                        <div></div>
                        <div className={styles.content}>
                            <div>Total:</div>
                            <div>Rs.1090</div>
                        </div>
                    </div>
                    <div className={styles.section_5}>
                        <div className={styles.cta}>CALL TCB</div>
                        <div className={styles.cta}>RATE ORDER</div>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderCardClient