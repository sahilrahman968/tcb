const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type:String , required: true},
    description:{type:String , required: true},
    slug:{type:String, required:true,unique:true},
    img:{type:[String], required:true},
    sold_as: {type:Number , required: true},
    per_plate_price: {type:Number},
    per_person_price: {type:Number},
    veg_non_veg: {type:Number , required: true},
    category: {type:Number , required: true}, //bakery/food
    /* wishlist_count: {type:Number},
    sold_count: {type:Number}, */
},{timestamps:true});
mongoose.models = {};
export default mongoose.model("Product",ProductSchema);