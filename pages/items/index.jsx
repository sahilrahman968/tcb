import React, { useEffect, useState } from 'react'
import styles from "../../styles/ItemList.module.scss"
import ProductCard from 'components/productCard'
import { VEG } from 'Constants';
import ShimmerCard from 'components/shimmerCard/ShimmerCard';

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let products = await fetch(`api/product/getProducts?page_no=${1}`)
        products = await products.json()
        setProducts([...products?.data])
        setLoading(false);
      }
      catch (err) {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.filters}></div>
      <div className={styles.itemlist}>
        {
          loading ?
            new Array(20).fill("").map((_, index) => {
              return <ShimmerCard key={index} />
            }) :
            products?.length > 0 &&
            products?.map((data, index) => {
              return <ProductCard
                key={data?._id}
                title={data?.title}
                description={data?.description}
                veg={data?.veg_non_veg === VEG}
                url1={data?.img?.[0]}
                url2={data?.img?.[1]}
              />

            })
        }
      </div>
    </div>
  )
}

export default Items