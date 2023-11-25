// pages/api/updateOrderStatus/[orderId].js
import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  const {
    query: { orderId },
    method,
  } = req;

  switch (method) {
    case 'PUT':
      try {
        const { status_id } = req.body;

        if (!status_id) {
          return res.status(400).json({ success: false, error: 'Status ID is required.' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { status_id },
          { new: true, runValidators: true }
        );

        if (!updatedOrder) {
          return res.status(404).json({ success: false, error: 'Order not found.' });
        }

        res.status(200).json({ success: true, data: updatedOrder });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
      }
      break;
    default:
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` });
      break;
  }
}

export default connectDb(handler)
