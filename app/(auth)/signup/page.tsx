"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SignupFormData = {
  email: string;
  givenName: string;
  familyName: string;
  language: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log(data);
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
          Signup
        </button>
        or
        <button className="w-1/2 h-[40px] rounded-sm bg-[#4285F4] text-white mt-5 mb-5 flex items-center justify-center">
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
