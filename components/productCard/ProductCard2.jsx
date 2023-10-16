import React from 'react'
import styles from "../../styles/ProductCard2.module.scss"
import VegNonVeg from 'components/vegNonVeg'
import { VEG } from 'Constants'
import Image from 'next/image'
import placeholder from "../../assets/placeholder-food.jpg"
import star from "../../assets/star.svg"

const AddButton = () => {
    return <div className={styles.add_button_container}>
        ADD
    </div>
}

const ProductCard2 = ({ title, description, veg, url1 }) => {
    return (
        <div className={styles.container}>
            <div className={styles.section1_container}>
                <div className={styles.product_image_container}>
                    <Image className={styles.product_image} src={url1 || placeholder} alt="product-image" width="120" height="120" />
                </div>
                <AddButton/>
            </div>
            <div className={styles.product_details}>
                <div className={styles.product_title}>
                    <VegNonVeg type={veg ? "veg" : "non-veg"} /> {title}
                </div>
                <div className={styles.product_description}>
                    <div style={{ visibility: "hidden" }}><VegNonVeg type={veg ? "veg" : "non-veg"} /> </div> {description}
                </div>
                <div className={styles.add_info}>
                    <div style={{ visibility: "hidden" }}><VegNonVeg type={veg ? "veg" : "non-veg"} /> </div>
                    <div className={styles.rating_container}>
                        <Image
                            src={star}
                            alt="rating-star"
                            height={15}
                            width={15}
                        />
                        4.5
                    </div>
                    <div className={styles.dot}>
                    </div>
                    <div className={styles.price_container}>
                        Rs.180/Rs.250
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard2