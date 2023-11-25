import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

// const handler = async (req,res) => {
//     if(req.method == 'POST'){
//         for(let i =0; i < req.body.length; i++){
//             let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
//         }
//         res.status(200).json({"success":"Product/s updated successfully"})
//     }
//     else{
//         res.status(400).json({error: 'This method is not allowed'})
//     }
// }

// export default connectDb(handler)

// pages/api/products/edit/[productId].js
// import { connectToDatabase } from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // const { db } = await connectToDatabase();
    // const collection = db.collection('products');

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.query.productId },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    res.status(200).json(updatedProduct.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export default connectDb(handler)
