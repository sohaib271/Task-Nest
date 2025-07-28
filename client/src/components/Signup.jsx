import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import User from "./functionality/user";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   const register= await User.register(data.firstName,data.lastName,data.email,data.password);
   console.log(register);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-emerald-50 py-6 px-8">
            <h2 className="text-2xl font-bold text-emerald-700 text-center">
              Create Your Account
            </h2>
            <p className="mt-2 text-emerald-600 text-center">
              Join us today - it takes just a minute
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mt-1 relative"
                >
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.firstName
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    } focus:ring-2 focus:outline-none transition`}
                  />
                </motion.div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mt-1 relative"
                >
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.lastName
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    } focus:ring-2 focus:outline-none transition`}
                  />
                </motion.div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mt-1 relative"
                >
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    } focus:ring-2 focus:outline-none transition`}
                  />
                </motion.div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mt-1 relative"
                >
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    } focus:ring-2 focus:outline-none transition`}
                  />
                </motion.div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Sign Up
                </button>
              </motion.div>
            </div>
          </form>
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}