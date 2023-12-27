import CustomModal from 'components/customModal/CustomModal';
import React, { useState } from 'react'
import styles from "../../styles/AddOnModal.module.scss"
import VegNonVeg from 'components/vegNonVeg';
import { updateCart } from '../../apiConsumers/cart';
import { useUserContext } from '../../providers/UserContextProvider';
import CircularLoader from '../circularLoader';

const ProductCard = ({ product, clickHandler, selectedProducts }) => {
    console.log("vvvvvvv",{product,selectedProducts, name: product?.title ,condition: selectedProducts?.findIndex(item => item?.product_id === product?.product_id) !== -1})
    return <div className={styles.product_container} onClick={(e) => { e.preventDefault(); e.stopPropagation(); clickHandler(product) }}>
        <VegNonVeg type={product?.is_veg ? "veg" : ""} />
        <input className={styles.input_checkbox} type="checkbox" checked={selectedProducts?.findIndex(item => item?.product_id === product?.product_id) !== -1} />
        <div className={styles.product_title}>{product?.title}</div>
        <div className={styles.product_price}>₹{product?.plate_price}/₹{product?.person_price}</div>
    </div>
}

const AddButton = ({selectedProducts,setIsModalOpen}) => {
    const { userData } = useUserContext();
    const [loading,setLoading] = useState(false)
    const addToCart = async () => {
        try {
            setLoading(true)
            let response = await updateCart({ user_id: userData?._id, product_id: selectedProducts?.map(product=>product?.product_id)?.join(), count: 1 })
            // fetchCartProducts();
        }
        catch (err) {
            setLoading(false)
            setIsModalOpen(false)
        }
        finally {
            setLoading(false)
            setIsModalOpen(false)
        }
    }
    return <div className={styles.add_button_container}>
        <div className={styles.content}>Total: {selectedProducts?.length} items</div>
        <div className={styles.content} onClick={addToCart}>{loading ? <CircularLoader/>:"ADD"}</div>
    </div>
}

const AddOnModal = ({ isModalOpen, setIsModalOpen, addons, product }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const clickHandler = (product) => {
        let index = selectedProducts.findIndex(item => item?._id === product?._id);
        let clone = [...selectedProducts];
        console.log("index",index)
        if (index === -1) {
            clone.push(product);
                setSelectedProducts(clone)
        }
        else{
            clone.splice(index,1);
                setSelectedProducts(clone)
        }
    }
    console.log("selectedProducts", selectedProducts)
    return (
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={<div className={styles.modal_heading}><VegNonVeg type={product?.is_veg ? "veg" : ""} />{product?.title}</div>}>
            <div className={styles.container}>
                <div className={styles.header_separator}></div>
                <div className={styles.list_container}>
                    <div className={styles.list_heading}><div className={styles.list_heading_1}><div style={{ visibility: "hidden" }}><VegNonVeg type="veg" /></div>Customise your order</div><div className={styles.list_heading_2}>{`(optional)`}</div></div>
                    <div className={styles.list_body}>
                        {
                            addons?.products?.map((product, index) => {
                                return <ProductCard key={index} product={product} clickHandler={clickHandler} selectedProducts={selectedProducts} />
                            })
                        }
                    </div>
                </div>
                <AddButton selectedProducts={selectedProducts} setIsModalOpen={setIsModalOpen}/>
            </div>
        </CustomModal>
    )
}

export default AddOnModal