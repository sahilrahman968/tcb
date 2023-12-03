import CustomModal from 'components/customModal/CustomModal';
import React, { useState } from 'react'
import styles from "../../styles/AddOnModal.module.scss"
import VegNonVeg from 'components/vegNonVeg';
import { updateCart } from '../../apiConsumers/cart';
import { useUserContext } from '../../providers/UserContextProvider';

const ProductCard = ({product,clickHandler,selectedProducts}) => {
    console.log("productproduct",product)
    return <div className={styles.product_container} onClick={()=>{clickHandler(product)}}>
        <VegNonVeg type={product?.is_veg?"veg":""}/>
        <input className={styles.input_checkbox} type="checkbox" checked={selectedProducts?.findIndex(item=>item?._id === product?._id)>-1}/>
        <div className={styles.product_title}>{product?.title}</div>
        <div className={styles.product_price}>₹{product?.plate_price}/₹{product?.person_price}</div>
    </div>
}

const AddButton = () => {
    const { userData } = useUserContext();
    const addToCart = async () => {
        try {
            setLoading(true)
            let response = await updateCart({ user_id: userData?._id, product_id: "product?._id", count: 1 })
            fetchCartProducts();
        }
        catch (err) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return <div className={styles.add_button_container}>
        <div className={styles.content}>Total: 4 items</div>
        <div className={styles.content}>ADD ITEM/s</div>
    </div>
}

const AddOnModal = ({isModalOpen, setIsModalOpen,addons,product}) => {
    const [selectedProducts,setSelectedProducts] = useState([]);
    const clickHandler = (product) => {
        debugger
        const clone = [...selectedProducts];
        const index = clone?.findIndex((item)=>item?._id === product?._id);
        if(index > -1){
            clone.slice(index,1);
        }
        else{
            clone.push(product);
        }
        setSelectedProducts(clone);
    }
    console.log("selectedProducts",selectedProducts)
    return (
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={<div className={styles.modal_heading}><VegNonVeg type={product?.is_veg?"veg":""}/>{product?.title}</div>}>
            <div className={styles.container}>
                <div className={styles.header_separator}></div>
                <div className={styles.list_container}>
                    <div className={styles.list_heading}><div className={styles.list_heading_1}><div style={{visibility:"hidden"}}><VegNonVeg type="veg"/></div>Customise your order</div><div className={styles.list_heading_2}>{`(optional)`}</div></div>
                    <div className={styles.list_body}>
                        {
                            addons?.products?.map((product,index)=>{
                                return <ProductCard key={index} product={product} clickHandler={clickHandler} selectedProducts={selectedProducts}/>
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