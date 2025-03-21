"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slice";
function AuthGurad({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function active() {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/isLogedin",
          {
            withCredentials: true,
          }
        );
        dispatch(setUser(result.data.message));

        router.push("/chatpage");
      } catch (err) {
        router.push("/login");
        console.log(err);
      } finally {
        setLoading(false); // ✅ जब API call complete हो जाए तो loading false कर दो
      }
    }
    active();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
}

export default AuthGurad;
