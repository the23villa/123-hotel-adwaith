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
       user: "info@the23villa.com",
        pass: "Ritesh@1995",
      },
    });

    // Prepare email options
    const mailOptions = {
      from: "info@the23villa.com",
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
