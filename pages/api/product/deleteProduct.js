import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler =  async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'DELETE':
      try {
        const { productId } = query;

        if (!productId) {
          return res.status(400).json({ success: false, message: 'Product ID is required for deletion' });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: deletedProduct });
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