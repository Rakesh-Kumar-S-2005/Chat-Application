import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/Message/FetchSlice";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import { ExtractRollNo } from "../Protection/ExtractRollNo";
import axios from "axios";


export const ChatArea = ({ userName, rollNo }) => {
  const dispatch = useDispatch();
  const { data: messages, loading } = useSelector((state) => state.messages);

  const currentRollNo = ExtractRollNo();

  const [message, setMessage] = useState({
  sender: currentRollNo,
  receiver: rollNo,
  message: "",
  timeStamp: new Date(),
});

  // 🔥 Fetch messages when receiver changes
  useEffect(() => {
    if (currentRollNo && rollNo) {
      dispatch(
        fetchData({
          endpoint: `http://localhost:8080/message/${currentRollNo}/${rollNo}`,
          token: localStorage.getItem("token"),
        })
      );
    }
  }, [currentRollNo, rollNo, dispatch]);

  // 📤 Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.message.trim()) return;

    try {
      await axios.post(
        "http://localhost:8080/message",
        message,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 🔄 Re-fetch messages after send
      dispatch(
        fetchData({
          endpoint: `http://localhost:8080/message/${currentRollNo}/${rollNo}`,
          token: localStorage.getItem("token"),
        })
      );

      setMessage((prev) => ({
        ...prev,
        message: "",
        timeStamp: new Date(),
      }));
    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  return (
    <main className="flex-1 flex flex-col m-2 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <header className="bg-green-600 text-white px-4 py-3">
        <h2 className="text-lg font-semibold">{userName}</h2>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {loading && <p className="text-center">Loading...</p>}

        {messages?.map((msg) => (
          <div
  key={msg.id}
  className={`max-w-xs px-4 py-2 rounded-lg text-sm flex flex-col ${
    msg.sender === currentRollNo
      ? "ml-auto bg-green-600 text-white"
      : "mr-auto bg-white border"
  }`}
>
  {/* Message text */}
  <span>{msg.message}</span>

  {/* Timestamp */}
  {msg.timeStamp && (
    <span className="text-xs text-gray-300 mt-1 self-end">
      {new Date(msg.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )}
</div>
        ))}
      </div>

      {/* Input */}
      <div className="shadow-sm bg-white px-3 py-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message.message}
          onChange={(e) =>
            setMessage((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
          onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
          className="flex-1 shadow-md rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </main>
  );
};
