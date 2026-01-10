// components/Chat.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../src/api/client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken || !user) return;

    const loadContacts = async () => {
      try {
        setStatus("loading");
        if (user.role === "patient") {
          const doctors = await apiRequest("/users/doctors", { token: accessToken });
          setContacts(doctors);
        } else {
          const appts = await apiRequest("/appointments", { token: accessToken });
          const uniquePatients = [
            ...new Map(
              appts
                .filter((appt) => appt.patient)
                .map((appt) => [appt.patient._id, appt.patient])
            ).values(),
          ];
          setContacts(uniquePatients);
        }
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    loadContacts();
  }, [accessToken, user]);

  useEffect(() => {
    if (!selectedContact || !accessToken) return;
    const controller = new AbortController();
    apiRequest(`/chat?withUser=${selectedContact}`, {
      token: accessToken,
      signal: controller.signal,
    })
      .then((data) => setMessages(data))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [selectedContact, accessToken]);

  const handleSend = async () => {
    if (!input.trim() || !selectedContact) return;
    try {
      const message = await apiRequest("/chat", {
        method: "POST",
        token: accessToken,
        body: {
          receiverId: selectedContact,
          content: input.trim(),
        },
      });
      setMessages((prev) => [...prev, message]);
      setInput("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Chat with Doctor</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Select {user?.role === "doctor" ? "Patient" : "Doctor"}
        </label>
        <select
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">
            {status === "loading" ? "Loading contacts..." : "Choose a contact"}
          </option>
          {contacts.map((contact) => (
            <option key={contact._id} value={contact._id}>
              {contact.fullName || contact.name}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-700 p-3 mb-4 rounded">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`mb-2 ${
                (() => {
                  const senderId =
                    typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
                  const userId = user?.id || user?._id;
                  return senderId === userId;
                })()
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <span className="inline-block px-3 py-1 rounded bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-gray-100">
                {msg.content || msg.text}
              </span>
              <div className="text-xs text-gray-400">
                {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSend}
          disabled={!selectedContact}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Chat;
