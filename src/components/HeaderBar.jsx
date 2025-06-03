import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions, VscChromeMinimize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";

export default function HeaderBar({ onChatbotClick, showChatbot }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 z-[2000] bg-card shadow-md flex items-center justify-between px-4 border-b border-[#222] font-mono">
      <div className="flex items-center gap-5">
        <span className="text-base px-1 text-text cursor-default select-none">File</span>
        <span className="text-base px-1 text-text cursor-default select-none">Edit</span>
        <span className="text-base px-1 text-text cursor-default select-none">Selection</span>
        <span className="text-base px-1 text-text cursor-default select-none">View</span>
        <span className="text-base px-1 text-text cursor-default select-none">Go</span>
        <span className="text-base px-1 text-text cursor-default select-none">Run</span>
        <span className="text-base px-1 text-text cursor-default select-none">Terminal</span>
        <span className="text-base px-1 text-text cursor-default select-none">Help</span>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <input
          className="w-[220px] px-2.5 py-1 rounded border border-border bg-background text-text text-base outline-none transition-colors duration-200 focus:border-accent"
          type="text"
          placeholder="Search..."
        />
        {onChatbotClick && (
          <FaCommentDots
            className="ml-4 cursor-pointer align-middle transition-colors duration-150"
            onClick={onChatbotClick}
            style={{
              color: showChatbot ? '#a259f7' : '#b5cea8',
              fontSize: 22
            }}
            title="Open Chatbot"
          />
        )}
      </div>
      <div className="flex items-center gap-4 ml-6">
        <span className="ml-6 flex items-center gap-2">
          <VscChromeMinimize style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
          <VscChromeRestore style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
          <VscChromeClose style={{ color: '#b5cea8', fontSize: 18, cursor: 'default' }} />
        </span>
      </div>
    </div>
  );
} 