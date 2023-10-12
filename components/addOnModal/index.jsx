import CustomModal from 'components/customModal/CustomModal';
import React, { useState } from 'react'
import styles from "../../styles/AddOnModal.module.scss"
import VegNonVeg from 'components/vegNonVeg';

const ProductCard = () => {
    return <div className={styles.product_container}>
        <VegNonVeg type="veg"/>
        <input className={styles.input_checkbox} type="checkbox"/>
        <div className={styles.product_title}>Tandoori Masala Dip</div>
        <div className={styles.product_price}>₹24/₹25</div>
    </div>
}

const AddButton = () => {
    return <div className={styles.add_button_container}>
        <div className={styles.content}>Total: 4 items</div>
        <div className={styles.content}>ADD ITEM/s</div>
    </div>
}

const AddOnModal = ({isModalOpen, setIsModalOpen}) => {
    return (
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={<div className={styles.modal_heading}><VegNonVeg type="veg"/>Baileys Irish Cream</div>}>
            <div className={styles.container}>
                <div className={styles.header_separator}></div>
                <div className={styles.list_container}>
                    <div className={styles.list_heading}><div className={styles.list_heading_1}><div style={{visibility:"hidden"}}><VegNonVeg type="veg"/></div>Customise your order</div><div className={styles.list_heading_2}>{`(optional)`}</div></div>
                    <div className={styles.list_body}>
                        {
                            new Array(15).fill("").map((_,index)=>{
                                return <ProductCard key={index}/>
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