import React from "react";
import { FaRegFile, FaSearch, FaCodeBranch, FaPlayCircle, FaPuzzlePiece, FaUserCircle, FaGithub, FaUser, FaFolderOpen, FaEnvelope } from "react-icons/fa";

const sidebarItems = [
  { icon: <FaRegFile />, label: "Explorer", type: "explorer" },
  { icon: <FaSearch />, label: "Search", type: "search" },
  { icon: <FaCodeBranch />, label: "Source Control", type: "git" },
  { icon: <FaEnvelope />, label: "Contact", type: "contact" },
  { icon: <FaUser />, label: "User", type: "user" },
  // Add more sidebar types as needed
];

export default function StaticSidebar({ activeSidebar, onSidebarIconClick }) {
  return (
    <div className="w-14 bg-card border-r border-[#222] flex flex-col items-center pt-12 h-screen fixed left-0 top-0 z-[200]" style={{ background: 'var(--tab_color)' }}>
      {sidebarItems.map((item, idx) => (
        <button
          key={item.label}
          className={`w-10 h-10 my-6 bg-none border-none text-accent2 text-[1.6em] rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer ${activeSidebar === item.type ? 'bg-[#31313a] text-accent' : 'hover:bg-[#31313a] hover:text-accent'}`}
          title={item.label}
          onClick={() => onSidebarIconClick(item.type)}
        >
          {item.icon}
        </button>
      ))}
      {/* Example: Add more icons for user, projects, etc. if needed */}
    </div>
  );
}
