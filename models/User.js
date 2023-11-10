const mongoose = require('mongoose');

const CartProduct = new mongoose.Schema({
    id: { type: String, required: true },
    count: { type: Number, required: true }
})

const UserSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    cart: [CartProduct]
}, { timestamps: true });
mongoose.models = {};
export default mongoose.model("User", UserSchema);