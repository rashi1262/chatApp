"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setUser } from "../slice";
import { useDispatch } from "react-redux";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/signup",
        data,
        { withCredentials: true }
      );
      console.log(result);
      dispatch(setUser(result.data.message));
      router.push("/chatpage");
    } catch (err) {
      console.log(err);
    }
  };

  const password = watch("password", "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-white">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg bg-[#fff/80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center text-[#1f2937] mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-[#1f2937] block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-[#1f2937] block">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email",
                },
              })}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-[#1f2937] block">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="text-[#1f2937] block">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Must be at least 8 characters, include upper & lowercase, a number & a special character",
                },
              })}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-[#1f2937] block">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1f2937] text-white hover:bg-[#111827] rounded-lg p-2 cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-500 mt-4">
            {`Already have an account? `}
            <Link href="/login" className="text-[#1f2937] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
