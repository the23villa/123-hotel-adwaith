import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import Logo from "@/components/shared/logo/Logo";
import { useSignupMutation } from "@/services/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, reset, getValues } = useForm();
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { id: "signup" });
      window.open("/auth/signin", "_self");
      setAvatarPreview(null);
      reset();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
    if (isLoading) {
      toast.loading("Signing up...", { id: "signup" });
    }
  }, [data, error, isLoading, reset, router]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleSignup = async (formData) => {
    setPhone(formData.phone);

    // Send OTP
    try {
      const response = await axios.post('/api/send-otp', { phone: formData.phone });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent successfully', { id: "signup" });
      }
    } catch (error) {
      toast.error('Failed to send OTP', { id: "signup" });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { phone, code: otp });
      if (response.status === 200) {
        // Proceed with signup after OTP verification
        const formData = getValues();
        const signupData = new FormData();

        signupData.append("avatar", formData.avatar[0]);
        signupData.append("name", formData.name);
        signupData.append("email", formData.email);
        signupData.append("password", formData.password);
        signupData.append("phone", formData.phone);

        signup(signupData);
      } else {
        toast.error('Invalid OTP', { id: "signup" });
      }
    } catch (error) {
      toast.error('Failed to verify OTP', { id: "signup" });
    }
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>
        {!otpSent ? (
          <form
            action=""
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleSignup)}
          >
            {/* avatar */}
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row overflow-x-auto gap-x-2">
                {avatarPreview && (
                  <LoadImage
                    src={avatarPreview}
                    alt="avatar"
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded object-cover"
                  />
                )}
              </div>
              <label htmlFor="avatar" className="relative">
                <button
                  type="button"
                  className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit text-sm"
                >
                  <IoCloudUploadOutline className="h-5 w-5" />
                  Choose an avatar*
                </button>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  {...register("avatar", {
                    required: true,
                    onChange: (event) => handleAvatarChange(event),
                  })}
                />
              </label>
            </div>

            <label htmlFor="name" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Your Name</span>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", { required: true })}
                placeholder="i.e. Adwaith Viju"
                className=""
                maxLength="100"
              />
            </label>

            <label htmlFor="email" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Your Email</span>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
                placeholder="i.e. adwaith@gmail.com"
                className=""
              />
            </label>

            <label htmlFor="password" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Your Password</span>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="i.e. adwai123"
                className=""
              />
            </label>

            <label htmlFor="phone" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Your Phone Number</span>
              <input
                type="tel"
                name="phone"
                id="phone"
                {...register("phone", { required: true })}
                placeholder="i.e. +8801906315901"
                className=""
              />
            </label>

            <Button type="submit" className="py-2 mt-4">
              Sign up
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-y-4">
            <label htmlFor="otp" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter OTP</span>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className=""
              />
            </label>
            <Button onClick={handleVerifyOtp} className="py-2 mt-4">
              Verify OTP
            </Button>
          </div>
        )}
        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/forgot-password">Forgot Password</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
