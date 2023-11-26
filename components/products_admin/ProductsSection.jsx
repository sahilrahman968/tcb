import React, { useEffect, useState } from 'react'
import styles from "../../styles/ProductsSection.module.scss"
import Image from 'next/image'
import AddProductModal from '../modals/AddProductModal'
import { deleteProducts, fetchProducts } from '../../apiConsumers/products'
import edit from "../../assets/edit.png"
import dlt from "../../assets/delete.png"
import close from "../../assets/close.png"
import { Button } from 'antd'
import { fetchAddons, manageAddon } from '../../apiConsumers/addons'

const modalType = {
    ADD: "ADD",
    EDIT: "EDIT"
}
const ProductsSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [addOnMenu,setAddOnMenu] = useState(false);
    const [products, setProducts] = useState([])
    const [addons,setAddons] = useState([]);
    const [productId,setProductId] = useState(null)
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

    const getAddons=async (productId)=>{
        try{
            const response = await fetchAddons([productId]);
            if(response?.[0]?.products?.length){
                setAddons(response?.[0]?.products)
            }
            else{
                setAddons([])
            }
        }
        catch(err){
            setAddons([])
        }
    }

    const deleteHandler = async (productId) => {
        try{
            deleteProducts({productId:productId})
            const timeout = setTimeout(()=>{getProducts();},500)
        }
        catch(err){

        }
    }
    
    const updateAddonHandler = (product) => {
        const index = addons?.findIndex(addon=>addon?.product_id === product?._id)
        if(index > -1){
            const clone = [...addons];
            clone.splice(index,1)
            setAddons(clone)
        }
        else{
            const clone = [...addons];
            clone.push(
                {
                    "product_id":product?._id,
                    "title": product?.title,
                    "description": product?.description,
                    "image": product?.image,
                    "is_veg": product?.is_veg,
                    "is_nonveg": product?.is_nonveg,
                    "person_price": product?.person_price,
                    "plate_price": product?.plate_price
                  }
            )
            setAddons(clone)
        }
        
    }

    const submitAddonHandler = async () => {
        try{
            const response = await manageAddon({product_id:productId,products:addons})    
        }
        catch(err){

        }
    }

    const resetStates = () => {
        setOpenModal(false);
        setAddOnMenu(false);
        // setProducts([]);
        setAddons([]);
        setProductId(null)
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
                                <Button onClick={()=>{getAddons(product?._id);setProductId(product?._id);setAddOnMenu(true)}}>Add On</Button>
                                {
                                    addOnMenu && <div className={styles.addon_menu_container}>
                                        <h4>Select Add Ons</h4>
                                        <div className={styles.products_container}>
                                        {
                                            products?.map((product)=>{
                                                return <div className={styles.addon_item} key={product?._id} onClick={()=>{updateAddonHandler(product)}}>
                                                    <Image className={styles.close} width={20} height={20} src={close} alt="" onClick={()=>{resetStates()}}/>
                                                    <input type="checkbox" checked={addons?.find(addon=>{return addons?.map(addon=>addon?.product_id)?.includes(product?._id)})}/>
                                                    <Image src={product?.image} width={60} height={60} />
                                                    <div>{product?.title}</div>
                                                </div>
                                            })
                                        }
                                        <Button onClick={()=>{submitAddonHandler()}}>Update Add-ons</Button>
                                        </div>
                                    </div>
                                }
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
            <AddProductModal open={openModal} setOpen={setOpenModal} resetStates={resetStates}/>
        </div>
    )
}

export default ProductsSection