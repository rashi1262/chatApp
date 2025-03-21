"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../slice";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const values = {
    email,
    password,
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/login",
        values,
        { withCredentials: true }
      );

      dispatch(setUser(result.data.message));
      router.push("/chatpage");
    } catch (err) {
      const error = err.response.data.message;
      error.includes("User") ? setEmailError(error) : setPasswordError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-white">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg bg-[#fff]/80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center text-[#111827] mb-4">
          Login
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-[#111827] block">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            <p className="text-red-500 text-sm">{emailError}</p>
          </div>
          <div>
            <label htmlFor="password" className="text-[#111827] block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#170a74]"
            />
            <p className="text-red-500 text-sm">{passwordError}</p>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#1f2937] text-white hover:bg-[#111827] rounded-lg p-2"
          >
            Login
          </button>
          <p className="text-center text-gray-500 mt-4">
            {`Don't have an account? `}
            <Link href="/signup" className="text-[#1f2937] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
