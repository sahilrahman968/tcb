import React, { useState } from 'react'
import styles from '../../styles/ProductCard1.module.scss'
import star from "../../assets/star.svg"
import Image from 'next/image'
import VegNonVeg from 'components/vegNonVeg'
import AddOnModal from 'components/addOnModal'
import placeholder from "../../assets/placeholder-food.jpg"

const Price = () => {
    return <div className={styles.price_container}>
        <div className={styles.price_value}>₹24/₹25</div>
        <div className={styles.price_category}>{"(per plate/per person)"}</div>
    </div>
}

const AddButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return <>
        <div onClick={() => { setIsModalOpen(true) }} className={styles.add_button_container}>
            ADD
        </div>
        <AddOnModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>

}

const ProductCard1 = ({ title, description, veg, url1 }) => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.product_image_container}>
                    <Image
                        className={styles.product_image}
                        src={url1 || placeholder}
                        alt="product-image"
                        width={296}
                        height={334}
                    // placeholder={placeholder}
                    />
                </div>
                <div className={styles.btn_container}>
                    <AddButton />
                </div>
                <div className={styles.p_conatiner}>
                    <Price />
                </div>
            </div>
            <div className={styles.product_info}>
                <div className={styles.info_header}>
                    <div className={styles.ratings_container}>
                        {
                            new Array(5).fill("").map((_, index) => {
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
                <div className={styles.product_heading}><VegNonVeg type={veg ? "veg" : "non-veg"} />{title}</div>
                <div className={styles.product_subheading}>{description}</div>
            </div>
        </div>
    )
}

export default ProductCard1