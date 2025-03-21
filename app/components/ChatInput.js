"use cliient";
export default function ChatInput({ input, setInput, sendMessage, receiver }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white/80 backdrop-blur-md shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#374151]"
      />
      <button
        disabled={receiver === ""}
        onClick={sendMessage}
        className="px-4 py-2 cursor-pointer bg-[#1f2937] text-white rounded-lg shadow-md hover:bg-[#111827] transition"
      >
        Send
      </button>
    </div>
  );
}
