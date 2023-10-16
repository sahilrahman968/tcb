import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";

const handler = async (req,res) => {
    let user =await User.findOne({email:req.query.email});
    res.status(200).json({user})
}
    

export default connectDb(handler);