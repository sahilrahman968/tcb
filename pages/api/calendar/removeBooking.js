import Calendar from "../../../models/Calendar";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end('Method Not Allowed');
  }

  const {booking_id} = req.body;

  try {
    let booking = await Calendar.findOne({ _id:booking_id });
    if (!booking) {
      return res.status(404).json({ error: 'booking not found' });
    }
    else{
        const result = Calendar.deleteOne({ _id:booking_id })
        res.status(200).json({ message: 'booking removed successfully' });
    }

    // booking.products = cart.products.filter(product => product.product_id !== product_id);

    // await cartCollection.updateOne({ user_id }, { $set: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler)