import Addon from "../../../models/Addon";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const product_ids = JSON.parse(query?.product_ids)

        if (!product_ids || !Array.isArray(product_ids) || product_ids.length === 0) {
          return res.status(400).json({ error: 'Product IDs are required as an array' });
        }

        const addons = await Addon.find({ product_id: { $in: product_ids } });
        if (!addons || addons.length === 0) {
          return res.status(404).json({ error: 'Add-ons not found' });
        }
        return res.status(200).json(addons);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

export default connectDb(handler);