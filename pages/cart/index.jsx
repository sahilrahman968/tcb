import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import Footer from '../../components/footer';
import styles from "../../styles/Cart.module.scss"
import Image from 'next/image';
import Calendar from '../../components/calendar/Calendar';
import AddressSelector from '../../components/addressSelector/AddressSelector';
import Header from '../../components/header/index';
import { useUserContext } from '../../providers/UserContextProvider';
import { deleteCart, getCartProducts, updateCart } from '../../apiConsumers/cart';
import { fetchProducts } from '../../apiConsumers/products';
import { Button, Skeleton, Spin } from 'antd';
import { createOrUpdateOrder } from '../../apiConsumers/order';
import noData from "../../assets/empty_cart.png";
import Link from 'next/link';
import DatePicker from '../../components/datePicker';
import sendEmail from '../../apiConsumers/sendMail';
import PageLoader from '../../components/pageLoader';
import CircularLoader from '../../components/circularLoader';
import BottomTray from '../../components/bottomTray';
import add from "../../assets/add.png"
import calendar from "../../assets/calendar.gif"
import call from "../../assets/calling.gif"
import location from "../../assets/placeholder.gif"
import AddressTray from '../../components/addressTray';
import google from "../../assets/google_login.png"

const CounterButton = ({ count, updateCount }) => {
  const clickHandler = (type) => {
    updateCount(type)
  }
  return <div className={styles.counter_container}>
    <span style={{ cursor: "pointer" }} onClick={() => { clickHandler("DEC") }}>--</span>
    <span style={{ transitionDuration: "1000ms" }}>{count}</span>
    <span style={{ cursor: "pointer" }} onClick={() => { clickHandler("INC") }}>+</span>
  </div>
}

const CartCard = ({ product, setProducts, userId, setLoading }) => {
  const updateCount = async (type) => {
    setLoading(true)
    try {
      let count = product?.count;
      if (type === "INC") {
        count += 1;
      }
      else if (type === "DEC") {
        count -= 1;
      }
      const response = await updateCart({ user_id: userId, product_id: product?._id, count });
      let ids = await getCartProducts(userId)
      if (ids?.length) {
        const queryParams = {
          id: ids?.map(product => product?.product_id)?.join(",")
        };

        const products = await fetchProducts(queryParams);
        if (products?.length) {
          const arr = ids?.map((product) => {
            const result = products?.find(p => p?._id === product?.product_id);
            result.count = product?.count
            return result
          })

          if (Array.isArray(arr)) {
            setProducts(arr)
          }
          else {
            setProducts([]);
          }
        }
        else {
          setProducts([])
        }
      }
      else {
        setProducts([])
      }
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
    }

  }
  return <div className={styles.card_container}>
    <div className={styles.product_image}>
      <Image src={product?.image} height={60} width={60} style={{ borderRadius: "5px" }} alt="product" />
    </div>
    <div className={styles.product_title}>{product?.title}</div>
    <div className={styles.counter_button}><CounterButton count={product?.count} updateCount={updateCount} /></div>
    <div className={styles.product_price}>₹{product?.plate_price}</div>
  </div>
}



const Cart = () => {
  const [products, setProducts] = useState([]);
  const { userData } = useUserContext()
  const { data: session } = useSession()
  const [productsLoading, setProductsLoading] = useState(false);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryMode, setDeliveryMode] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [openDateTray, setOpenDateTray] = useState(false)
  const [openModeTray, setOpenModeTray] = useState(false)
  const [openAddressTray, setOpenAddressTray] = useState(false)

  useEffect(() => {
    setPageLoader(true);
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const getProducts = async () => {
    setProductsLoading(true);
    if (userData?._id) {
      try {
        let ids = await getCartProducts(userData?._id)
        if (ids?.length) {
          const queryParams = {
            id: ids?.map(product => product?.product_id)?.join(",")
          };

          const products = await fetchProducts(queryParams);

          if (products?.length) {
            const arr = ids?.map((product) => {
              const result = products?.find(p => p?._id === product?.product_id);
              result.count = product?.count
              return result
            })

            if (Array.isArray(arr)) {
              setProducts(arr)
            }
            else {
              setProducts([]);
            }
            setProductsLoading(false)
          }
        }
        else {
          setProducts([]);
        }
      }
      catch (err) {
        setProductsLoading(false)
        setProducts([]);
      }
      finally {
        setProductsLoading(false)
      }
    }
    else {
      setProductsLoading(false)
    }
  }
  useEffect(() => {
    getProducts()
  }, [userData])

  const orderHandler = async () => {
    setPlaceOrderLoading(true);
    try {
      const orderData = {
        "user_id": userData?._id,
        "user_name": userData?.name,
        "user_number": userData?.phone ?? "8876634108",
        "user_email": userData?.email,
        "status_id": 1,
        "placed_on": "16.11.2023",
        "delivery_on": "19.11.2023",
        "delivery_mode": 1,
        "products": products?.map((product) => { return { image: product?.image, title: product?.title, count: product?.count, price: product?.plate_price ?? 0 } }) || [],
        "address": {
          "location": "zoo road",
          "pin": "785007"
        }
      };
      const response = await createOrUpdateOrder(orderData);
      await sendEmail({ to: userData?.email, subject: "Order Placed Successfully", text: "Your order has been placed. Please wait until further updates from TCB." })
      await deleteCart({ userId: userData?._id });
      getProducts();
      setPlaceOrderLoading(false);
    }
    catch (err) {
      setPlaceOrderLoading(false);
    }
  }

  const handleDateChange = (e) => {
    const date = e.target.value;

    if (disabledDates.includes(date)) {
      alert('This date is disabled. Please choose another date.');
      setSelectedDate('');
    } else {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    if (placeOrderLoading || productsLoading) {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }, [placeOrderLoading, productsLoading])
  return (
    pageLoader ?
      <PageLoader /> :
      <div className={styles.container}>
        <Header title="Your Cart" loading={loading} />
        {
          products?.length === 0 || !session?.user?.email ? <div className={styles.cart_body}>
            <Image src={noData} height={180} />
            <div className={styles.empty_cart_text}>Your cart is empty. Add something <br /> from the menu.</div>
            <div className={styles.menu_items}>
              <div className={styles.menu_item}>
                <Image src={noData} height={60} />
              </div>
              <div className={styles.menu_item}>
                <Image src={noData} height={60} />
              </div>
              <div className={styles.menu_item}>
                <Image src={noData} height={60} />
              </div>
            </div>
            <div className={styles.mass_order_card_container}>
              <div className={styles.text_container}>
                <div className={styles.card_text_primary}>Big Orders, Big Flavors!</div>
                <div className={styles.card_text_secondary}>Hosting an event? <br /> We've got your food covered! Call us to place mass orders and make your gathering a culinary hit.</div>
              </div>
            </div>
            {
              !session?.user?.email &&
              <div className={styles.login_cta} onClick={() => { if (!session) { signIn('google') } }}>
                <Image src={google} />
              </div>
            }

          </div> :
            <div className={styles.cart_container}>
              <div className={styles.cart_list_container}>
                <div className={styles.cart_list}>
                  {
                    productsLoading ? <Skeleton /> :
                      products?.map((product, index) => {
                        return <CartCard key={product?._id} product={product} setProducts={setProducts} userId={userData?._id} setLoading={setLoading} />
                      })
                  }
                </div>
                <Link href="/food">
                  <div className={styles.addmore_cta}>
                    Add more items
                    <Image src={add} />
                  </div>
                </Link>
              </div>
              <div className={styles.mass_order_card_container}>
                <div className={styles.text_container}>
                  <div className={styles.card_text_primary}>Big Orders, Big Flavors!</div>
                  <div className={styles.card_text_secondary}>Hosting an event? <br /> We've got your food covered! Call us to place mass orders and make your gathering a culinary hit.</div>
                </div>
              </div>
              <div className={styles.order_steps}>
                <div className={styles.step_container}>
                  <Image src={calendar} width={60} height={60} />
                </div>
                <div className={styles.step_container} onClick={() => { setOpenAddressTray(true) }}>
                  <Image src={location} width={60} height={60} />
                </div>
                <div className={styles.step_container}>
                  <Image src={call} width={60} height={60} />
                </div>
              </div>
            </div>
        }
        {
          openAddressTray && <AddressTray setDeliveryAddress={setDeliveryAddress} closeTray={() => { setOpenAddressTray(false) }} />
        }

      </div>
  )
}

export default Cart

/* {!session?.user?.email ? "Login to continue" :
          <div className={styles.cart_container}>
            <div className={styles.cart_list}>
              {
                productsLoading ? <CircularLoader /> :
                  products?.length > 0 ?
                    products?.map((product, index) => {
                      return <CartCard key={product?._id} product={product} setProducts={setProducts} userId={userData?._id} setLoading={setLoading}/>
                    }) :
                    <>
                      <Image src={noData} height={139} />
                      <i className={styles.empty_text}>Your cart is empty. Add something now.</i>
                      <Link href="/food">
                        <Button>Browse Items</Button>
                      </Link>
                    </>
              }
            </div>
            <div className={styles.section}>
              <div className={styles.date}>Select Address</div>
              <div className={styles.calendar}>
                <AddressSelector />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.date}>Select Date</div>
              <div className={styles.calendar}>
                <Calendar />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.total}>Order Summary</div>
              <div className={styles.address}>
                <div>Deliver to Rohit</div>
                <div className={styles.dropdown}></div>
              </div>
              <div className={styles.payment} onClick={orderHandler}>
                Place Order
              </div>
            </div>
          </div>
      } */