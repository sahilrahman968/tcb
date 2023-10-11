// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("tcp")
    try{
        const response = await db.collection("products").find({}).toArray();
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({error:"error fetching data"})
    }
}
  