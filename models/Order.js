const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true }
});

const addressSchema = new mongoose.Schema({
    location: { type: String, required: true },
    pin: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_number: { type: String, required: true },
    user_email: { type: String, required: true },
    status_id: { type: Number, required: true },
    placed_on: { type: String, required: true },
    delivery_on: { type: String, required: true },
    delivery_mode: { type: Number, required: true },
    products: { type: [productSchema], required: true },
    address: { type: addressSchema, required: true }
});

// Create a Mongoose model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
