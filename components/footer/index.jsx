import React, { useEffect } from 'react'
import styles from "../../styles/Footer.module.scss"
import cart from "../../assets/shopping-cart.png"
import profile from "../../assets/user.png"
import cake from "../../assets/cake.png"
import items from "../../assets/restaurant.png"
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUserContext } from '../../providers/UserContextProvider'
import logo from "../../assets/logo.png";

const Footer = () => {
  const {data:session} = useSession()
  const {userData,setUserData} = useUserContext();
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.link_container}>
          <Image
            src={logo}
            alt="logo"
            width={60}
            height={60}
          />
        </div>
      </Link>
      <Link href="/food">
        <div className={styles.link_container}>
          <Image
            src={items}
            alt="logo"
            width={25}
            height={25}
          />
          {/* <div className={styles.title}>FOOD</div> */}
        </div>
      </Link>
      <Link href="/bakery">
        <div className={styles.link_container}>
          <Image
            src={cake}
            alt="logo"
            width={25}
            height={25}
          />
        </div>
      </Link>
      {/* <Link href="/recipe">
        <div className={styles.link_container}>
          <Image
            src={items}
            alt="logo"
            width={25}
            height={25}
          />
        </div>
      </Link> */}
      <Link href="/cart">
        <div className={styles.link_container}>
          <Image
            src={cart}
            alt="logo"
            width={25}
            height={25}
          />
          {/* <div className={styles.title}>CART</div> */}
        </div>
      </Link>
      <Link href="/profile">
        <div className={styles.link_container}>
          <Image
            src={session?.user?.image ? session?.user?.image : profile}
            alt="profile"
            width={25}
            height={25}
            style={{borderRadius:"50%"}}
          />
          {/* <div className={styles.title}>ACCOUNT</div> */}
        </div>
      </Link>
    </div>
  )
}

export default Footer