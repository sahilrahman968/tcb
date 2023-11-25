import Calendar from "../../../models/Calendar";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const bookings = await Calendar.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default connectDb(handler);
