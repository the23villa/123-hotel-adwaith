import nodemailer from "nodemailer";
import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import User from "@/models/user.model";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function sendEmail(to, subject, text) {
  // Configure SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: false,
    port: 587,
    auth: {
      user: "contact@saintiant.tech",
      pass: "Saint@206",
    },
  });

  // Prepare email options
  const mailOptions = {
    from: "contact@saintiant.tech",
    to: to,
    subject: subject,
    text: text,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

export async function createPaymentIntent(req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(req.body.price * 100),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const purchase = await Purchase.create({
      rent: req.body.rent,
      price: req.body.price,
      members: req.body.members,
      duration: req.body.duration,
      user: req.user._id,
    });

    if (purchase && paymentIntent) {
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

      // Send email notification
      const user = await User.findById(req.user._id);
      await sendEmail(
        user.email,
        "Payment Completed Successfully",
        `Thank you for your payment of ${req.body.price}. Your booking is confirmed.`
      );

      // Send response
      return res.status(200).json({
        success: true,
        message: "Payment intent created and email sent successfully",
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
