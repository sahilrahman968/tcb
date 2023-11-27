import Cart from "../../../models/Cart";
import connectDb from "../../../middleware/mongoose";

const handler =  async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'DELETE':
      try {
        const { userId } = query;

        if (!userId) {
          return res.status(400).json({ success: false, message: 'User ID is required for deletion' });
        }

        const deletedCart = await Cart.findOneAndDelete({user_id:userId});
        if (!deletedCart) {
          return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, data: deletedCart });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
};

export default connectDb(handler)