const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1, required: true }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });
mongoose.models = {};
export default mongoose.model("Order", OrderSchema);


/* 

            {
  "id": string,
  "user_id": string,
  "products": [
    {
      "product_id": string,
      "quantity": number
    }
  ],
  "total_amount": number,
  "order_date": timestamp
}


Place Order:
POST /api/orders
Request body: { "user_id", "products" }

*/