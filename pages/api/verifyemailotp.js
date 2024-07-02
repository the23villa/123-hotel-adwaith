// pages/api/auth/verifyOTP.js

import { verifyOTPFromDatabase } from "@/utils/otpUtils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, otp } = req.body;

    try {
      const isValid = await verifyOTPFromDatabase(email, otp);

      if (isValid) {
        res
          .status(200)
          .json({ success: true, message: "OTP verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
