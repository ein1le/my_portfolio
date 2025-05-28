import React from "react";
import "./Editor.css";

export default function Editor({ content, sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight }) {
  if (typeof content === 'function') {
    return (
      <div className="editor">
        {content({ sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight })}
      </div>
    );
  }
  return (
    <div className="editor">
      {content}
    </div>
  );
} 