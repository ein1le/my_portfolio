import React from "react";

export default function Editor({ content, sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight }) {
  if (typeof content === 'function') {
    return (
      <div className="flex-1 bg-background p-6 border-l border-[#222] text-text font-mono text-[1.1em] overflow-y-auto">
        {content({ sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight })}
      </div>
    );
  }
  return (
    <div className="flex-1 bg-background p-6 border-l border-[#222] text-text font-mono text-[1.1em] overflow-y-auto">
      {content}
    </div>
  );
} 