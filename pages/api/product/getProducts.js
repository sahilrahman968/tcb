import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    const pageSize = 20; // Number of items per page
    const {page_no} = req.query;
    await Product.find()
        .skip((page_no - 1) * pageSize)
        .limit(pageSize)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            res.status(400).json({ err })
        });
}


export default connectDb(handler);