import React, { useRef, useState, useEffect } from "react";

// 2D projected points for a tetrahedron
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
  // Rotate all points around the center (150, 150)
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

export default function TetrahedronAnimation() {
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  // Animate rotation
  useEffect(() => {
    let lastTime = performance.now();
    let raf;
    const animate = (now) => {
      if (!dragging.current) {
        const delta = now - lastTime;
        setAngle(a => a + (delta * 0.02)); // ~2 deg per 16ms
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

  // Center the tetrahedron at the top left (0, 32) just below the header
  const scale = 4;
  // Find the center of the original tetrahedron
  const cx = 150, cy = 150;
  const offsetX = 0 - cx * scale;
  const offsetY = 32 - cy * scale;
  const rotated = rotate2D(tetraPoints, angle).map(p => ({
    x: p.x * scale + offsetX,
    y: p.y * scale + offsetY
  }));

  return (
    <svg
      className="tetrahedron-bg"
      viewBox="0 0 1200 800"
      width="100%"
      height="100%"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "auto" }}
      onMouseDown={handleMouseDown}
    >
      <defs>
        <clipPath id="tetra-clip">
          <rect x="0" y="32" width="1200" height="768" />
        </clipPath>
      </defs>
      <g clipPath="url(#tetra-clip)">
        {/* Edges */}
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
        {/* Nodes */}
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