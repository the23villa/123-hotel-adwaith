import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import User from "@/models/user.model";
import nodemailer from 'nodemailer';

const Razorpay = require("razorpay");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to send confirmation email
async function sendConfirmationEmail(userEmail, purchaseDetails) {
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

  // Send email
  await transporter.sendMail(mailOptions);
}

export async function createPaymentIntent(req) {
  try {
    const paymentOptions = {
      amount: req.body.price * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, 
    };

    const order = await razorpayInstance.orders.create(paymentOptions);

    const purchase = await Purchase.create({
      rent: req.body.rent,
      price: req.body.price,
      members: req.body.members,
      duration: req.body.duration,
      user: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });

    if (purchase && order) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          purchases: purchase._id,
        },
      });

      await Rent.findByIdAndUpdate(req.body.rent, {
        $push: {
          users: req.user._id,
        },
      });

      // Send confirmation email
      await sendConfirmationEmail(req.user.email, {
        rent: req.body.rent,
        price: req.body.price,
        members: req.body.members,
        duration: req.body.duration,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      });

      return {
        success: true,
        message: "Payment order created and confirmation email sent successfully",
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await createPaymentIntent(req);
    res.status(response.success ? 200 : 500).json(response);
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
