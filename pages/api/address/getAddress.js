import Address from "../../../models/Address";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).end('Method Not Allowed');
  }

  const { user_id } = req.query;

  try {
    const address = await Address.findOne({ user_id });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.status(200).json(address.address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler)