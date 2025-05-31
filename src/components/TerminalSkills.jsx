import React, { useState, useRef, useEffect } from "react";

const terminalLines = [
  { type: "prompt", text: "$ skills --list" },
  { type: "output", text: "> Languages:" },
  { type: "skill", label: "Python", bar: 10, max: 10 },
  { type: "skill", label: "JavaScript", bar: 8, max: 10 },
  { type: "skill", label: "C++", bar: 7, max: 10 },
  { type: "prompt", text: "$ tools --list" },
  { type: "output", text: "- Git, Docker, AWS, Linux..." }
];

export default function TerminalSkills({ sidebarWidth = 200 }) {
  const [cursorPos, setCursorPos] = useState(0); // index in terminalLines
  const [blink, setBlink] = useState(true);
  const termRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "ArrowDown") {
        setCursorPos(pos => Math.min(pos + 1, terminalLines.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setCursorPos(pos => Math.max(pos - 1, 0));
        e.preventDefault();
      } else if (e.key === "Tab") {
        setCursorPos(pos => (pos + 1) % terminalLines.length);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      const el = termRef.current.querySelector('.cursor-line');
      if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [cursorPos]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: `calc(100vw - ${sidebarWidth}px)`,
      height: '100vh',
      background: '#111',
      color: '#b5cea8',
      fontFamily: 'Fira Mono, Consolas, monospace',
      fontSize: '1.08em',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        background: '#23232b',
        color: '#b5cea8',
        fontWeight: 600,
        fontSize: '1em',
        padding: '8px 24px',
        borderBottom: '1.5px solid #31313a',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        letterSpacing: '1px'
      }}>
        C:\\Windows\\System32&gt;
      </div>
      <div
        ref={termRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 0 32px 0',
          margin: 0,
          width: '100%',
          outline: 'none',
          position: 'relative',
        }}
        tabIndex={0}
      >
        <div style={{ width: '100%', minHeight: 320, paddingLeft: 32 }}>
          {terminalLines.map((line, idx) => {
            let content;
            if (line.type === "prompt") {
              content = <span style={{ color: '#7ec699' }}>{line.text}</span>;
            } else if (line.type === "output") {
              content = <span style={{ color: '#d4d4d4' }}>{line.text}</span>;
            } else if (line.type === "skill") {
              const bar = '█'.repeat(line.bar) + ' '.repeat(line.max - line.bar);
              const barColor = <span style={{ color: '#a259f7' }}>{bar}</span>;
              content = <span style={{ color: '#b5cea8' }}>- {line.label.padEnd(12)} [{barColor}] {line.bar}/{line.max}</span>;
            }
            return (
              <div
                key={idx}
                className={idx === cursorPos ? 'cursor-line' : ''}
                style={{
                  background: idx === cursorPos ? '#23232b' : 'transparent',
                  position: 'relative',
                  minHeight: 28,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: idx === cursorPos ? 600 : 400
                }}
              >
                {content}
                {idx === cursorPos && (
                  <span style={{
                    display: 'inline-block',
                    width: 12,
                    height: 22,
                    marginLeft: 6,
                    background: blink ? '#b5cea8' : 'transparent',
                    borderRadius: 2,
                    verticalAlign: 'middle',
                    transition: 'background 0.1s',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 