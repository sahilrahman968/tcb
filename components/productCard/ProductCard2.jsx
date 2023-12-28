import React from 'react'
import styles from "../../styles/ProductCard2.module.scss"
import VegNonVeg from 'components/vegNonVeg'
import { VEG } from 'Constants'
import Image from 'next/image'
import placeholder from "../../assets/placeholder-food.jpg"
import star from "../../assets/star.svg"
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { updateCart } from '../../apiConsumers/cart'
import { useUserContext } from '../../providers/UserContextProvider'
import { Spin } from 'antd'
import AddOnModal from 'components/addOnModal'
import CircularLoader from '../circularLoader'

const AddButton = ({ clickHandler, loading, addons, cartProducts, product }) => {
    return <div onClick={clickHandler} className={styles.add_button_container}>
        {loading ? <CircularLoader /> : !cartProducts?.includes(product?._id) ? "ADD" : "ADDED"}
    </div>
}

const action = {
    0: "INCREMENT",
    1: "DECREMENT"
}

const ProductCard2 = ({ title, description, veg, url1, product, fetchCartProducts, cartProducts, addons,setLoginTray }) => {
    const { userData } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [openAddonModal, setOpenAddonModal] = useState(false);
    const addToCart = async () => {
        try {
            setLoading(true)
            let response = await updateCart({ user_id: userData?._id, product_id: product?._id, count: 1 })
            fetchCartProducts();
        }
        catch (err) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const url = product?.image
    return (
        <div className={styles.container}>
            <div className={styles.section1_container}>
                <div className={styles.product_image_container}>
                    {product?.image?.length > 0 && <Image className={styles.product_image} src={url1} alt="product-image" width="120" height="120" />}
                </div>
                {
                    /* !cartProducts?.includes(product?._id) && */ <AddButton clickHandler={() => {
                        if(!userData?._id){
                            setLoginTray(true);
                            return;
                        }
                        if (!cartProducts?.includes(product?._id)) {
                            addToCart();
                        }
                        if (addons) {
                            setOpenAddonModal(true)
                        }
                    }
                    }
                        loading={loading}
                        cartProducts={cartProducts}
                        product={product}
                    />
                }
            </div>
            <div className={styles.product_details}>
                <div className={styles.product_title}>
                    <VegNonVeg type={veg ? "veg" : "non-veg"} /> {title}
                </div>
                <div className={styles.product_description}>
                    <div style={{ visibility: "hidden" }}><VegNonVeg type={veg ? "veg" : "non-veg"} /> </div> {description}
                </div>
                <div className={styles.product_description}>
                    {
                        addons && <><div style={{ visibility: "hidden" }}><VegNonVeg type={veg ? "veg" : "non-veg"} /> </div><i>Customisable</i></>
                    }
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
                        Rs.{product?.plate_price}
                    </div>
                </div>
            </div>
            <AddOnModal isModalOpen={openAddonModal} setIsModalOpen={setOpenAddonModal} addons={addons} product={product} addToCart={addToCart} />
        </div>
    )
}

export default ProductCard2