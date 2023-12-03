import Head from 'next/head'
import styles from "../styles/Home.module.scss"
import { signIn, signOut, useSession } from 'next-auth/react'
import logo from "../assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { status, data: session } = useSession()
  const userData = {};
  return (
    <>
      <Head>
        <title>The Chopping Board</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.section_1}>
            <div className={styles.section_header}>
              <div className={styles.logo_container}>
                <Image className={styles.logo} src={logo} alt="tcb" />
                <div className={styles.logo_name}>TCB</div>
              </div>
              <div

              >
                {
                  status === "loading" ? "" :
                    session ? <Link href="/profile">
                      <Image src={session?.user?.image} width={50} height={50} style={{ borderRadius: "50%" }} />
                    </Link> :
                      <div
                        className={styles.login_cta}
                        onClick={() => { if (!session) { signIn('google') }}}
                      >
                        Log In
                      </div>
                }
              </div>
            </div>
            <div className={styles.section_body}>
              <h1 className={styles.heading}>
                The Chopping Board
              </h1>
              <div className={styles.sub_heading}>
                Food and Bakery
              </div>
              <Link href="/food">
                <div className={styles.browse}>
                  <div className={styles.text}>Browse Menu</div>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.section_2}>
            <Image src={logo} alt="tcb" />
            <div className={styles.description}>
              In the heart of a bustling city, hidden among skyscrapers, a quaint cafe serves aromatic coffee and freshly baked pastries. Patrons sip their drinks, lost in thought or animated conversation. Outside, the city's rhythm goes on, oblivious to the cozy haven within. Life's stories intertwine in this urban oasis.
            </div>
            <div className={styles.features}>

            </div>
          </div>
          <div className={styles.section_3}>
            <div className={styles.body}></div>
            <div className={styles.footer}>2023 WebElevate</div>
          </div>
        </div>
      </main>
    </>
  )
}
