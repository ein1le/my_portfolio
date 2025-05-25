import React from "react";
import { FaRegFile, FaSearch, FaCodeBranch, FaPlayCircle, FaPuzzlePiece, FaUserCircle } from "react-icons/fa";
import "./StaticSidebar.css";

const sidebarItems = [
  { icon: <FaRegFile />, label: "Explorer" },
  { icon: <FaSearch />, label: "Search" },
  { icon: <FaCodeBranch />, label: "Source Control" },
  { icon: <FaPlayCircle />, label: "Run & Debug" },
  { icon: <FaPuzzlePiece />, label: "Extensions" },
  { icon: <FaUserCircle />, label: "Account" }
];

export default function StaticSidebar({ selected = 0, onSelect }) {
  return (
    <div className="static-sidebar" style={{ width: 56 }}>
      {sidebarItems.map((item, idx) => (
        <button
          key={item.label}
          className={`sidebar-btn${selected === idx ? " selected" : ""}`}
          title={item.label}
          onClick={() => onSelect && onSelect(idx)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
