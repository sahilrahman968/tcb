import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.scss";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Image from 'next/image';
import { fetchOrders } from '../../apiConsumers/order';
import { useUserContext } from '../../providers/UserContextProvider';
import { Button, Spin, Space, Input, InputNumber } from 'antd';
import OrderCardClient from '../../components/orderCardClient';
import call from "../../assets/call.png"
import { updateUser } from '../../apiConsumers/user';
import edit from "../../assets/editing.png"
import PageLoader from '../../components/pageLoader';
import CircularLoader from '../../components/circularLoader';

const Profile = () => {
  const { status, data: session } = useSession()
  const { userData,getUserData } = useUserContext()
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updatePhoneNumberLoading,setUpdatePhoneNumberLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { Search } = Input;

  useEffect(() => {
    setPageLoader(true);
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

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
  useEffect(() => {
    getOrders();
  }, [userData])

  const isValidPhoneNumber = (number) => {
    if (number?.toString()?.length === 10) return true;
    return false;
  }

  const onSubmitPhoneNumber = async () => {
    try {
      setUpdatePhoneNumberLoading(true);
      await updateUser({ userId: userData?._id, updatedUserData: { phone: phoneNumber } })
      getUserData()
      setShowInput(false)
      setUpdatePhoneNumberLoading(false)
    }
    catch (err) {
      setUpdatePhoneNumberLoading(false)
    }
  }
  return (
    pageLoader ?
    <PageLoader/> :
    <div className={styles.container}>
      <Header title="Profile" />
      {
        userData &&
        <>
          <div className={styles.section}>
            <Image className={styles.profile_image} src={session?.user?.image} width={50} height={50} style={{ borderRadius: "50%" }} />
            <div className={styles.name}>{session?.user?.name}</div>
            {
              !userData?.phone || showInput &&
              <>
                {
                  showInput ? <Space.Compact
                    style={{
                      width: '400px',
                      display: "flex",
                      justifyContent: "center",
                      margin: "10px 0"
                    }}
                  >
                    <InputNumber size="small" maxLength={10} value={phoneNumber} onChange={(e) => { setPhoneNumber(e) }} />
                    <Button type="primary" disabled={!isValidPhoneNumber(phoneNumber)} onClick={() => { onSubmitPhoneNumber() }}>Submit</Button>
                    {updatePhoneNumberLoading && <Spin/>}
                  </Space.Compact> :
                    <div className={styles.phone} onClick={() => { if (userData?.phone) return; setShowInput(true) }}>{
                      !userData?.phone &&
                      <>
                        <Image src={call} width={15} height={15} /> Add phone number
                      </>
                    }
                    </div>
                }
              </>
            }

            {
              userData?.phone && !showInput && <div className={styles.email}>{userData?.phone} <Image src={edit} width={15} height={15} onClick={() => { setShowInput(true) }}/></div> 
            }
            <div className={styles.email}>{session?.user?.email}</div>
            {
              userData?.is_admin && <Link href="/profile/dashboard">go to admin dashboard</Link>
            }
          </div>
          <div className={styles.heading}>Your Order/s</div>
          <div className={styles.section}>
            {
              ordersLoading ? <CircularLoader /> :
                <div style={{ width: "100%" }}>
                  {
                    orders?.map((order) => {
                      return <OrderCardClient key={order?._id} orderDetails={order} getOrders={getOrders}/>
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