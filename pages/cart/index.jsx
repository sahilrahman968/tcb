import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Footer from '../../components/footer';
import styles from "../../styles/Cart.module.scss"
import Image from 'next/image';
import biryani from "../../assets/biryani.webp"
import Calendar from '../../components/calendar/Calendar';

const CounterButton = () => {
  return <div className={styles.counter_container}>
      <span>--</span>
      <span>1</span>
      <span>+</span>
  </div>
}

const CartCard = () => {
  return <div className={styles.card_container}>
    <div className={styles.product_image}>
      <Image src={biryani} height={36} width={36} style={{borderRadius:"5px"}} alt="product"/>
    </div>
    <div className={styles.product_title}>Gulab Wala Special Dry Fruit Cookies</div>
    <div className={styles.counter_button}><CounterButton/></div>
    <div className={styles.product_price}>₹600</div>
  </div>
}
const Cart = () => {
  const { data: session, status } = useSession()
  // const [ids,setIds] = useState([]);
  // useEffect(()=>{
  //   console.log("hi")
  //   const getUser = async () => {
  //     try{
  //       let userData = await fetch(`/api/user/getUser?email=${session.user.email}`)
  //       userData = await userData.json();
  //       if(userData?.user?.cart?.length){
  //         const ids = userData?.user?.cart?.map(item=>item?.id)
  //         setIds(ids);
  //       }
  //       console.log("userData",userData)
  //     }
  //     catch(err){

  //     }
  //   }
  //   getUser()
  // },[])
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Your Cart</div>
      {
        !session?.user?.email ? "Login to continue":
        <div className={styles.cart_container}>
            <div className={styles.cart_heading}>Review Items</div>
            <div className={styles.cart_list}>
                {
                  [1,2,3,4,5,1,2,3,4,5]?.map((_,index)=>{
                    return <CartCard key={index}/>
                  })
                }
            </div>
            <div className={styles.section}>
              <div className={styles.date}>Select Date</div>
              <div className={styles.calendar}>
                <Calendar/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.total}>To Pay: ₹600</div>
              <div className={styles.address}>
                <div>Deliver to Rohit</div>
                <div className={styles.dropdown}></div>
              </div>
              <div className={styles.payment}>
                Proceed to Pay
              </div>  
            </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Cart