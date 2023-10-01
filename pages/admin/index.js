import React, { useState } from 'react'
import Form from '../../components/form/Form'

const index = () => {
  const [uploading , setUploading] = useState(false);
  const convertBase64 = (file) => {
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
          reject(error)
        }
    })
  }
  const submitHandler = async (data) => {
    try{
      setUploading(true);
      let base64img1,base64img2,base64img3;
      base64img1 = await convertBase64(data.image1);
      base64img2 = await convertBase64(data.image2);
      if(data.image3)
        base64img3 = await convertBase64(data.image3);

      let response = await fetch("/api/product/addProduct",{
        method:"post",
        body: JSON.stringify({...data, image1: base64img1, image2: base64img2, image3: base64img3})
      })

      response = await response.json()
    }
    catch(err){
      console.log(err);
    }
    finally{
      setUploading(false)
    }
  }
  return (
    <div>
        <Form submitHandler={submitHandler}/>
        {uploading && "Uploading..."}
    </div>
  )
}

export default index