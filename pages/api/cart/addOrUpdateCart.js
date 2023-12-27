import Cart from "../../../models/Cart";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { user_id, product_id, count } = req.body;

  try {
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = { user_id, products: [] };
    }

    // Split the product_id string into an array
    const productIdsArray = product_id.split(',');

    // Process each product_id
    productIdsArray.forEach(product_id => {
      const existingProduct = cart.products.find(product => product.product_id === product_id);
      if (existingProduct) {
        if (count == 0) {
          const index = cart.products.findIndex(product => product.product_id === product_id)
          if (index > -1) {
            cart.products.splice(index, 1);
          }
        } else {
          existingProduct.count = count;
        }
      } else {
        cart.products.push({ product_id, count: count || 1 });
      }
    });

    await Cart.updateOne(
      { user_id },
      { $set: { user_id, products: cart.products } },
      { upsert: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler);
