// Assuming the file path is pages/api/addAddress.js
import Address from "../../../models/Address";
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { user_id, line_1, line_2, line_3, mob, nick_name } = req.body;

  try {
    let addressEntry = await Address.findOne({ user_id });

    if (!addressEntry) {
      // If there's no address entry for this user, create a new one
      addressEntry = new Address({ user_id, address: [] });
    }

    // Add the new address to the address array
    addressEntry.address.push({ line_1, line_2, line_3, mob, nick_name });

    // Save the updated address entry
    await addressEntry.save();

    res.status(200).json(addressEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default connectDb(handler);
