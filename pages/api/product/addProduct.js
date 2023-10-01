// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../../lib/mongodb"

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
}

const uploadImage = (image) => {
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(image, opts, (error,result)=>{
            if(result && result.secure_url){
                return resolve(result.secure_url)
            }
            return reject({messsage: error.message})
        })
    })
}


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("tcp")
    let img_url1,img_url2,img_url3;
    const body = JSON.parse(req.body)
    try{
        console.log("req.body.image",req.body)
        img_url1 = await uploadImage(body.image1);
        img_url2 = await uploadImage(body.image2);
        if(body.image3)
            img_url3 = await uploadImage(body.image3);
    }
    catch(err){
        console.log("image upload error", err)
    }

    await db.collection("products").insertOne({
        createdAt: new Date().toDateString(),
        name: body.name,
        price: body.price,
        discountedPrice: body.discountedPrice || "",
        description: body.description,
        addOns:[],
        soldAs: body.soldAs,
        category:body.category,
        ratings: body.ratings,
        reviews: body.reviews,
        tag:[],
        url1: img_url1,
        url2: img_url2,
        url3: img_url3,
    })
    res.status(200).json({ name: 'John Doe' })
}
  