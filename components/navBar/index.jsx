import React from 'react'
import styles from "../../styles/Navbar.module.scss"
import logo from "../../assets/logo.svg"
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar_content}>
        <div className={styles.logo_container}>
          <Link href="/">
            <Image src={logo} alt="logo"/>
          </Link>
        </div>
        <div className={styles.section_right}>
          <Link href="/items">
            Items
          </Link>
          <Link href="/items">
            Recipes
          </Link>
          <Link href="/items">
            Cart
          </Link>
          <Link href="/items">
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar