import React from 'react'
import styles from "../../styles/ProductCard2.module.scss"
import VegNonVeg from 'components/vegNonVeg'
import { VEG } from 'Constants'
import Image from 'next/image'
import placeholder from "../../assets/placeholder-food.jpg"
import star from "../../assets/star.svg"
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const AddButton = ({ clickHandler }) => {
    return <div onClick={clickHandler} className={styles.add_button_container}>
        ADD
    </div>
}

const action = {
    0: "INCREMENT",
    1: "DECREMENT"
}

const ProductCard2 = ({ title, description, veg, url1, product }) => {
    console.log("product", product)
    const { data: session } = useSession()
    const userData = JSON.parse(localStorage.getItem("userData"));
    let cart = userData?.cart || [];

    const addToCart = async (action) => {
        console.log("clicked")
        try {
            const productId = product?.["_id"];
            console.log("productId",productId)
            const index = cart?.findIndex(product => product?.["id"] == productId);
            if (index > -1) {
                if (action === 0)
                    cart[index].count = cart[index].count + 1;
                else if (action === 1) {
                    if (cart[index].count) {
                        cart[index].count = cart[index].count - 1;
                    }
                }
            }
            else {
                if (action === 0){
                    console.log("clicked res",cart)
                    cart.push({ id: product?.["_id"], count: 1 })
                }
            }

            let response = await fetch("/api/user/updateCart", {
                method: "put",
                body: JSON.stringify({ cart: [...cart], email: session?.user?.email })
            })

            response = await response.json()
            let userData = await fetch(`/api/user/getUser?email=${session.user.email}`);
            userData = await userData.json();
            await localStorage.setItem("userData", JSON.stringify(userData?.user));
        }
        catch (err) {
            console.log("clicked error")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.section1_container}>
                <div className={styles.product_image_container}>
                    <Image className={styles.product_image} src={url1 || placeholder} alt="product-image" width="120" height="120" />
                </div>
                <AddButton clickHandler={() => { addToCart(0) }} />
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