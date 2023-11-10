import React, { useEffect } from 'react'
import styles from "../../styles/Footer.module.scss"
import logo from "../../assets/cutlery.png";
import search from "../../assets/search.png"
import cart from "../../assets/shopping-cart.png"
import profile from "../../assets/user.png"
import items from "../../assets/restaurant.png"
import Image from 'next/image';
import Link from 'next/link';
import { useAdminContext } from 'providers/AdminContextProvider';
import { useSession } from 'next-auth/react';
const Footer = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
      });
    }
  }, [])

  const {data:session} = useSession()
  const {setAdmin} = useAdminContext()
  useEffect(() => {
    const getUserData = async () => {
      let userData = await fetch(`/api/user/getUser?email=${session.user.email}`)
      userData = await userData.json()
      if(userData?.user?.role === "1"){
        setAdmin(true)
      }
      else{
        setAdmin(false)
      }
    }
    if (session)
      getUserData()
  }, [session])

  return (
    <div className={styles.container}>
      <Link href="/items">
        <div className={styles.link_container}>
          <Image
            src={items}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>FOOD</div>
        </div>
      </Link>
      <Link href="/recipe">
        <div className={styles.link_container}>
          <Image
            src={items}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>RECIPE</div>
        </div>
      </Link>
      <Link href="/cart">
        <div className={styles.link_container}>
          <Image
            src={cart}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>CART</div>
        </div>
      </Link>
      <Link href="/profile">
        <div className={styles.link_container}>
          <Image
            src={session?.user?.image ? session?.user?.image : profile}
            alt="profile"
            width={20}
            height={20}
            style={{borderRadius:"50%"}}
          />
          <div className={styles.title}>ACCOUNT</div>
        </div>
      </Link>
    </div>
  )
}

export default Footer