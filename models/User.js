const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    image: { type: String, required: true },
    is_admin: { type: Boolean, default: false}
}, { timestamps: true });
mongoose.models = {};
export default mongoose.model("User", UserSchema);