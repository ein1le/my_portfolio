import React, { useEffect, useState } from "react";
import { FaGithub, FaClock } from "react-icons/fa";

export default function GithubActivity() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/ein1le/events/public")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch GitHub activity");
        return res.json();
      })
      .then(data => {
        setEvents(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ marginBottom: 32, overflowX: "auto" }}>
      <h3 style={{ color: "#b5cea8", marginBottom: 18 }}>
        <FaGithub style={{ marginRight: 8 }} /> Recent GitHub Activity
      </h3>
      {loading && <div style={{ color: "#a259f7" }}>Loading activity...</div>}
      {error && <div style={{ color: "#ff4d4f" }}>Error: {error}</div>}
      {!loading && !error && (
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          background: "#23232b",
          borderRadius: 8,
          boxShadow: "0 1px 4px #0002",
          border: "1.5px solid #31313a"
        }}>
          {events.map(event => (
            <li key={event.id} style={{
              padding: "14px 18px",
              borderBottom: "1px solid #31313a",
              display: "flex",
              alignItems: "center",
              gap: 16
            }}>
              <span style={{ color: "#a259f7", fontWeight: 600, minWidth: 120 }}>
                {event.type.replace(/Event$/, "")}
              </span>
              <a
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#b5cea8", textDecoration: "none", fontWeight: 500 }}
              >
                {event.repo.name}
              </a>
              <span style={{ color: "#d4d4d4", marginLeft: "auto", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                <FaClock style={{ color: "#007acc" }} />
                {new Date(event.created_at).toLocaleString()}
              </span>
                        </li>
                      ))}
                    </ul>
            )}
    </div>
  );
}
