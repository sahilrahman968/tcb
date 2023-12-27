import React, { useEffect, useState } from 'react'
import styles from "../../styles/Admin.module.scss"
import ProductCard2 from 'components/productCard/ProductCard2'
import SearchInputV2 from 'components/SearchInputV2/SearchInputV2'
import MultiSelectDropdown from 'components/MultiSelectDropdown/MultiSelectDropdown'
import { BAKERY, BOTH_PERSON_PLATE, FOOD, NON_VEG, PER_PERSON, PER_PLATE, VEG } from 'Constants'
import ImageUploader from 'components/ImageUploader'
import VegNonVeg from 'components/vegNonVeg'
import { Spin } from 'antd'
import { showFailToast, showSuccessToast } from 'heperFunctions'
import Footer from '../../components/footer'
import CircularLoader from '../../components/circularLoader'

const ProductForm = ({ index: parentIndex, setProductContent, productContent }) => {
  const [formState, setFormState] = useState([]);
  const [image1Loading, setImage1Loading] = useState(false);
  const [image2Loading, setImage2Loading] = useState(false);

  const initializeFormState = () => {
    setFormState({
      title: "",
      description: "",
      slug: "",
      img: []/* { type: [String], required: true } */,
      sold_as: { id: "", title: "" }/* { type: Number, required: true } */,
      // per_plate_price: {id:"",title:""},
      // per_person_price: { type: Number },
      veg_non_veg: { id: "", title: "" },
      category: { id: "", title: "" }
    })
  }
  const getValue = (key) => formState[key]
  const setValue = (key, value, index) => {
    const clone = { ...formState }
    if (key === "img") {
      clone[key][index] = value
    } else {
      clone[key] = value;
    }
    setFormState({ ...clone })
    let productContentClone = [...productContent];
    productContentClone[parentIndex] = clone;
    setProductContent([...productContentClone]);
  }
  const deleteProduct = () => {
    let clone = [...productContent];
    clone.splice(parentIndex, 1);
    setProductContent([...clone])
  }

  useEffect(() => {
    initializeFormState();
  }, [])
  return <div className={styles.content_card}>
    {productContent?.length > 1 && <div className={styles.close_button} onClick={deleteProduct}>x</div>}
    <div className={styles.card_content}>
      <div className={styles.section}>
        <div className={styles.title}>Product Title</div>
        <SearchInputV2
          height="40px"
          value={getValue("title")}
          onSearch={(value) => { setValue("title", value) }}
          fontsize="14px"
          maxCharacter={30}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Food/Bakery</div>
        <MultiSelectDropdown
          height="35px"
          options={[{ id: FOOD, title: "Food" }, { id: BAKERY, title: "Bakery" }]}
          selectedOptions={getValue("category")?.id ? [getValue("category")] : []}
          onSelect={(value) => { setValue("category", value) }}
          selectionType="single"
          fontsize="14px"
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Veg/Non-Veg</div>
        <MultiSelectDropdown
          height="35px"
          options={[{ id: VEG, title: <div className={styles.dropdown_option}><VegNonVeg type="veg" /> Veg</div> }, { id: NON_VEG, title: <div className={styles.dropdown_option}><VegNonVeg type="non-veg" /> Non-Veg</div> }]}
          selectedOptions={getValue("veg_non_veg")?.id ? [getValue("veg_non_veg")] : []}
          onSelect={(value) => { setValue("veg_non_veg", value) }}
          selectionType="single"
          fontsize="14px"
        />
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Description</div>
        <SearchInputV2
          height="40px"
          value={getValue("description")}
          onSearch={(value) => { setValue("description", value) }}
          fontsize="14px"
          maxCharacter={100}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Sold As</div>
        <MultiSelectDropdown
          height="35px"
          options={[{ id: PER_PLATE, title: "Per Plate" }, { id: PER_PERSON, title: "Per Person" }, { id: BOTH_PERSON_PLATE, title: "Both" }]}
          selectedOptions={getValue("sold_as")?.id ? [getValue("sold_as")] : []}
          onSelect={(value) => { setValue("sold_as", value) }}
          selectionType="single"
          fontsize="14px"
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Image 1</div>
        <ImageUploader imageLoading={image1Loading} height="40px" setLoading={setImage1Loading} setUrl={(url) => { setValue("img", url, 0) }} error={!formState?.["img"]?.[0]?.length} />
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Slug</div>
        <SearchInputV2
          height="40px"
          value={getValue("slug")}
          onSearch={(value) => { setValue("slug", value) }}
          fontsize="14px"
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Price</div>
        <SearchInputV2 height="40px" />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Image 2</div>
        <ImageUploader imageLoading={image2Loading} height="40px" setLoading={setImage2Loading} setUrl={(url) => { setValue("img", url, 1) }} error={!formState?.["img"]?.[1]?.length} />
      </div>
    </div>
    <div className={styles.preview}>
      <ProductCard2 title={getValue("title")} description={getValue("description")} veg={getValue("veg_non_veg")?.id === VEG} url1={getValue("img")?.length ? getValue("img")?.[0] : ""} />
    </div>
  </div>
}
const sidemenu_tabs = [
  { id: 0, title: "Add New Products" },
  { id: 1, title: "Update Existing Products" },
  { id: 2, title: "View All Products" },
]
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [productContent, setProductContent] = useState([{}]);
  const [uploading,setUploading] = useState(false)

  const addMoreHandler = () => {
    let clone = [...productContent, {}];
    setProductContent([...clone])
  }

  const addProductsHandler = async (data) => {
    //validation and toast
    setUploading(true)
    try{
      let products = productContent?.map((p,index)=>{
          return {
            ...p,
            veg_non_veg : p?.veg_non_veg?.id,
            sold_as : p?.sold_as?.id,
            category : p?.category?.id
          }
      })
      let response = await fetch("/api/product/addProducts",{
        method:"post",
        body: JSON.stringify([...products] )
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

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.sidemenu}>
          {
            sidemenu_tabs?.map((tab, index) => {
              return <div onClick={() => { setActiveTab(tab) }} style={activeTab?.id === index ? { backgroundColor: "#3144ba", color: "#FFF" } : {}} key={index} className={styles.option}>{tab?.title}</div>
            })
          }
          <div className={styles.submit} onClick={addProductsHandler}>{uploading ? <CircularLoader/> : "Add Products"}</div>
          {/* <div className={styles.option}></div> */}
        </div>
        <div className={styles.content}>
          {
            activeTab?.id === 0 && <>
              {
                productContent?.map((_, index) => {
                  return <ProductForm key={index} index={index} setProductContent={setProductContent} productContent={productContent} />
                })
              }
              <div className={styles.add_more} onClick={addMoreHandler}>+Add more</div>
            </>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard
