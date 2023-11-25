import Cart from "../../../models/Cart";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).end('Method Not Allowed');
  }

  const { user_id, product_id, count } = req.body;

  try {
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const product = cart.products.find(product => product.product_id === product_id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    product.count = count;

    if (product.count === 0) {
      cart.products = cart.products.filter(product => product.product_id !== product_id);
    }

    await Cart.updateOne({ user_id }, { $set: cart });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler)