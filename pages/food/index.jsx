import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "../../styles/ItemList.module.scss"
import ProductCard from 'components/productCard'
import ShimmerCard from 'components/shimmerCard';
import Footer from '../../components/footer';
import ToggleSwitch from '../../components/toggle';
import Input from '../../components/input';
import { fetchProducts } from '../../apiConsumers/products';
import { getCartProducts } from '../../apiConsumers/cart';
import { useUserContext } from '../../providers/UserContextProvider';
import { fetchAddons } from '../../apiConsumers/addons';
import PageLoader from '../../components/pageLoader';
import BottomTray from '../../components/bottomTray';
import delivery from "../../assets/delivery_agent.webp"
import Image from 'next/image';
import Link from 'next/link';
import LoginTray from '../../components/loginTray';
import { useSession } from 'next-auth/react';
import SideTray from '../../components/sideTray';

const pageSize = 10;

const TrayContent = ({ cartProducts }) => {
  console.log("cartProductscartProducts", cartProducts)
  return <div className={styles.tray_content_container}>
    <div className={styles.delivery_image_container}>
      <Image src={delivery} height={70} width={70} />
    </div>
    <div className={styles.free_delivery_text}>Shop for 100 more to unlock free delivery</div>
    <div className={styles.cart_summary_container}>
      <div className={styles.section_1}>
        {cartProducts?.length} items
      </div>
      <Link href="/cart">
        <div className={styles.section_1}>
          view cart
        </div>
      </Link>
    </div>
  </div>
}

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [veg, setVeg] = useState(false);
  const [nonveg, setNonveg] = useState(false);
  const [assamese, setAssamese] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductDetails, setCartProductDetails] = useState([])
  const [addons, setAddons] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [loginTray,setLoginTray] = useState(false);

  const { userData } = useUserContext();
  const { data: session } = useSession()

  useEffect(() => {
    setPageLoader(true);
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const observer = useRef()
  const lastProductRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    if (page > 1) {
      const getProducts = async () => {
        try {
          setLoading(true);
          const queryParams = {
            page_no: page,
            pageSize: pageSize,
            is_veg: veg,
            is_nonveg: nonveg,
            is_assamese: assamese,
            is_bakery: false,
            is_food: true
          };

          const response = await fetchProducts(queryParams);
          if (response?.length < pageSize) {
            setHasMore(false)
          }
          else {
            setHasMore(true);
          }
          setProducts([...products, ...response])
          const productids = [...products, ...response]?.map(product => product?._id);
          getAddons(productids);
          setLoading(false);
        }
        catch (err) {
          setLoading(false);
        }
      }
      getProducts()
    }
  }, [page])

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        setPage(1);
        const queryParams = {
          page_no: 1,
          pageSize: pageSize,
          is_veg: veg,
          is_nonveg: nonveg,
          is_assamese: assamese,
          is_bakery: false,
          is_food: true
        };
        const response = await fetchProducts(queryParams);
        if (response?.length < pageSize) {
          setHasMore(false)
        }
        else {
          setHasMore(true);
        }
        if (response?.length) {
          setProducts([...response])
          const productids = [...response]?.map(product => product?._id);
          getAddons(productids);
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

    getProducts()
  }, [veg, nonveg, assamese])

  useEffect(() => {
    fetchCartProducts();
  }, [userData])

  const fetchCartProducts = async () => {
    try {
      let products = await getCartProducts(userData?._id)
      if (Array.isArray(products)) {
        setCartProductDetails(products)
        setCartProducts(products?.map(product => product?.product_id))
      }
      else {
        setCartProductDetails([])
        setCartProducts([])
      }
    }
    catch (err) {
      setCartProductDetails([])
      setCartProducts([]);
    }
  }

  const getAddons = async (ids) => {
    try {
      const response = await fetchAddons(ids);
      setAddons(response);
    }
    catch (err) {
      setAddons([])
    }
  }

  const isCustomisable = (id) => {
    if (addons?.length) {
      const addon = addons?.find(addon => addon?.product_id === id);
      return addon;
    }
    else {
      return false
    }
  }

  return pageLoader ?
    <PageLoader /> :
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.input_container}>
          <Input />
        </div>
        <div className={styles.toggle_container}>
          <ToggleSwitch toggleSwitch={() => {
            if (veg) {
              setVeg(false);
            }
            else {
              setNonveg(false)
              setVeg(true);
            }
          }}
            checked={veg}
            type={0}
          />
          <ToggleSwitch toggleSwitch={() => {
            if (nonveg) {
              setNonveg(false);
            }
            else {
              setNonveg(true)
              setVeg(false);
            }
          }}
            checked={nonveg}
            type={1}
          />
          {/* <ToggleSwitch
            toggleSwitch={() => { setAssamese(prev => !prev) }}
            checked={assamese}
            type={2}
          /> */}
        </div>
      </div>
      <div className={styles.itemlist} style={{ paddingBottom: cartProducts?.length > 0 ? "80px" : "" }}>
        {
          products?.length > 0 ?
            products?.map((data, index) => {
              return <div key={data?._id} ref={(products.length - 1) === index ? lastProductRef : null}>
                <ProductCard
                  type={2}
                  title={data?.title}
                  description={data?.description}
                  veg={data?.is_veg}
                  url1={data?.image}
                  product={data}
                  fetchCartProducts={fetchCartProducts}
                  cartProducts={cartProducts}
                  addons={isCustomisable(data?._id)}
                  cartProductDetails={cartProductDetails}
                  setLoginTray={setLoginTray}
                />
              </div>
            }) :
            <div className={styles.noData}>
              {/* <Image src={noData} /> */}
            </div>
        }
        {
          loading && <ShimmerCard />
        }
      </div>
      {
        !loginTray &&
        cartProducts?.length === 0 ? <Footer /> :
          <BottomTray>
            <TrayContent cartProducts={cartProductDetails} />
          </BottomTray>
      }
      {
        loginTray && <LoginTray setLoginTray={setLoginTray}/>
      }
      <SideTray top="30vh" side="right" triggerText="MASS ORDER"/>
    </div>
}

export default Items