import React, { useEffect, useState } from 'react'
import styles from "../../styles/ProductsSection.module.scss"
import Image from 'next/image'
import AddProductModal from '../modals/AddProductModal'
import { deleteProducts, fetchProducts } from '../../apiConsumers/products'
import edit from "../../assets/edit.png"
import dlt from "../../assets/delete.png"

const modalType = {
    ADD: "ADD",
    EDIT: "EDIT"
}
const ProductsSection = () => {
    const [openModal, setOpenModal] = useState(false)
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await fetchProducts();
            setProducts([...response])
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    const deleteHandler = async (productId) => {
        try{
            await deleteProducts({productId:productId})
            getProducts();
        }
        catch(err){

        }
    }
    return (
        <div className={styles.products_section_container} >
            <div className={styles.add_btn} onClick={() => { setOpenModal(true) }}>
                Add New
            </div>
            <div className={styles.products_container}>
                {
                    products?.map((product, index) => {
                        return <div className={styles.products_card_container} key={index}>
                            <div className={styles.product_image}>
                                <Image src={product?.image} width={80} height={80} />
                            </div>
                            <div className={styles.product_title}>
                                {product?.title}
                            </div>
                            <div className={styles.icon_container}>
                                <div>
                                    <Image src={edit} height={20} width={20} />
                                </div>
                                <div onClick={()=>{deleteHandler(product?._id)}}>
                                    <Image src={dlt} height={20} width={20} />
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <AddProductModal open={openModal} setOpen={setOpenModal} />
        </div>
    )
}

export default ProductsSection