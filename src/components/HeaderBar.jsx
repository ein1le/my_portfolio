import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions, VscChromeMinimize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
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
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ marginLeft: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <VscChromeMinimize style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
          <VscChromeRestore style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
          <VscChromeClose style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
        </span>
      </div>
    </div>
  );
} 