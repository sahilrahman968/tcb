const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  is_plate: {
    type: Boolean,
    default: false
  },
  is_person: {
    type: Boolean,
    default: false
  },
  plate_price: {
    type: Number,
    default: 0
  },
  person_price: {
    type: Number,
    default: 0
  },
  is_veg: {
    type: Boolean,
    default: false
  },
  is_nonveg: {
    type: Boolean,
    default: false
  },
  is_bakery: {
    type: Boolean,
    default: false
  },
  is_food: {
    type: Boolean,
    default: false
  },
  is_assamese: {
    type: Boolean,
    default: false
  }
});
mongoose.models = {};
export default mongoose.model("Product",ProductSchema);

