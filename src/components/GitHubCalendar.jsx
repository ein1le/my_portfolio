import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function GithubCalendarSection() {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ color: "#b5cea8", marginBottom: 12 }}>GitHub Contributions</h2>
      <GitHubCalendar
        username="ein1le"
        blockSize={14}
        blockMargin={4}
        color="#007acc"
        fontSize={16}
        style={{ width: "100%" }}
      />
    </div>
  );
}
