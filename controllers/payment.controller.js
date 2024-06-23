import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import User from "@/models/user.model";

const Razorpay = require("razorpay");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export function createPaymentIntent(req) {
  return new Promise((resolve, reject) => {
    try {
      // Validate price
      if (!Number.isInteger(req.body.price) || req.body.price < 1) {
        throw new Error(`Invalid price: ${req.body.price}. Price must be an integer >= 1 rupee.`);
      }

      const amountInPaise = req.body.price * 100;

      const paymentOptions = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      console.log("Price in rupees:", req.body.price);
      console.log("Amount in paise:", amountInPaise);
      console.log("Razorpay request options:", JSON.stringify(paymentOptions, null, 2));

      razorpayInstance.orders.create(paymentOptions, (err, order) => {
        if (err) {
          console.error("Razorpay Error:", err);
          return reject({
            success: false,
            message: err.message,
            details: err.error ? err.error : "Error creating Razorpay order",
          });
        }

        Purchase.create({
          rent: req.body.rent,
          price: req.body.price,
          members: req.body.members,
          duration: req.body.duration,
          user: req.user._id,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency
        })
          .then(purchase => {
            return Promise.all([
              User.findByIdAndUpdate(req.user._id, {
                $push: {
                  purchases: purchase._id,
                },
              }),
              Rent.findByIdAndUpdate(req.body.rent, {
                $push: {
                  users: req.user._id,
                },
              })
            ]);
          })
          .then(() => {
            resolve({
              success: true,
              message: "Payment order created successfully",
              orderId: order.id,
              amount: order.amount,
              currency: order.currency,
            });
          })
          .catch(error => {
            console.error("Database Error:", error);
            reject({
              success: false,
              message: error.message,
              details: "Error in database operations",
            });
          });
      });
    } catch (error) {
      console.error("Validation Error:", error);
      reject({
        success: false,
        message: error.message,
        details: "Error in input validation",
      });
    }
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await createPaymentIntent(req);
      res.status(200).json(response);
    } catch (error) {
      console.error("Handler Error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
        details: error.details || "Internal server error",
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}