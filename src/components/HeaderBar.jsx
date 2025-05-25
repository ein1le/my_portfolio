import React from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import "./HeaderBar.css";

export default function HeaderBar({ onChatbotClick, showChatbot }) {
  return (
    <div className="header-bar headerbar">
      <div className="header-left">
        <span className="menu">File</span>
        <span className="menu">Edit</span>
        <span className="menu">Selection</span>
        <span className="menu">View</span>
        <span className="menu">Go</span>
        <span className="menu">Run</span>
        <span className="menu">Terminal</span>
        <span className="menu">Help</span>
      </div>
      <div className="header-center" style={{ display: 'flex', alignItems: 'center' }}>
        <input className="header-search" type="text" placeholder="Search..." />
        {onChatbotClick && (
          <FaCommentDots
            className="headerbar-chatgpt-icon"
            onClick={onChatbotClick}
            style={{
              marginLeft: 16,
              color: showChatbot ? '#a259f7' : '#b5cea8',
              fontSize: 22,
              cursor: 'pointer',
              verticalAlign: 'middle',
              transition: 'color 0.15s'
            }}
            title="Open Chatbot"
          />
        )}
      </div>
      <div className="header-right">
        <a href="https://github.com/ein1le" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
        <a href="https://linkedin.com/in/wishawin/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
        <a href="https://t.me/einle1" target="_blank" rel="noopener noreferrer" title="Telegram"><FaTelegram /></a>
        <a href="mailto:wishawin@gmail.com" title="Email me!"><FaEnvelope /></a>
        <a href="tel:+44 7534578468" title="Phone"><FaPhone /></a>
      </div>
    </div>
  );
} 