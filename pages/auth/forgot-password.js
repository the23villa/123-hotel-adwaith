// components/ForgotPassword.js

import Button from "@/components/shared/button/Button";
import Logo from "@/components/shared/logo/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const { register, handleSubmit, reset } = useForm();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sendemailotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await response.json();
      if (result.success) {
        setEmail(data.email);
        setStep("otp");
        toast.success("OTP sent successfully");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/verifyemailotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: data.otp }),
      });
      const result = await response.json();
      if (result.success) {
        setOtp(data.otp);
        setStep("newPassword");
        toast.success("OTP verified successfully");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: data.newPassword }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Password reset successfully");
        window.open("/auth/signin", "_self");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
    setIsLoading(false);
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center px-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>
        {step === "email" && (
          <form
            onSubmit={handleSubmit(handleSendOTP)}
            className="w-full flex flex-col gap-y-4"
          >
            <label htmlFor="email" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Your Email</span>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="i.e. adwaithviju@gmail.com"
                className=""
              />
            </label>
            <Button type="submit" disabled={isLoading} className="py-2">
              Send OTP
            </Button>
          </form>
        )}
        {step === "otp" && (
          <form
            onSubmit={handleSubmit(handleVerifyOTP)}
            className="w-full flex flex-col gap-y-4"
          >
            <label htmlFor="otp" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter OTP</span>
              <input
                type="text"
                {...register("otp", { required: true })}
                placeholder="Enter 6-digit OTP"
                className=""
              />
            </label>
            <Button type="submit" disabled={isLoading} className="py-2">
              Verify OTP
            </Button>
          </form>
        )}
        {step === "newPassword" && (
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="w-full flex flex-col gap-y-4"
          >
            <label htmlFor="newPassword" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter New Password</span>
              <input
                type="password"
                {...register("newPassword", { required: true })}
                placeholder="Enter new password"
                className=""
              />
            </label>
            <Button type="submit" disabled={isLoading} className="py-2">
              Reset Password
            </Button>
          </form>
        )}
        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/signup">Sign Up</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
