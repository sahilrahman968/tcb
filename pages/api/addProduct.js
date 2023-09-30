// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("tcp")

    const product = await db.collection("products").insertOne({
        id: new Date().getTime(),
        name: "bilahi"
    })
    res.status(200).json({ name: 'John Doe' })
}
  