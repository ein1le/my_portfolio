import React, { useEffect, useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

/*
  TechWireframeMap
  -----------------
  Renders a flat, 2-D "wire-frame" style world map. The map is drawn using
  react-simple-maps so it remains lightweight (only SVG paths) and responsive.
  Styling choices (neon-cyan strokes, transparent background on hover) give the
  map a futuristic / technical blueprint vibe that fits seamlessly with the
  rest of the portfolio's dark UI.

  External assets:
    • TopoJSON file hosted on GitHub (world map without Antarctica)
      – This keeps bundle size small and avoids shipping large GeoJSON files.

  Usage example:
      import TechWireframeMap from "./components/Map";
      <TechWireframeMap height={380} />

  Note: You'll need to add `react-simple-maps`, `d3@^7`, and
        `topojson-client` to your project:
        npm install react-simple-maps d3 topojson-client
*/

// Reliable TopoJSON URL (without Antarctica)
const TOPOJSON_URL =
  "https://raw.githubusercontent.com/BolajiBI/topojson-maps/master/world-countries-sans-antarctica.json";

// Marker positions (ISO country codes for UK and Thailand)
const markers = [
  { name: "UK", country: "GB" },
  { name: "Thailand", country: "TH" }
];

// Country centroids for all volunteering countries (approximate)
const countryCentroids = {
  UK: { coordinates: [-1.5, 52.5] },
  Malaysia: { coordinates: [101.9758, 4.2105] },
  Thailand: { coordinates: [100.5, 15.8] },
  Singapore: { coordinates: [103.8198, 1.3521] },
  Myanmar: { coordinates: [96.1, 21.9] },
};

// VolunteerCard component for popup
function VolunteerCard({ exp, onClose }) {
  return (
    <div
      style={{
        background: "rgba(24,32,48,0.98)",
        border: "2px solid #00d2ff",
        borderRadius: 12,
        boxShadow: "0 4px 32px #00d2ff44",
        color: "#b5cea8",
        padding: 16,
        minWidth: 180,
        maxWidth: 260,
        fontSize: 15,
        zIndex: 100,
        pointerEvents: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ fontWeight: 700, color: '#00d2ff', fontSize: 17, marginBottom: 4 }}>{exp.organisation}</div>
      <div style={{ color: '#7ec6b0', fontWeight: 500, marginBottom: 2 }}>{exp.role}</div>
      <div style={{ fontSize: 13, color: '#b5cea8', marginBottom: 2 }}>{exp.date}</div>
      <div style={{ fontSize: 13, color: '#b5cea8', marginBottom: 2 }}>{exp.country}</div>
      {exp.description && <div style={{ fontSize: 13, color: '#b5cea8', marginBottom: 6 }}>{exp.description}</div>}
      {exp.image && (
        <img src={exp.image.replace(/^@/, '')} alt="logo" style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', position: 'absolute', top: 12, right: 12 }} />
      )}
      <button
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          background: 'none',
          border: 'none',
          color: '#00d2ff',
          fontSize: 18,
          cursor: 'pointer',
          zIndex: 101
        }}
        onClick={e => { e.stopPropagation(); onClose(); }}
        title="Close"
      >×</button>
    </div>
  );
}

// Optionally, you can pass a data prop with highlighted countries
export default function TechWireframeMap({ height = 400, data = [] }) {
  const [geoUrl, setGeoUrl] = useState(TOPOJSON_URL);
  const [highlighted, setHighlighted] = useState([]);
  // Center state for panning
  const [center, setCenter] = useState([0, 0]); // [longitude, latitude]
  const dragging = useRef(false);
  const lastPos = useRef([0, 0]);
  // Pin popup state
  const [openPin, setOpenPin] = useState(null); // index of open pin
  // Mouse drag handlers with drag threshold
  const dragThreshold = 5;
  const [dragMoved, setDragMoved] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      setHighlighted(data.map(d => d.country));
    }
  }, [data]);

  // Mouse drag handlers with drag threshold
  const handleMouseDown = (e) => {
    dragging.current = true;
    lastPos.current = [e.clientX, e.clientY];
    setDragMoved(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const [lastX, lastY] = lastPos.current;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
      setDragMoved(true);
    }
    // Adjust these factors for sensitivity
    const lonPerPx = 0.25;
    const latPerPx = 0.18;
    setCenter(([lon, lat]) => [lon - dx * lonPerPx, lat + dy * latPerPx]);
    lastPos.current = [e.clientX, e.clientY];
  };
  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // Pulse effect CSS (scoped to this component)
  // You can move this to a CSS file if you prefer
  const pulseStyle = `
    @keyframes pulse-dash {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: 4000; }
    }
    .pulse-border {
      stroke: #00d2ff;
      stroke-width: 1.5;
      fill: transparent;
      filter: drop-shadow(0 0 2px #00d2ff) drop-shadow(0 0 6px #00d2ff88);
      stroke-dasharray: 300 200;
      stroke-dashoffset: 0;
      animation: pulse-dash 20s linear infinite;
      pointer-events: none;
    }
    .pulse-border-highlight {
      stroke: #7ec6b0;
      filter: drop-shadow(0 0 3px #7ec6b0) drop-shadow(0 0 8px #7ec6b088);
    }
  `;

  // Get volunteeringData from data prop (with full experience info)
  const volunteeringData = Array.isArray(data) && data.length && data[0].organisation ? data : [];

  return (
    <div
      className="bg-card/30 border border-border rounded-lg shadow-md p-4 w-full select-none"
      style={{ position: 'relative', overflow: 'hidden', cursor: dragging.current ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      <style>{pulseStyle}</style>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center }}
        width={800}
        height={400}
        style={{ width: "100%", height, overflow: "hidden" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <g>
              {geographies.map(geo => (
                <React.Fragment key={geo.rsmKey}>
                  {/* Main border (for interaction, hover, etc.) */}
                  <Geography
                    geography={geo}
                    style={{
                      default: {
                        fill: "transparent",
                        stroke: highlighted.includes(geo.properties.ISO_A2)
                          ? "#7ec699"
                          : "#00d2ff",
                        strokeWidth: 1.5,
                        outline: "none"
                      },
                      hover: {
                        fill: "#00d2ff22",
                        stroke: "#00d2ff",
                        strokeWidth: 2.5,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#00d2ff44",
                        stroke: "#00d2ff",
                        strokeWidth: 2.5,
                        outline: "none"
                      }
                    }}
                  />
                  {/* Animated pulse border overlay */}
                  <path
                    d={geo?.geometry?.coordinates ? undefined : undefined}
                    className={
                      "pulse-border" +
                      (highlighted.includes(geo.properties.ISO_A2)
                        ? " pulse-border-highlight"
                        : "")
                    }
                    // The react-simple-maps Geography component renders a <path> with a unique id
                    // We can use the same d attribute by accessing the __path property
                    // But since it's not exposed, we use the built-in render-prop API below
                    // Instead, use the render-prop API for custom rendering
                    // (see below)
                  />
                </React.Fragment>
              ))}
            </g>
          )}
        </Geographies>
        <Geographies geography={geoUrl}>
          {({ geographies, path }) => (
            <g>
              {geographies.map(geo => (
                <path
                  key={geo.rsmKey + "-pulse"}
                  d={path(geo)}
                  className={
                    "pulse-border" +
                    (highlighted.includes(geo.properties.ISO_A2)
                      ? " pulse-border-highlight"
                      : "")
                  }
                />
              ))}
            </g>
          )}
        </Geographies>
        {/* Markers (approximate centroids) */}
        {markers.map((m, i) => {
          const geo =
            typeof window !== "undefined"
              ? null
              : undefined; // SSR safety
          return null; // For now, skip centroids for simplicity
        })}
        {/* Pins for volunteering experiences */}
        {volunteeringData.map((exp, idx) => {
          let countryKey = exp.country;
          if (countryKey === 'Myannmar') countryKey = 'Myanmar';
          const centroid = countryCentroids[countryKey];
          if (!centroid) return null;
          return (
            <Marker key={idx} coordinates={centroid.coordinates}>
              <g
                style={{ cursor: "pointer" }}
                onClick={e => {
                  e.stopPropagation();
                  if (!dragMoved) setOpenPin(openPin === idx ? null : idx);
                }}
              >
                {/* Neon pin */}
                <circle r={13} fill="#00d2ff33" stroke="#00d2ff" strokeWidth={2} filter="url(#glow)" />
                <circle r={5} fill="#00d2ff" stroke="#fff" strokeWidth={1.5} />
                <rect x={-2.5} y={5} width={5} height={18} rx={2.5} fill="#00d2ff" filter="url(#glow)" />
              </g>
              {/* Popup card */}
              {openPin === idx && (
                <VolunteerCard exp={exp} onClose={() => setOpenPin(null)} />
              )}
            </Marker>
          );
        })}
      </ComposableMap>
      {/* SVG filter for neon glow */}
      <svg width="0" height="0">
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    </div>
  );
} 