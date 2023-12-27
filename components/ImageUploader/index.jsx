import React, { useEffect } from 'react'
import styles from "../../styles/ImageUploader.module.scss"
// import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from "axios";
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showFailToast, showSuccessToast } from 'heperFunctions';
import CircularLoader from '../circularLoader';


const ImageUploader = ({ imageLoading, setLoading, setUrl, error }) => {
  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const maxSizeInBytes = 1048576;
    if (file && file.size <= maxSizeInBytes) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset name

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dq0y5qcbv/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setUrl(response.data.url);
        setLoading(false)
        showSuccessToast("Image Uploaded!")
        e.target.value = null;
      } catch (error) {
        setLoading(false)
        showFailToast("Failed! Try again")
        e.target.value = null;
      }
    } else {
      showFailToast("File size exceeds the limit (1 MB). Please select a smaller file.")
      setLoading(false);
      e.target.value = null;
    }

    // Check if a file was selected
    // if (file) {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset name

    //   try {
    //     const response = await axios.post(
    //       `https://api.cloudinary.com/v1_1/dq0y5qcbv/image/upload`,
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );

    //     setUrl(response.data.url);
    //     setLoading(false)
    //     showSuccessToast("Image Uploaded!")
    //   } catch (error) {
    //     // console.error('Error uploading image to Cloudinary:', error);
    //     setLoading(false)
    //     showFailToast("Failed! Try again")
    //   }
    // }
  };

  return (
    <div className={styles.container} style={{ borderColor: error ? "red" : "green" }}>
      {
        imageLoading ? <CircularLoader /> :
          <>
            Upload Image
            <input accept=".webp, .avif, .png, .jpg, .jpeg, .svg" type="file" onChange={(e) => { handleImageUpload(e) }} />
          </>
      }
      <ToastContainer />
    </div>
  )
}

export default ImageUploader