import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        if (req?.body?.orderId) {
          const { orderId, updatedOrder } = req.body;
          const existingOrder = await Order.findByIdAndUpdate(
            orderId,
            updatedOrder,
            { new: true }
          );
          if (!existingOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
          }
          res.status(200).json({ success: true, data: existingOrder });
        } else {
          const newOrder = new Order(req.body);
          const savedOrder = await newOrder.save();
          res.status(201).json({ success: true, data: savedOrder });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }

export default connectDb(handler)