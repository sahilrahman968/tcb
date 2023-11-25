import styles from "../../styles/AddProductModal.module.scss"
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Select,
    Spin,
} from 'antd';
import ImageUploader from "../ImageUploader/index"
import ProductCard2 from "../productCard/ProductCard2"
import Image from "next/image";
const { TextArea } = Input;
import { showFailToast, showSuccessToast } from 'heperFunctions'

const AddProductModal = (props) => {
    const { open, setOpen } = props;
    const [imageLoading, setImageLoading] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [productDetails, setProductDetails] = useState(
        {
            title: "",
            description: "",
            image: "",
            is_plate: false,
            is_person: false,
            plate_price: "",
            person_price: "",
            is_veg: false,
            is_nonveg: false,
            is_bakery: false,
            is_food: false,
            is_assamese: false
        }
    )
    const productDetailsSetter = (key, value) => {
        const clone = { ...productDetails }
        clone[key] = value;
        setProductDetails(clone);
    }

    const productDetailsGetter = (key) => {
        return productDetails[key]
    }

    const submitHandler = (value) => {
        const clone = { ...productDetails, ...value }
        if(!clone?.is_food){
            clone.is_bakery = true;
        }
        if(!clone?.is_veg){
            clone.is_nonveg = true;
        }
        console.log("valuevaluevalue",value)
        setProductDetails(clone)
        setPreviewMode(true);
    }

    const addProductHandler = async (data) => {
        //validation and toast
        setUploading(true)
        try{
          let response = await fetch("/api/product/addProducts",{
            method:"post",
            body: JSON.stringify([productDetails])
          })
    
          response = await response.json()
          setUploading(false)
          showSuccessToast("Products Uploaded!")
        }
        catch(err){
          setUploading(false)
          showFailToast("Failed!Try again")
        }
      }

    const [previewMode, setPreviewMode] = useState(false);

    return (
        <>
            {
                open &&
                <div className={styles.container}>
                    {
                        previewMode &&
                        <> 
                        <ProductCard2 title={productDetailsGetter("title")} description={productDetailsGetter("description")} veg={productDetailsGetter("is_veg")} url1={productDetailsGetter("image")} />
                        <div>
                            <Button onClick={addProductHandler}>{uploading ? <Spin/>:"Add Product"}</Button>
                            <Button onClick={()=>setPreviewMode(false)}>Close Preview</Button>
                        </div>
                        </>
                    }
                    {
                        !previewMode &&
                        <>
                            {
                                productDetailsGetter("image")?.length > 0 && <Image src={productDetailsGetter("image")} height={140} width={140} />
                            }
                            <ImageUploader
                                imageLoading={imageLoading}
                                height="40px"
                                setLoading={setImageLoading}
                                setUrl={(url) => { productDetailsSetter("image", url) }}
                            />
                            {
                                productDetailsGetter("image")?.length > 0 &&
                                <Form
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 14,
                                    }}
                                    layout="horizontal"
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    onFinish={(values) => { submitHandler(values) }}
                                >
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter product title!',
                                        },
                                    ]} label="Product Title" name="title">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter product description!',
                                        },
                                    ]} label="Description" name="description">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Is sold per plate?" name="is_plate" valuePropName="checked">
                                        <Checkbox>Checkbox</Checkbox>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Price/plate" name="plate_price">
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Is sold per person?" name="is_person" valuePropName="checked">
                                        <Checkbox>Checkbox</Checkbox>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Price/person" name="person_price">
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Veg/Non-veg" name="is_veg">
                                        <Select>
                                            <Select.Option value={true}>Veg</Select.Option>
                                            <Select.Option value={false}>Non-Veg</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Food/Bakery" name="is_food">
                                        <Select>
                                            <Select.Option value={true}>Food</Select.Option>
                                            <Select.Option value={false}>Bakery</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]} label="Is Assamese?" name="is_assamese" valuePropName="checked">
                                        <Checkbox>Checkbox</Checkbox>
                                    </Form.Item>
                                    <Button htmlType="submit">Preview</Button>
                                </Form>
                            }
                        </>}
                    <div className={styles.close_cta} onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(false) }}>CLOSE</div>
                </div>
            }
        </>

    )
}

export default AddProductModal