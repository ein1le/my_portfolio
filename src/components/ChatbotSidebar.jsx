import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { getChatbotResponse } from "../utils/openai";
import wunbotIcon from '../assets/wunbot.png';

export default function ChatbotSidebar({ width, onResizeStart, onClose, headerHeight }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am wunbot. How can I help you?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInput = (e) => setInput(e.target.value);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setMessages(msgs => [
      ...msgs,
      { sender: 'user', text: input }
    ]);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const userMsgs = [
        ...messages,
        { sender: 'user', text: input }
      ];
      const reply = await getChatbotResponse(userMsgs);
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: reply }
      ]);
    } catch (err) {
      setError("Failed to get response from chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: headerHeight,
        right: 0,
        width,
        height: `calc(100vh - ${headerHeight}px)`,
        background: 'var(--sidebar_color)',
        borderLeft: '1.5px solid #222',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        transition: 'width 0.1s',
      }}
    >
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1.5px solid #31313a', color: '#b5cea8', fontWeight: 600, fontSize: 17, flexShrink: 0 }}>
        Chatbot
        <FaTimes style={{ cursor: 'pointer', color: '#b5cea8' }} onClick={onClose} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 12px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {messages.map((msg, idx) => (
          msg.sender === 'bot' ? (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <img src={wunbotIcon} alt="wunbot" style={{ width: 28, height: 28, marginRight: 8 }} />
                <span style={{ color: '#a259f7', fontWeight: 700, fontSize: 15 }}>wunbot</span>
              </div>
              <div style={{
                background: '#31313a',
                color: '#b5cea8',
                borderRadius: 12,
                padding: '8px 14px',
                maxWidth: '80%',
                fontSize: 15,
                boxShadow: '0 1px 6px #0002'
              }}>{msg.text}</div>
            </div>
          ) : (
            <div key={idx} style={{
              alignSelf: 'flex-end',
              background: '#007acc',
              color: '#fff',
              borderRadius: 12,
              padding: '8px 14px',
              marginBottom: 8,
              maxWidth: '80%',
              fontSize: 15,
              boxShadow: '0 1px 6px #007acc33'
            }}>{msg.text}</div>
          )
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#a259f7', fontSize: 15, margin: '8px 0' }}>Thinking...</div>
        )}
        {error && (
          <div style={{ alignSelf: 'flex-start', color: '#ff4d4f', fontSize: 15, margin: '8px 0' }}>{error}</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 12px',
          background: 'var(--sidebar_color)',
          borderTop: '1.5px solid #31313a',
          zIndex: 202,
          flexShrink: 0
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Type your message..."
          style={{
            flex: 1,
            background: '#18181f',
            color: '#b5cea8',
            border: 'none',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 15,
            outline: 'none',
            marginRight: 8
          }}
          disabled={loading}
        />
        <button type="submit" style={{
          background: '#007acc',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'background 0.15s'
        }} disabled={loading}>Send</button>
      </form>
      <div
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, cursor: 'col-resize', zIndex: 202 }}
        onMouseDown={onResizeStart}
      />
    </div>
  );
} 