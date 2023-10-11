import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

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

const handler = async (req,res) => {
    const body = JSON.parse(req.body)
    if(req.method == 'POST'){
        for(let i =0; i < body.length; i++){
            const promiseArr = [];
            for(let j = 0; j < Math.min(body[i].img.length,3); j++){
                promiseArr.push(uploadImage(body[i].img[j]))
            }
            const imageUrls = await Promise.all(promiseArr);
            let p = new Product({
                title: body[i].title,
                description: body[i].description,
                img: imageUrls,
                slug: body[i].slug,
                sold_as: body[i].sold_as,
                per_plate_price: body[i].per_plate_price,
                per_person_price: body[i].per_person_price,
                veg_non_veg: body[i].veg_non_veg,
                category: body[i].category,
            })
            await p.save();
        }
        res.status(200).json({success:"product/s added successfully"})
    }
    else{
        res.status(400).json({error:"This method is not allowed"})
    }
}

export default connectDb(handler)