import React, { useState, useRef, useEffect } from "react";

export default function TerminalWindow({ height, onResizeStart, sidebarOffset, rightOffset = 0 }) {
  const [lines, setLines] = useState([{ text: "", prompt: true }]);
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorPos, setCursorPos] = useState(0);
  const [blink, setBlink] = useState(true);
  const termRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  // Keyboard input logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement !== termRef.current) return;
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          line.text = line.text.slice(0, cursorPos) + e.key + line.text.slice(cursorPos);
          return newLines;
        });
        setCursorPos(pos => pos + 1);
        e.preventDefault();
      } else if (e.key === "Backspace") {
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          if (cursorPos > 0) {
            line.text = line.text.slice(0, cursorPos - 1) + line.text.slice(cursorPos);
            setCursorPos(pos => pos - 1);
          }
          return newLines;
        });
        e.preventDefault();
      } else if (e.key === "Delete") {
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          line.text = line.text.slice(0, cursorPos) + line.text.slice(cursorPos + 1);
          return newLines;
        });
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        setCursorPos(pos => Math.max(0, pos - 1));
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setLines(lines => {
          const line = lines[currentLine];
          setCursorPos(pos => Math.min(line.text.length, pos + 1));
          return lines;
        });
        e.preventDefault();
      } else if (e.key === "Enter") {
        setLines(lines => [...lines, { text: "", prompt: true }]);
        setCurrentLine(line => line + 1);
        setCursorPos(0);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLine, cursorPos]);

  return (
    <div
      style={{
        position: "fixed",
        left: sidebarOffset,
        right: rightOffset,
        bottom: 0,
        height,
        background: "#111",
        color: "#b5cea8",
        borderTop: "2px solid #23232b",
        zIndex: 300,
        boxShadow: "0 -2px 12px #0008",
        display: "flex",
        flexDirection: "column",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
      }}
    >
      {/* Terminal header bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#23232b",
        borderBottom: "1.5px solid #31313a",
        height: 36,
        padding: "0 16px 0 0",
        userSelect: "none",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: 0.5,
        position: "relative"
      }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", height: "100%" }}>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>PROBLEMS</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>OUTPUT</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>DEBUG CONSOLE</span>
          <span style={{ color: "#fff", borderBottom: "2px solid #007acc", padding: "0 8px", fontWeight: 600 }}>TERMINAL</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>PORTS</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Icons can be added here if needed */}
        </div>
      </div>
      <div
        style={{
          height: 8,
          cursor: "ns-resize",
          background: "#23232b",
          width: "100%",
          zIndex: 301
        }}
        onMouseDown={onResizeStart}
      />
      <div
        ref={termRef}
        tabIndex={0}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 24px",
          outline: "none",
          fontFamily: 'Fira Mono, Consolas, monospace',
          fontSize: 15,
          cursor: "text"
        }}
        onClick={() => termRef.current && termRef.current.focus()}
      >
        {lines.map((line, idx) => {
          const isCurrent = idx === currentLine;
          const beforeCursor = isCurrent ? line.text.slice(0, cursorPos) : line.text;
          const afterCursor = isCurrent ? line.text.slice(cursorPos) : "";
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", minHeight: 24 }}>
              <span style={{ color: "#7ec699", marginRight: 8 }}>PS C:\Users\ein1le&gt;</span>
              <span>{beforeCursor}</span>
              {isCurrent && (
                <span style={{
                  display: 'inline-block',
                  width: 10,
                  height: 20,
                  background: blink ? '#b5cea8' : 'transparent',
                  margin: '0 1px',
                  borderRadius: 2,
                  verticalAlign: 'middle',
                  transition: 'background 0.1s',
                }} />
              )}
              <span>{afterCursor}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 