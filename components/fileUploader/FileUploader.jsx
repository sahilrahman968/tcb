import React, { useState } from 'react'
import styles from "./FileUploader.module.scss"

const FileUploader = ({onUpload,required=false}) => {
  const [uploadedFileName , setUploadedFileName] = useState(false);  
  return (
    <>
        <div className={styles.container}>
            <span className={styles.add_button}>+</span>
            {
                required ? 
                <input
                    type="file"
                    id="image3"
                    name="image3"
                    onChange={(e)=>{onUpload(e.target.files[0]); setUploadedFileName(e.target.files[0]?.name);}}
                    required
                    title=""
                />:
                <input
                    type="file"
                    id="image3"
                    name="image3"
                    onChange={(e)=>{onUpload(e.target.files[0]); setUploadedFileName(e.target.files[0]?.name)}}
                    title=""
                />
            }
        </div>
        <span className={styles.subtext}>{uploadedFileName ? `${uploadedFileName} is uploaded` : ""}</span>
    </>

  )
}

export default FileUploader