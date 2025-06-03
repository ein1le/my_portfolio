import React from "react";
import { FaHome, FaUser, FaFolderOpen, FaEnvelope } from "react-icons/fa";

export default function Sidebar({ onSelect }) {
  return (
    <div className="w-[50px] bg-[#2c2c32] flex flex-col items-center py-2 border-r border-[#222]">
      <button onClick={() => onSelect("home")} className="bg-none border-none text-text my-3 text-[1.5em] cursor-pointer transition-colors duration-200 hover:text-accent">
        <FaHome />
      </button>
      <button onClick={() => onSelect("about")} className="bg-none border-none text-text my-3 text-[1.5em] cursor-pointer transition-colors duration-200 hover:text-accent">
        <FaUser />
      </button>
      <button onClick={() => onSelect("projects")} className="bg-none border-none text-text my-3 text-[1.5em] cursor-pointer transition-colors duration-200 hover:text-accent">
        <FaFolderOpen />
      </button>
      <button onClick={() => onSelect("contact")} className="bg-none border-none text-text my-3 text-[1.5em] cursor-pointer transition-colors duration-200 hover:text-accent">
        <FaEnvelope />
      </button>
    </div>
  );
} 