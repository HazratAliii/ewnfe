"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

type SignupFormData = {
  email: string;
  givenName: string;
  familyName: string;
  language: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setLoading(true);
      const { email, password, givenName, familyName, language } = data;
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/signup`,
        { email, password, givenName, familyName, language }
      );
      alert(resp.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Something went wrong");
      } else {
        alert("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/google/callback`;
  };

  return (
    <div className="bg-red md:w-2/3 w-full h-full mx-auto bg-[#ffffff] flex flex-col items-center mt-5">
      <h1 className="text-3xl mt-4">Create account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <div className="w-1/2 mb-5">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-1/2 mb-5">
          <label htmlFor="givenName" className="block mb-2">
            Given name
          </label>
          <input
            type="text"
            id="givenName"
            {...register("givenName", { required: "Given name is required" })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.givenName && (
            <p className="text-red-500">{errors.givenName.message}</p>
          )}
        </div>
        <div className="w-1/2 mb-5">
          <label htmlFor="familyName" className="block mb-2">
            Family name
          </label>
          <input
            type="text"
            id="familyName"
            {...register("familyName", { required: "Family name is required" })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.familyName && (
            <p className="text-red-500">{errors.familyName.message}</p>
          )}
        </div>
        <div className="w-1/2 mb-5">
          <label htmlFor="language" className="block mb-2">
            Language
          </label>
          <input
            type="text"
            id="language"
            {...register("language", { required: "Language is required" })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.language && (
            <p className="text-red-500">{errors.language.message}</p>
          )}
        </div>
        <div className="w-1/2 mb-5">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="w-1/2 mb-5">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value ===
                  (document.getElementById("password") as HTMLInputElement)
                    ?.value || "Passwords do not match",
            })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-1/2 h-[40px] rounded-sm bg-black text-white mt-5 mb-5"
        >
          {!loading ? "Signup" : <ClipLoader color="#ffffff" size={20} />}
        </button>
        <p>
          Already have account?{" "}
          <Link href="/signin" className="text-blue-600">
            Signin
          </Link>
        </p>
      </form>
      or
      <button
        className="w-1/2 h-[40px] rounded-sm bg-[#4285F4] text-white mt-5 mb-5 flex items-center justify-center"
        onClick={handleGoogleLogin}
      >
        Sign up with Google
      </button>
    </div>
  );
};

export default Signup;
