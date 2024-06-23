import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import User from "@/models/user.model";

const Razorpay = require("razorpay");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createPaymentIntent(req) {
  try {
    const paymentOptions = {
      amount: req.body.price,
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
      currency: order.currency,
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

      return {
        success: true,
        message: "Payment order created successfully",
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
  if (req.method === "POST") {
    const response = await createPaymentIntent(req);
    res.status(response.success ? 200 : 500).json(response);
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
