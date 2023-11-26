const mongoose = require('mongoose');
const AddonSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    products: [
        {
            product_id: { type: String, required: true, unique: true},
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            is_veg: { type: Boolean },
            is_nonveg: { type: Boolean },
            person_price: { type: Number },
            plate_price: { type: Number },
        }
    ]
});
mongoose.models = {};
export default mongoose.model("Addon", AddonSchema);