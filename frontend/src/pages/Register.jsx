import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Main component for the registration page
const Register = () => {
  const {
    register,
    handleSubmit,
    watch, // To watch for password changes
    formState: { errors, isSubmitting },
  } = useForm();

  // State to hold submission messages (success or error)
  const [message, setMessage] = useState("");

  // 'watch' the password field to use for the confirm password validation
  const password = useRef({});
  password.current = watch("password", "");

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Make a POST request to the registration endpoint
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register", // Make sure this is your registration endpoint
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      setMessage("Registration successful ✅ You can now log in.");
    } catch (err) {
      // Handle errors from the server
      setMessage(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div>
      {/* The main form element */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Register
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a new account
              </h1>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="johndoe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
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
                    minLength: { value: 8, message: "Password must have at least 8 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

              {/* Display success or error message */}
              {message && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                  {message}
                </p>
              )}

              {/* Link to Login Page */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
