import React, { useState } from 'react'
import styles from "../../styles/OrderCardClient.module.scss"
import Image from 'next/image'
import down from "../../assets/down.png"
import orderStatusConstants from '../../constants/orderStatusConstants'
import { updateOrderStatus } from '../../apiConsumers/order'

const OrderCardClient = ({ orderDetails, getOrders, isAdmin }) => {
    const [showDetails, setShowDetails] = useState(false);
    const updateStatusHandler = async (orderId, id) => {
        try {
            await updateOrderStatus({ orderId: orderId, statusId: id });
            getOrders()
        }
        catch (err) {

        }
    }
    console.log("isAdminisAdmin", isAdmin)
    return (
        <div className={styles.container} style={{ borderBottom: showDetails ? "2px solid gray" : "" }}>
            <div className={styles.section_1}>
                <div className={styles.header}>
                    <div className={styles.heading}>
                        <div>{orderDetails?.delivery_on}</div>
                        <i>(Delivery)</i>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.indicator} style={{ backgroundColor: orderStatusConstants?.[orderDetails?.status_id]?.status_colour }}></div>
                        <div className={styles.status_text}>{orderStatusConstants?.[orderDetails?.status_id]?.status_name}</div>
                    </div>
                </div>
            </div>
            <div className={styles.section_2}>
                <div className={styles.content}>
                    <div>{orderDetails?.placed_on}</div>
                    <i>(Placed on)</i>
                </div>
                <div className={styles.show_more_cta} onClick={() => setShowDetails(prev => !prev)}>
                    {!showDetails ? "Show" : "Hide"} Order Details <Image src={down} height={10} width={10} />
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
                            orderDetails?.products?.map((product, index) => {
                                return (
                                    <React.Fragment key={product?._id}>
                                        <div>{index + 1}.</div>
                                        <div>{product?.title}</div>
                                        <div>Rs. {product?.price}</div>
                                        <div>{product?.count}</div>
                                        <div>Rs.{product?.price * product?.count}</div>
                                    </React.Fragment>
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
                    {
                        isAdmin &&
                        <div>
                            <strong>Client Info:</strong>
                            <div><strong>USERID:</strong>{orderDetails?.user_id}</div>
                            <div><strong>NAME:</strong>{orderDetails?.user_name}</div>
                            <div><strong>NUMBER:</strong>{orderDetails?.user_number}</div>
                            <div><strong>EMAIL:</strong>{orderDetails?.user_email}</div>
                        </div>
                    }

                    {
                        orderDetails?.status_id === 1 && orderDetails?.isAdmin &&
                        <div className={styles.section_5}>
                            <div className={styles.cta} onClick={() => updateStatusHandler(orderDetails?._id, 2)}>ACCEPT</div>
                            <div className={styles.cta} onClick={() => updateStatusHandler(orderDetails?._id, 5)}>REJECT</div>
                        </div>
                    }
                    {
                        orderDetails?.status_id === 1 && !orderDetails?.isAdmin &&
                        <div className={styles.section_5}>
                            <div className={styles.cta}>Call TCB</div>
                            <div className={styles.cta} onClick={() => updateStatusHandler(orderDetails?._id, 6)}>Cancel Order</div>
                        </div>
                    }
                    {/* {
                        orderDetails?.status_id === 2 && orderDetails?.isAdmin &&
                        <div className={styles.section_5}>
                            <div className={styles.cta}>Call TCB</div>
                            <div className={styles.cta} onClick={() => updateStatusHandler(orderDetails?._id, 3)}>Proceed To Pay</div>
                        </div>
                    } */}
                    {
                        orderDetails?.status_id === 2 && !orderDetails?.isAdmin &&
                        <div className={styles.section_5}>
                            <div className={styles.cta}>Call TCB</div>
                            <div className={styles.cta} onClick={() => updateStatusHandler(orderDetails?._id, 3)}>Proceed To Pay</div>
                        </div>
                    }

                </>
            }
        </div>
    )
}

export default OrderCardClient