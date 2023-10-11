// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import clientPromise from "../../../lib/mongodb";

// export default async function handler(req, res) {
//     const client = await clientPromise;
//     const db = client.db("tcp")
//     try{
//         const response = await db.collection("products").findOne({ _id: new ObjectId("651961bb569c0be56338d3de") });
//         res.status(200).json({ ...response })
//     }catch(error){
//         console.log("ressss",res);
//         res.status(500).json({error:"error fetching data"})
//     }
// }
  
import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req,res) => {
    let products =await Product.find();
    res.status(200).json({products})
}
    

export default connectDb(handler);