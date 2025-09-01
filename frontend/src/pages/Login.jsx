import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [message, setMessage] = useState("");

  // Submit handler
  const onSubmit = async (data) => {
    console.log("data is: ", data)
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      setMessage("Login successful ✅");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Login
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 4, message: "Min length is 4" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              {message && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
