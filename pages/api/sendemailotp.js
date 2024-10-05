// pages/api/auth/sendOTP.js

import { generateOTP, saveOTPToDatabase } from '@/utils/otpUtils';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const otp = generateOTP();
      
      // Save OTP to database
      await saveOTPToDatabase(email, otp);

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        secure: false,
        port: 587,
        auth: {
         user: "info@the23villa.com",
         pass: "Ritesh@1995",
        }
      });

      const mailOptions = {
        from: "info@the23villa.com",
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
