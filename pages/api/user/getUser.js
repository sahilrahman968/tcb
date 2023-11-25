import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, name, phone } = req.query;

  try {
    const query = {};

    if (email) {
      query.email = email;
    }

    if (name) {
      query.name = name;
    }

    if (phone) {
      query.phone = phone;
    }

    const users = await User.find(query);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default connectDb(handler);
