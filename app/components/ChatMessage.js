"use cliient";
export default function ChatMessage({ messages, receiver }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#fff]/80 backdrop-blur-md rounded-lg shadow-inner">
      {receiver !== "" ? (
        messages[receiver.msg_name]?.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "You"
                ? "bg-[#374151] text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Select a friend to start chatting
        </p>
      )}
    </div>
  );
}
