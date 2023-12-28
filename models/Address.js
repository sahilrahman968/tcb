const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    address: [
        {
            line_1: { type: String, required: true },
            line_2: { type: String, required: true },
            line_3: { type: String, required: true },
            mob: { type: String, required: true },
            nick_name: { type: String, required: true },
        }
    ]
});

mongoose.models = {};
export default mongoose.model("Cart", AddressSchema);