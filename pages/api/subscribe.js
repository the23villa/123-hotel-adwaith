import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      secure: false,
      port: 587,
  
      auth: {
        user: "contact@saintiant.tech",
        pass: "Saint@206"
      }
    });

    // Prepare email options
    const mailOptions = {
      from: "contact@saintiant.tech",
      to: email,
      subject: 'Newsletter Subscription',
      text: 'Thank you for subscribing to our newsletter!'
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
