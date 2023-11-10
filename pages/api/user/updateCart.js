import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
    if (req.method == 'PUT') {
        const {email,cart} = JSON.parse(req.body);
        console.log("xyz",email)
        if(!email){
            return res.status(400).json({message:"email required"})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        user.cart = cart;
        await user.save();

        return res.status(200).json({message:"cart updated"})
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)