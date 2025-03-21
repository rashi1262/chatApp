"use cliient";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
export default function Sidebar({ setReceiver, setFriendName }) {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [userActive, setUserActive] = useState(false);
  const id = useSelector((state) => state.chat.user?._id);

  useEffect(
    function () {
      async function friends() {
        try {
          const fetch_data = await axios.get(
            `http://localhost:3000/api/v1/users/${id}`,
            { withCredentials: true }
          );
          setFriends(() => fetch_data.data.message.connections);
          setUserActive(() => fetch_data.data.message.friends);
        } catch (error) {
          console.log(error);
        }
      }
      friends();
    },
    [setFriends, newFriend, id]
  );

  async function addFriend() {
    try {
      const fetch_data = await axios.post(
        "http://localhost:3000/api/v1/addfriend",
        { friend: newFriend },
        { withCredentials: true }
      );
      setNewFriend("");
      toast.success("Friend Added.");
    } catch (error) {
      toast.error("User doesn't exist.");
      console.log(error);
    }
  }

  return (
    <aside className="w-1/4 bg-[#f9fafb] text-white p-4 shadow-lg flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center border-b-2 pb-2 border-[#374151] text-[#374151]">
        Chats
      </h2>
      <ul className="space-y-2 flex-1 overflow-y-auto">
        {friends.map((friend, index) => (
          <li
            key={index}
            className="p-2 bg-[#6b7280] text-[#fff] font-bold rounded-lg cursor-pointer flex justify-between items-center"
            onClick={() => {
              if (!Boolean(userActive[index].active)) {
                toast.warning("User is not active.");
                return;
              }
              setFriendName(friend.name);
              setReceiver(friend);
            }}
          >
            {friend.name}
            <span
              className={`w-3 h-3 rounded-full ${
                Boolean(userActive[index].active)
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-2 bg-[#e5e7eb]/90 rounded-lg shadow-md">
        <input
          type="text"
          name="friend"
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Add new friend"
          className="w-full p-2 border text-blue-500 border-[#374151] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b5563] placeholder:text-[#4b5563]"
        />
        <button
          onClick={addFriend}
          className="w-full mt-2 bg-[#1f2937] cursor-pointer text-[#fff] px-4 py-2 rounded-lg shadow-md hover:bg-[#111827] transition"
        >
          Add Friend
        </button>
      </div>
    </aside>
  );
}
