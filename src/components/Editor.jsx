import React from "react";

export default function Editor({ content, sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight }) {
  if (typeof content === 'function') {
    return (
      <div className="flex-1 p-6 border-l border-[#222] text-text font-mono text-[1.1em] overflow-y-auto" style={{ background: '#111016' }}>
        {content({ sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight })}
      </div>
    );
  }
  return (
    <div className="flex-1 p-6 border-l border-[#222] text-text font-mono text-[1.1em] overflow-y-auto" style={{ background: '#111016' }}>
      {content}
    </div>
  );
} 