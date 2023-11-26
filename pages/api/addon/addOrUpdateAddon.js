import Addon from "../../../models/Addon";
import connectDb from "../../../middleware/mongoose";

// async function handler(req, res) {
//   const { method, body } = req;

//   if (method !== 'POST') {
//     return res.status(405).json({ error: `Method ${method} Not Allowed` });
//   }

//   try {
//     const { product_id, updatedAddon } = body;
//     if (!product_id) {
//       return res.status(400).json({ error: 'Product ID is required' });
//     }

//     let addon = await Addon.findOne({ product_id });
//     if (!addon) {
//       addon = new Addon(body);
//     } else {
//       addon.set(updatedAddon);
//     }
//     const savedAddon = await addon.save();
//     return res.status(201).json(savedAddon);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { product_id, products } = req.body;

    if (!product_id || !products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    let addon = await Addon.findOne({ product_id });
    if (!addon) {
      addon = new Addon({
        product_id,
        products,
      });
    } else {
      addon.products=[...products];
    }

    const savedAddon = await addon.save();
    return res.status(201).json(savedAddon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler);
