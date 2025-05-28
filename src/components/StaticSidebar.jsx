import React from "react";
import { FaRegFile, FaSearch, FaCodeBranch, FaPlayCircle, FaPuzzlePiece, FaUserCircle, FaGithub, FaUser, FaFolderOpen, FaEnvelope } from "react-icons/fa";
import "./StaticSidebar.css";

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
    <div className="static-sidebar" style={{ width: 56 }}>
      {sidebarItems.map((item, idx) => (
        <button
          key={item.label}
          className={`sidebar-btn${activeSidebar === item.type ? " selected" : ""}`}
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
