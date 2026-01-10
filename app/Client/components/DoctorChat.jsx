import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const DoctorChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken || !user) return;

    const loadContacts = async () => {
      try {
        setStatus('loading');
        const appts = await apiRequest('/appointments', { token: accessToken });
        const uniquePatients = [
          ...new Map(
            appts
              .filter((appt) => appt.patient)
              .map((appt) => [appt.patient._id, appt.patient])
          ).values(),
        ];
        setContacts(uniquePatients);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
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
        if (err.name === 'AbortError') return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [selectedContact, accessToken]);

  const handleSend = async () => {
    if (input.trim() === '' || !selectedContact) return;
    try {
      const message = await apiRequest('/chat', {
        method: 'POST',
        token: accessToken,
        body: {
          receiverId: selectedContact,
          content: input.trim(),
        },
      });
      setMessages((prev) => [...prev, message]);
      setInput('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow h-[75vh] flex flex-col">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Doctor-Patient Chat
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Select Patient
        </label>
        <select
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">
            {status === 'loading' ? 'Loading contacts...' : 'Choose a patient'}
          </option>
          {contacts.map((contact) => (
            <option key={contact._id} value={contact._id}>
              {contact.fullName || contact.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-2 border rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg, idx) => {
            const senderId = typeof msg.sender === 'string' ? msg.sender : msg.sender?._id;
            const userId = user?.id || user?._id;
            const isDoctor = senderId === userId;
            return (
              <div
                key={msg._id || idx}
                className={`flex ${isDoctor ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    isDoctor
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white'
                  }`}
                >
                  {msg.content || msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef}></div>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={!selectedContact}
        />
        <button
          onClick={handleSend}
          disabled={!selectedContact}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorChat;
