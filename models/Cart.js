/* {
    "id": string,
    "user_id": string,
    "products": [
      {
        "product_id": string,
        "quantity": number
      }
    ]
  }

  Add to Cart:

POST /api/cart
Request body: { "user_id", "product_id", "quantity" }
Remove from Cart:

DELETE /api/cart/:id
Request body: { "product_id" } */



const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type:String , required: true},
    description:{type:String , required: true},
    slug:{type:String, required:true,unique:true},
    img:{type:[String], required:true},
    sold_as: {type:Number , required: true},
    price: {type:Number , required: true},
    veg_non_veg: {type:Number , required: true},
    category: {type:Number , required: true}, //bakery/food
},{timestamps:true});

const ProductsSchema = new mongoose.Schema({
    product: ProductSchema,
    count: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
    email:{type:String , required: true},
    products: [ProductsSchema]
},{timestamps:true});


mongoose.models = {};
export default mongoose.model("Cart",CartSchema);