import Addon from "../../../models/Addon";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
    const { method, query } = req;
  
    switch (method) {
      case 'GET':
        try {
          const { product_id } = query;
          if (!product_id) {
            return res.status(400).json({ error: 'Product ID is required' });
          }
          const addons = await Addon.findOne({ product_id });
          if (!addons) {
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