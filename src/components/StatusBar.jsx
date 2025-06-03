import React from "react";
// Removed: import "./StatusBar.css";

export default function StatusBar() {
  return (
    <div className="h-6 bg-accent text-white flex items-center pl-4 text-[0.9em] border-t border-[#005a9e]">
      <span>
        Made with React ⚛️ |
        <a
          href="https://github.com/yourusername"
          className="text-white underline ml-2"
        >
          GitHub
        </a>
      </span>
    </div>
  );
} 