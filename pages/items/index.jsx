import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "../../styles/ItemList.module.scss"
import ProductCard from 'components/productCard'
import ShimmerCard from 'components/shimmerCard';
import Footer from '../../components/footer';
import ToggleSwitch from '../../components/toggle';
import Input from '../../components/input';
import { fetchProducts } from '../../apiConsumers/products';
import noData from "../../assets/noData.svg"
import Image from 'next/image';

const pageSize = 20;
const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [veg, setVeg] = useState(false);
  const [nonveg, setNonveg] = useState(false);
  const [assamese, setAssamese] = useState(false);

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
            pageSize: 10,
            is_veg: veg,
            is_nonveg: nonveg,
            is_assamese: assamese
          };

          const response = await fetchProducts(queryParams);
          if (response?.length < pageSize) {
            setHasMore(false)
          }
          else {
            setHasMore(true);
          }
          setProducts([...products, ...response])
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
      setPage(1);
      const queryParams = {
        page_no: page,
        pageSize: 10,
        is_veg: veg,
        is_nonveg: nonveg,
        is_assamese: assamese
      };
      const response = await fetchProducts(queryParams);
      if (response?.length) {
        setProducts([...response])
      }
      else {
        setProducts([])
      }
    }
    getProducts()
  }, [veg, nonveg, assamese])
  return (
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
          />
          <ToggleSwitch toggleSwitch={() => { setAssamese(prev => !prev) }} checked={assamese} />
        </div>
      </div>
      <div className={styles.itemlist}>
        {
          loading ?
            new Array(20).fill("").map((_, index) => {
              return <ShimmerCard key={index} type={2} />
            }) :
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
                  />
                </div>
              }) :
              <div className={styles.noData}>
                <Image src={noData} />
              </div>
        }
        {
          loading && products?.length && <ShimmerCard />
        }
      </div>
      <Footer />
    </div>
  )
}

export default Items