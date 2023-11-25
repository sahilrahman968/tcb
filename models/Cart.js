const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user_id: { type: String, required: true},
  products: [
    {
      product_id: { type: String, required: true },
      count: {type: Number,required: true,default: 1}
    }
  ]
});

mongoose.models = {};
export default mongoose.model("Cart", CartSchema);