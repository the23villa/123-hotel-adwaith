import nodemailer from 'nodemailer';

async function sendConfirmationEmail(userEmail, purchaseDetails) {
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: false,
    port: 587,
    auth: {
      user: "contact@saintiant.tech",
      pass: "Saint@206"
    }
  });

  const mailOptions = {
    from: "contact@saintiant.tech",
    to: userEmail,
    subject: 'Booking Confirmation',
    text: `Thank you for your payment. Your villa has been booked successfully!
           Booking Details:
           - Rent ID: ${purchaseDetails.rent}
           - Members: ${purchaseDetails.members}
           - Order ID: ${purchaseDetails.orderId}
           - Amount: ${purchaseDetails.amount / 100} ${purchaseDetails.currency}
           `
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, ...purchaseDetails } = req.body;
    try {
      await sendConfirmationEmail(email, purchaseDetails);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
