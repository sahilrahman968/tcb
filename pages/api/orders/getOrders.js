import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filter = {};
      if (req.query.status_id) {
        filter.status_id = parseInt(req.query.status_id, 10);
      }
      if (req.query.user_id) {
        filter.user_id = req.query.user_id;
      }

      const orders = await Order.find(filter);

      res.status(200).json({ success: true, data: orders?.reverse() });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

export default connectDb(handler)
