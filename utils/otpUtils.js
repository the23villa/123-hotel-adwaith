// utils/otpUtils.js

import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";

connectDB();

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: true,
  },

  used: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OTP = models.OTP || model("OTP", otpSchema);

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function saveOTPToDatabase(email, otp) {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10); // OTP expires in 10 minutes

  await OTP.findOneAndUpdate(
    { email },
    {
      otp,
      expirationTime,
      createdAt: new Date(),
    },
    { upsert: true, new: true }
  );
}

export async function verifyOTPFromDatabase(email, otp) {
  const storedOTP = await OTP.findOne({
    email,
    otp,
    expirationTime: { $gt: new Date() },
  });

  if (storedOTP) {
    // Mark OTP as used instead of deleting it
    await OTP.findByIdAndUpdate(storedOTP._id, { used: true });
    return true;
  }

  return false;
}
