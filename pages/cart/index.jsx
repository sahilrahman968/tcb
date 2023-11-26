import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Footer from '../../components/footer';
import styles from "../../styles/Cart.module.scss"
import Image from 'next/image';
import Calendar from '../../components/calendar/Calendar';
import AddressSelector from '../../components/addressSelector/AddressSelector';
import Header from '../../components/header/index';
import { useUserContext } from '../../providers/UserContextProvider';
import { getCartProducts, updateCart } from '../../apiConsumers/cart';
import { fetchProducts } from '../../apiConsumers/products';
import { Button, Spin } from 'antd';
import { createOrUpdateOrder } from '../../apiConsumers/order';
import noData from "../../assets/noData.svg";
import Link from 'next/link';

const CounterButton = ({ count, updateCount }) => {
  const clickHandler = (type) => {
    updateCount(type)
  }
  return <div className={styles.counter_container}>
    <span onClick={() => { clickHandler("DEC") }}>--</span>
    <span>{count}</span>
    <span onClick={() => { clickHandler("INC") }}>+</span>
  </div>
}

const CartCard = ({ product, setProducts, userId }) => {
  const updateCount = async (type) => {
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
      }
      console.log("updatecart", response)
    }
    catch (err) {

    }

  }
  return <div className={styles.card_container}>
    <div className={styles.product_image}>
      <Image src={product?.image} height={36} width={36} style={{ borderRadius: "5px" }} alt="product" />
    </div>
    <div className={styles.product_title}>{product?.title}</div>
    <div className={styles.counter_button}><CounterButton count={product?.count} updateCount={updateCount} /></div>
    <div className={styles.product_price}>₹600</div>
  </div>
}
const Cart = () => {
  const [products, setProducts] = useState([]);
  const { userData } = useUserContext()
  const { data: session } = useSession()
  const [productsLoading, setProductsLoading] = useState(false);
  useEffect(() => {
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
        }
        catch (err) {
          setProductsLoading(false)
        }
        finally {
          setProductsLoading(false)
        }
      }
      else {
        setProductsLoading(false)
      }
    }
    getProducts()
  }, [])

  const orderHandler = async () => {
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
        products: products?.map((product) => { return { image: product?.image, title: product?.title, count: product?.count, price: product?.price ?? 0 } }) || [],
        "address": {
          "location": "zoo road",
          "pin": "785007"
        }
      };
      const response = await createOrUpdateOrder(orderData);
    }
    catch (err) { }
  }
  return (
    <div className={styles.container}>
      <Header title="Your Cart" />
      {
        !session?.user?.email ? "Login to continue" :
          <div className={styles.cart_container}>
            <div className={styles.cart_list}>
              {
                productsLoading ? <Spin /> :
                  products?.length > 0 ?
                    products?.map((product, index) => {
                      return <CartCard key={product?._id} product={product} setProducts={setProducts} userId={userData?._id} />
                    }) :
                    <>
                      <Image src={noData} height={139} />
                      <i className={styles.empty_text}>Your cart is empty. Add something now.</i>
                      <Link href="/items">
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
      }
      <Footer />
    </div>
  )
}

export default Cart