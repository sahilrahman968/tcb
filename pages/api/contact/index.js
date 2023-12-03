import transporter from "../../../lib/nodemailer";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {to,subject,text} = req.body;

    const mailOptions = {
      from: 'thechoppingboardtcp@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
