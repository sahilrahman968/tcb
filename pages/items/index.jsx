import React, { useEffect, useState } from 'react'
import styles from "../../styles/ItemList.module.scss"
import ProductCard from 'components/productCard'
import { VEG } from 'Constants';

const Items = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      let products = await fetch(`api/product/getProducts?page_no=${1}`)
      products = await products.json()
      setProducts([...products?.data])
      // console.log("products res",products)
    }
    fetchProducts()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.filters}></div>
      <div className={styles.itemlist}>
        {
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