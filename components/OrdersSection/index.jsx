import React, { useEffect, useState } from 'react'
import styles from "../../styles/OrdersSection.module.scss"
import { fetchOrders, updateOrderStatus } from '../../apiConsumers/order';
import { Button, Collapse } from 'antd';
import Image from 'next/image';
import OrderCardClient from '../orderCardClient';
import orderStatusConstants from '../../constants/orderStatusConstants';

const OrderDetails = ({order,gettOrders,setOrders}) => {
    const updateStatusHandler =async (id) => {
        try{
            await updateOrderStatus({orderId:order?._id,statusId:id});
            gettOrders()
        }
        catch(err){

        }
    }

    const getOrders = async () => {
        if (userData?._id) {
          try {
            setOrdersLoading(true)
            const response = await fetchOrders({ userId: userData?._id })
            if (response?.data?.length) {
              setOrders(response?.data);
            }
            setOrdersLoading(false)
          }
          catch (err) {
            setOrdersLoading(false)
          }
        }
        else {
          setOrders([]);
        }
      }
    // return <div className={styles.detailsContainer}>
    //     <div className={styles.row_1}>
    //         <div className={styles.col_1}>
    //             <div>status:{order?.status_id}</div>
    //             {
    //                 order?.status_id == 1 && 
    //                 <div>
    //                     <Button onClick={async ()=>{updateStatusHandler(2)}}>Accept</Button>
    //                     <Button onClick={async ()=>{updateStatusHandler(5)}}>Reject</Button>
    //                 </div>
    //             }
    //         </div>
    //         <div className={styles.col_2}></div>
    //     </div>
    //     <div className={styles.row_2}>
    //         <div className={styles.section_heading}>**** Items ****</div>
    //         <div className={styles.products_container}>
    //             {
    //                 order?.products?.map((product,index)=>{
    //                     return <div className={styles.product_container} key={product?._id}>
    //                         <div>{index+1}</div>
    //                         <Image src={product?.image} width={40} height={40}/>
    //                         <div>{product?.title}</div>
    //                         <div>{product?.count} x ₹{product?.price}</div>
    //                         <div>₹{product?.count*product?.price}</div>        
    //                     </div>
    //                 })
    //             }
    //         </div>
    //     </div>
    // </div>
    // return(
    //     orders?.map((order) => {
          return <OrderCardClient orderDetails={order} getOrders={getOrders} isAdmin={true}/>
        // }))
      
}

const OrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const gettOrders = async () => {
        try{
            const response = await fetchOrders();
            if (response?.data?.length > 0) {
                let arr = response?.data?.map((order) => {
                    return {
                        key: order?._id,
                        label: <><div><strong>DELIVERY:</strong>{order?.delivery_on}</div> <div><strong>STATUS:</strong>{orderStatusConstants?.[order?.status_id]?.status_name}</div></>,
                        children: <OrderDetails order={order} gettOrders={gettOrders} setOrders={setOrders}/>
                    }
                })
                setOrders(arr)
            }
            else {
                setOrders([]);
            }
        }
        catch(err){

        }
    }
    useEffect(() => {
        gettOrders()
    }, [])

    return (
        <div className={styles.container}>
            <Collapse accordion items={orders} />
        </div>
    )
}

export default OrdersSection;