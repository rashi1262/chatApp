"use cliient";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Navbar({ friendName }) {
  const userName = useSelector((state) => state.chat.user?.name);
  const router = useRouter();
  async function logout() {
    try {
      const fetch_data = await axios.get(
        "http://localhost:3000/api/v1/logout",
        { withCredentials: true }
      );
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-[#f9fafb] overflow-x-hidden text-white py-4 px-6 shadow-md text-lg font-semibold flex justify-between items-center">
      <span className="font-bold text-[#374151]">{friendName}</span>
      <div className="flex items-center gap-4">
        <span className="bg-[#6b7280] text-[#fff] px-4 py-2 rounded-lg font-medium">
          {userName}
        </span>
        {/* <button className="bg-[#bab7ec] text-[#170a74] px-4 py-2 rounded-lg">Logout</button> */}
        <button
          onClick={logout}
          className="bg-[#1f2937] text-[#fff] px-4 py-2 rounded-lg cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
