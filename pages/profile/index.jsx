import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.scss";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Image from 'next/image';
import { fetchOrders } from '../../apiConsumers/order';
import { useUserContext } from '../../providers/UserContextProvider';
import { Button, Spin } from 'antd';


const Profile = () => {
  const { status, data: session } = useSession()
  const { userData } = useUserContext()
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  console.log("userData", userData)
  useEffect(() => {
    const getOrders = async () => {
      try {
        setOrdersLoading(true)
        const response = await fetchOrders({ userId: userData?._id })
        console.log("ORDERS$$", response)
        if (response?.data?.length) {
          setOrders(response?.data);
        }
        setOrdersLoading(false)
      }
      catch (err) {
        setOrdersLoading(false)
      }
    }
    getOrders();
  }, [])
  return (
    <div className={styles.container}>
      <Header title="Profile" />
      {
        userData &&
        <>
          <div className={styles.section}>
            <Image className={styles.profile_image} src={session?.user?.image} width={50} height={50} style={{ borderRadius: "50%" }} />
            <div className={styles.name}>{session?.user?.name}</div>
            <div className={styles.email}>{session?.user?.email}</div>
            {
                userData?.is_admin && <Link href="/profile/dashboard">go to admin dashboard</Link>
            }
          </div>
          <div className={styles.heading}>Your Order/s</div>
          <div className={styles.section}>
            {
              ordersLoading ? <Spin /> :
                <div>
                  {
                    orders?.map((order) => {
                      return <>{order?.placed_on}</>
                    })
                  }
                </div>

            }
          </div>
          <div className={styles.heading}>Addresses</div>
          <div className={styles.section}>

          </div>
        </>
      }
      {
        status === "loading" ?
          <div>Loading</div> :
          userData ?
              <Button onClick={() => { signOut() }}>Sign out</Button>
            : <Button onClick={() => signIn('google')}>Sign in</Button>
      }
      <Footer />
    </div>
  )
}

export default Profile