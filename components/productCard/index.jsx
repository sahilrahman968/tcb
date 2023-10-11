import React from 'react'
import styles from '../../styles/ProductCard.module.scss'
import biryani from "../../assets/biryani.jpeg"
import star from "../../assets/star.svg"
import Image from 'next/image'

const Price = () => {
  return <div className={styles.price_container}>
    <div className={styles.price_value}>₹24/₹25</div>
    <div className={styles.price_category}>{"(per plate/per person)"}</div>
  </div>
}

const VegNonVeg = ({type}) => {
  return <div className={styles.veg_non_veg_container} style={{border:`1px solid ${type==="veg" ? "green":"red"}`}}>
    <div className={styles.marker} style={{backgroundColor:type==="veg" ? "green":"red"}}></div>
  </div>
} 

const AddButton = () => {
  return <div className={styles.add_button_container}>
    ADD
  </div>
}
const ProductCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.product_image_container}>
          <Image
            className={styles.product_image}
            src={biryani}
            alt="product-image"
          />
        </div>
        <div className={styles.btn_container}>
            <AddButton/>
        </div>
        <div className={styles.p_conatiner}>
              <Price/>
        </div>
      </div>
      <div className={styles.product_info}>
          <div className={styles.info_header}>
            <div className={styles.ratings_container}>
              {
                new Array(5).fill("").map((_,index)=>{
                  return <Image
                    key={index}
                    className={styles.rating_star}
                    src={star}
                    alt="rating-star"
                  />
                })
              }
            </div>
          </div>
          <div className={styles.product_heading}><VegNonVeg type="non-veg"/>Bailey{`&apos`}s Irish Cream</div>
          <div className={styles.product_subheading}>Smooth, rich, and creamy, a delightful Irish indulgence</div>
      </div>
    </div>
  )
}

export default ProductCard