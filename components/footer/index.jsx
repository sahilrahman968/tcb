import React, { useEffect } from 'react'
import styles from "../../styles/Footer.module.scss"
import logo from "../../assets/cutlery.png";
import search from "../../assets/search.png"
import cart from "../../assets/shopping-cart.png"
import profile from "../../assets/user.png"
import items from "../../assets/restaurant.png"
import Image from 'next/image';
import Link from 'next/link';
import useGetSession from 'hooks/useGetSession';
import { useAdminContext } from 'providers/AdminContextProvider';
const Footer = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
      });
    }
  }, [])

  const { session, loading } = useGetSession()
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
            src={logo}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>TCB</div>
        </div>
      </Link>
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
      <Link href="/items">
        <div className={styles.link_container}>
          <Image
            src={items}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>BAKERY</div>
        </div>
      </Link>
      <Link href="/items">
        <div className={styles.link_container}>
          <Image
            src={search}
            alt="logo"
            width={20}
            height={20}
          />
          <div className={styles.title}>SEARCH</div>
        </div>
      </Link>
      <Link href="/items">
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
            src={profile}
            alt="profile"
            width={20}
            height={20}
          />
          <div className={styles.title}>ACCOUNT</div>
        </div>
      </Link>
    </div>
  )
}

export default Footer