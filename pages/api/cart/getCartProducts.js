import Cart from "../../../models/Cart";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).end('Method Not Allowed');
  }

  const { user_id } = req.query;

  try {
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler)