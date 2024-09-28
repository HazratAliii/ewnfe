"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SigninFormData = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    console.log(data);
  };

  return (
    <div
      className=" mt-5 bg-red md:w-2/3 w-full overflow-hidden mx-auto bg-[#ffffff] flex flex-col items-center md:mt-20"
      style={{ height: "calc(100vh-86px)" }}
    >
      <h1 className="text-3xl mt-4">Login</h1>
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
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full h-[40px] rounded-sm border border-black px-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-1/2 h-[40px] rounded-sm bg-black text-white mt-5 mb-5"
        >
          Sign In
        </button>

        <p className="mb-5">or</p>

        <button className="w-1/2 h-[40px] rounded-sm bg-[#4285F4] text-white flex items-center justify-center mb-10">
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Signin;
