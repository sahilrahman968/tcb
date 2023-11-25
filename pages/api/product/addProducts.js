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
    const body = JSON.parse(req.body);

    if(req.method == 'POST'){
        for(let i =0; i < body.length; i++){
            // const imageUrl = await uploadImage(body[i].image);
            let p = new Product({
                title: body[i].title,
                description: body[i].description,
                is_plate: body[i].is_plate,
                is_person: body[i].is_person,
                plate_price: body[i].plate_price,
                person_price: body[i].person_price,
                is_veg: body[i].is_veg,
                is_nonveg: body[i].is_nonveg,
                is_bakery: body[i].is_bakery,
                is_food: body[i].is_food,
                is_assamese: body[i].is_assamese,
                image: body[i].image,
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