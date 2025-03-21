"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [friendName, setFriendName] = useState("Chat With Friends");
  const data = useSelector((state) => state.chat);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(socket);
    socket.emit("registerUser", data.user?._id);
    socket.on("receiveMessage", (message) => {
      console.log("📥 Received Message:", message);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.msg_name]: [
          ...(prevMessages[message.msg_name] || []),
          { text: message.text, sender: "friend" },
        ],
      }));
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prevMessages) => ({
      ...prevMessages,
      [receiver.msg_name]: [
        ...(prevMessages[receiver.msg_name] || []),
        { text: input, sender: "You" },
      ],
    }));

    socket.emit(
      "sendMessage",
      JSON.stringify({
        text: input,
        sender: "You",
        senderId: data.user?._id,
        reciverId: receiver._id,
        msg_name: receiver.msg_name,
      })
    );
    setInput("");
  };
  console.log(messages);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#1f2937] via-[#6b7280] to-[#ffffff] overflow-hidden">
      <Sidebar setReceiver={setReceiver} setFriendName={setFriendName} />
      <div className="flex-1 flex flex-col h-full">
        <Navbar friendName={friendName} />
        <ChatMessage messages={messages} receiver={receiver} />
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          receiver={receiver}
        />
      </div>
    </div>
  );
}

/*  useEffect(
    function () {
      async function saveMessage() {
        if (Object.keys(messages).length !== 0) {
          console.log("enter");
          const msg_name = {
            messages,
          };
          try {
            const fetch_data = await axios.post(
              "http://localhost:3000/api/v1/messages/send",
              msg_name ,
              { withCredentials: true }
            );
            console.log("fetch : ", fetch_data);
          } catch (error) {
            console.log(error);
          }
        }
      }
      saveMessage();
    },
    [messages]
  );
*/
