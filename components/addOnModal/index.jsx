import CustomModal from 'components/customModal/CustomModal';
import React, { useState } from 'react'
import styles from "../../styles/AddOnModal.module.scss"
import VegNonVeg from 'components/vegNonVeg';

const ProductCard = ({product}) => {
    return <div className={styles.product_container}>
        <VegNonVeg type={product?.is_veg?"veg":""}/>
        <input className={styles.input_checkbox} type="checkbox"/>
        <div className={styles.product_title}>{product?.title}</div>
        <div className={styles.product_price}>₹{product?.plate_price}/₹{product?.person_price}</div>
    </div>
}

const AddButton = () => {
    return <div className={styles.add_button_container}>
        <div className={styles.content}>Total: 4 items</div>
        <div className={styles.content}>ADD ITEM/s</div>
    </div>
}

const AddOnModal = ({isModalOpen, setIsModalOpen,addons,product}) => {
    return (
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={<div className={styles.modal_heading}><VegNonVeg type={product?.is_veg?"veg":""}/>{product?.title}</div>}>
            <div className={styles.container}>
                <div className={styles.header_separator}></div>
                <div className={styles.list_container}>
                    <div className={styles.list_heading}><div className={styles.list_heading_1}><div style={{visibility:"hidden"}}><VegNonVeg type="veg"/></div>Customise your order</div><div className={styles.list_heading_2}>{`(optional)`}</div></div>
                    <div className={styles.list_body}>
                        {
                            addons?.products?.map((product,index)=>{
                                return <ProductCard key={index} product={product}/>
                            })
                        }
                    </div>
                </div>
                <AddButton/>
            </div>
        </CustomModal>
    )
}

export default AddOnModal