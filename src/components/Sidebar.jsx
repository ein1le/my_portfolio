import React from "react";
import { FaHome, FaUser, FaFolderOpen, FaEnvelope } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <button onClick={() => onSelect("home")}> <FaHome /> </button>
      <button onClick={() => onSelect("about")}> <FaUser /> </button>
      <button onClick={() => onSelect("projects")}> <FaFolderOpen /> </button>
      <button onClick={() => onSelect("contact")}> <FaEnvelope /> </button>
    </div>
  );
} 