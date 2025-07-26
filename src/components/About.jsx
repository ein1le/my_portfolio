import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import "./markdown.css";

// TetrahedronAnimation component moved here
const tetraPoints = [
  { x: 150, y: 60 },   // Top
  { x: 240, y: 220 }, // Bottom right
  { x: 60, y: 220 },  // Bottom left
  { x: 150, y: 140 }  // Center front
];
const edges = [
  [0, 1], [1, 2], [2, 0], // base triangle
  [0, 3], [1, 3], [2, 3]  // sides
];
function rotate2D(points, angle) {
  const cx = 150, cy = 150;
  const rad = (angle * Math.PI) / 180;
  return points.map(({ x, y }) => {
    const dx = x - cx;
    const dy = y - cy;
    return {
      x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
      y: cy + dx * Math.sin(rad) + dy * Math.cos(rad)
    };
  });
}
function TetrahedronAnimation() {
  const [angle, setAngle] = React.useState(0);
  const dragging = React.useRef(false);
  const lastX = React.useRef(0);
  React.useEffect(() => {
    let lastTime = performance.now();
    let raf;
    const animate = (now) => {
      if (!dragging.current) {
        const delta = now - lastTime;
        setAngle(a => a + (delta * 0.02));
      }
      lastTime = now;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  const handleMouseDown = e => {
    dragging.current = true;
    lastX.current = e.clientX;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = e => {
    if (dragging.current) {
      setAngle(a => a + (e.clientX - lastX.current));
      lastX.current = e.clientX;
    }
  };
  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  const scale = 4;
  const cx = 150, cy = 150;
  const svgWidth = 1200, svgHeight = 800;
  const offsetX = svgWidth - cx * scale;
  const offsetY = 0 - cy * scale;
  const rotated = rotate2D(tetraPoints, angle).map(p => ({
    x: p.x * scale + offsetX,
    y: p.y * scale + offsetY
  }));
  return (
    <svg
      className="tetrahedron-bg"
      viewBox="0 0 1200 800"
      width={1200}
      height={800}
      style={{ position: "absolute", top: 0, right: 0, left: "auto", zIndex: 0, pointerEvents: "auto" }}
      onMouseDown={handleMouseDown}
    >
      <defs>
        <clipPath id="tetra-clip">
          <rect x="0" y="0" width="1200" height="800" />
        </clipPath>
      </defs>
      <g clipPath="url(#tetra-clip)">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={rotated[a].x}
            y1={rotated[a].y}
            x2={rotated[b].x}
            y2={rotated[b].y}
            stroke="#a259f7"
            strokeWidth="8"
            opacity="0.7"
          />
        ))}
        {rotated.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={32}
            fill="#a259f7"
            stroke="#fff"
            strokeWidth="5"
            opacity="0.92"
          />
        ))}
      </g>
    </svg>
  );
}

export default function About({ sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight }) {
  const [portfolioInfo, setPortfolioInfo] = React.useState("");
  const [typedTitle, setTypedTitle] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);
  const fullTitle = "Ein-Devfolio";
  React.useEffect(() => {
    fetch("/portfolio-information.md")
      .then(res => res.text())
      .then(setPortfolioInfo);
  }, []);
  React.useEffect(() => {
    setTypedTitle("");
    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    if (typedTitle.length === fullTitle.length) {
      const blink = setInterval(() => setShowCursor(c => !c), 500);
      return () => clearInterval(blink);
    } else {
      setShowCursor(true);
    }
  }, [typedTitle, fullTitle.length]);
  return (
    <div
      style={{
        position: "absolute",
        top: headerHeight,
        left: sidebarWidth,
        right: rightSidebarOffset,
        bottom: terminalHeight,
        width: `calc(100vw - ${sidebarWidth + rightSidebarOffset}px)`,
        height: `calc(100vh - ${headerHeight + terminalHeight}px)`,
        overflow: "auto",
        zIndex: 1
      }}
    >
      <TetrahedronAnimation />
      <div className="markdown-content" style={{ padding: 32, position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>
        <h1 style={{
          fontSize: '2.8em',
          fontWeight: 900,
          margin: '0 0 1.2em 0',
          letterSpacing: '0.01em',
          color: '#b5cea8',
          minHeight: '1.2em',
        }}>{typedTitle}<span className="typewriter-cursor" style={{ color: '#b5cea8', opacity: 0.7 }}>{showCursor ? '|' : ' '}</span></h1>
        <ReactMarkdown>{portfolioInfo}</ReactMarkdown>
      </div>
    </div>
  );
} 