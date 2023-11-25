import Calendar from "../../../models/Calendar";
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
    if (req.method == 'POST') {
        const booking = new Calendar({
            date:req.body.date,
            slot:req.body.slot_id
        })
        try{
            await booking.save();
            res.status(200).json({ success: "booking added successfully" })
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