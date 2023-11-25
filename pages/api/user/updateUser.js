// pages/api/users/edit/[userId].js
import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";

 async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).json({ error: "This method is not allowed" }); // Method Not Allowed
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.query.userId },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    res.status(200).json(updatedUser.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export default connectDb(handler)