const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userid:{type:String , required: true},
    name:{type:String , required: true},
    email:{type:String, required:true,unique:true},
    image:{type:String, required:true},
    cart:{type:[String]}
},{timestamps:true});
mongoose.models = {};
export default mongoose.model("User",UserSchema);