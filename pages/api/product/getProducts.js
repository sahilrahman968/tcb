import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    const {page_no,pageSize,ids,veg_non_veg,category,title} = req.query;
    const filter = ids?.length||veg_non_veg||category||title ? { _id:{ $in: ids },veg_non_veg,category,title } : {};
    await Product.find(filter)
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