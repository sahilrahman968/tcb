// import React, { useEffect, useState } from 'react'
// import Form from '../../components/form/Form'

// const Admin = () => {
//   const [uploading , setUploading] = useState(false);
//   const convertBase64 = (file) => {
//     return new Promise((resolve,reject)=>{
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);

//         fileReader.onload = () => {
//           resolve(fileReader.result)
//         }

//         fileReader.onerror = (error) => {
//           reject(error)
//         }
//     })
//   }
//   const submitHandler = async (data) => {
//     try{
//       setUploading(true);
//       let base64img1,base64img2,base64img3;
//       base64img1 = await convertBase64(data.image1);
//       base64img2 = await convertBase64(data.image2);
//       if(data.image3)
//         base64img3 = await convertBase64(data.image3);

//       let response = await fetch("/api/product/addProducts",{
//         method:"post",
//         body: JSON.stringify([{...data, img:[base64img1,base64img2],slug:new Date().getTime()}] )
//       })

//       response = await response.json()
//     }
//     catch(err){
//       console.log(err);
//     }
//     finally{
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//         <Form submitHandler={submitHandler} submitting={uploading}/>
//     </div>
//   )
// }

// export default Admin

import ProductCard from "components/productCard";
import styles from "../../styles/Admin.module.scss"
import { useRouter } from "next/router"
import IntroCard from "components/introCard";

const Admin = () => {
  const router = useRouter();
  const clickHandler = (num) => {
    switch(num){
      case 1 : {
        router.push('/admin/add-products')
        break;
      }
      case 2 : {
        router.push('/admin/edit-products')
        break;
      }case 3 : {
        router.push('/admin/all-products')
        break;
      }
    }
  }
  return <div className={styles.page_container}>
    <div className={styles.heading}>Welcome Upasana</div>
    <div className={styles.sub_heading}>Admin Dashboard</div>
    <div className={styles.button_container}>
      <div className={styles.btn_container} onClick={()=>{clickHandler(1)}}>
        Add New Product/s
      </div>
      <div className={styles.btn_container} onClick={()=>{clickHandler(2)}}>
        Update Existing Product/s
      </div>
      <div className={styles.btn_container} onClick={()=>{clickHandler(3)}}>
        View All Products
      </div>
    </div>
  </div>
}

export default Admin
