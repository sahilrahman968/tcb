import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "../../styles/ItemList.module.scss"
import ProductCard from 'components/productCard'
import { VEG } from 'Constants';
import ShimmerCard from 'components/shimmerCard';
// import ShimmerCard from 'components/shimmerCard/ShimmerCard';

const pageSize = 20;
const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response = await fetch(`api/product/getProducts?page_no=${page}&pageSize=${pageSize}`)
        response = await response.json()
        if (response?.data?.length < pageSize) {
          setHasMore(false)
        }
        else {
          setHasMore(true);
        }
        setProducts([...products, ...response?.data])
        setLoading(false);
      }
      catch (err) {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [page])
  return (
    <div className={styles.container}>
      <div className={styles.filters}></div>
      <div className={styles.itemlist}>
        {
          loading & products?.length === 0  ?
            new Array(20).fill("").map((_, index) => {
              return <ShimmerCard key={index} type={2}/>
            }) :
            products?.length > 0 &&
            products?.map((data, index) => {
              return <div key={data?._id} ref={(products.length - 1) === index ? lastProductRef : null}>
                <ProductCard
                  type = {2}
                  title={data?.title}
                  description={data?.description}
                  veg={data?.veg_non_veg === VEG}
                  url1={data?.img?.[0]}
                  url2={data?.img?.[1]}
                />
              </div>
            })
        }
        {
          loading && products?.length && <ShimmerCard />
        }
      </div>
    </div>
  )
}

export default Items