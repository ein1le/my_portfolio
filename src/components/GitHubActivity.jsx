import React, { useEffect, useState } from "react";
import { FaCodeBranch, FaRegCommentDots, FaRegStar, FaRegCheckCircle, FaRegQuestionCircle } from "react-icons/fa";

const eventIcon = (type) => {
  // Map event types to icons
  if (type.startsWith("Push")) return <FaCodeBranch color="#a259f7" />;
  if (type.startsWith("PullRequest")) return <FaRegCheckCircle color="#b5cea8" />;
  if (type.startsWith("Issues")) return <FaRegCommentDots color="#ffd700" />;
  if (type.startsWith("Watch")) return <FaRegStar color="#007acc" />;
  return <FaRegQuestionCircle color="#888" />;
};

export default function GithubActivity() {
  const [events, setEvents] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/ein1le/events/public")
      .then(res => res.json())
      .then(data => setEvents(data.slice(0, 7)));
  }, []);

  return (
    <div style={{ marginBottom: 32, overflowX: "auto" }}>
      <h3 style={{ color: "#b5cea8", marginBottom: 18 }}>Recent GitHub Activity</h3>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "40px 0 32px 0",
        position: "relative",
        minHeight: 120
      }}>
        {/* SVG connectors */}
        <svg
          width={events.length * 180}
          height={40}
          style={{ position: "absolute", top: 56, left: 0, zIndex: 0, pointerEvents: "none" }}
        >
          {events.map((_, idx) =>
            idx < events.length - 1 ? (
              <line
                key={idx}
                x1={idx * 180 + 40}
                y1={20}
                x2={(idx + 1) * 180}
                y2={20}
                stroke="#007acc"
                strokeWidth={4}
                strokeLinecap="round"
              />
            ) : null
          )}
        </svg>
        {events.map((event, idx) => (
          <div
            key={event.id}
            style={{
              position: "relative",
              zIndex: 1,
              minWidth: 180,
              marginLeft: idx === 0 ? 0 : 0,
              marginRight: idx === events.length - 1 ? 0 : 0,
              textAlign: "center"
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Node */}
            <div style={{
              width: 44,
              height: 44,
              background: "#23232b",
              border: "5px solid #007acc",
              borderRadius: "50%",
              margin: "0 auto",
              boxShadow: hovered === idx ? "0 4px 16px #007acc88" : "0 2px 8px #0003",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#b5cea8",
              fontSize: "1.5em",
              transition: "box-shadow 0.2s, border 0.2s"
            }}>
              {eventIcon(event.type.replace(/Event$/, ""))}
            </div>
            {/* Info */}
            <div style={{
              marginTop: 12,
              background: "#23232b",
              borderRadius: 8,
              padding: "8px 10px",
              color: "#d4d4d4",
              fontSize: "0.98em",
              boxShadow: "0 1px 4px #0002",
              border: hovered === idx ? "1.5px solid #007acc" : "1.5px solid transparent",
              transition: "border 0.2s"
            }}>
              <div style={{ color: "#007acc", fontWeight: 600, fontSize: "0.95em" }}>
                {event.type.replace(/Event$/, "")}
              </div>
              <a
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#b5cea8",
                  fontWeight: 700,
                  fontSize: "1.05em",
                  textDecoration: "none"
                }}
              >
                {event.repo.name}
              </a>
              <div style={{ color: "#888", fontSize: "0.92em", marginTop: 2 }}>
                {new Date(event.created_at).toLocaleDateString()}
              </div>
            </div>
            {/* Tooltip on hover */}
            {hovered === idx && (
              <div style={{
                position: "absolute",
                top: -70,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#1e1e1e",
                color: "#b5cea8",
                padding: "10px 18px",
                borderRadius: 8,
                boxShadow: "0 4px 24px #0008",
                fontSize: "0.98em",
                zIndex: 10,
                minWidth: 180,
                pointerEvents: "none"
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{event.type.replace(/Event$/, "")}</div>
                <div>{event.repo.name}</div>
                <div style={{ color: "#a259f7" }}>{new Date(event.created_at).toLocaleString()}</div>
                {event.payload && event.payload.commits && event.payload.commits.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <span style={{ color: "#ffd700" }}>Commits:</span>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {event.payload.commits.map((c, i) => (
                        <li key={i} style={{ color: "#b5cea8", fontSize: "0.95em" }}>
                          {c.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
