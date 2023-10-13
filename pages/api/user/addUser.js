import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
    if (req.method == 'POST') {
        const user = new User({
            userid: req.body.userid,
            email: req.body.userid,
            name: req.body.name,
            image: req.body.image
        })
        try{
            await user.save();
            res.status(200).json({ success: "user added successfully" })
        }
        catch(err){
            res.status(500).json({ error: err })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)