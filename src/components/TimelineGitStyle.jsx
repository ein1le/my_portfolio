import React from "react";
import "./TimelineGitStyle.css";

const timelineData = [
  { side: "left", label: "Started University", date: "Sep 2021", description: "Began studies at University of Bristol." },
  { side: "right", label: "First Hackathon", date: "Nov 2021", description: "Participated in Hack Bristol." },
  { side: "left", label: "Research Project", date: "Mar 2022", description: "Joined a robotics research group." },
  { side: "right", label: "Internship", date: "Jul 2022", description: "Summer intern at TechCorp." },
  { side: "left", label: "Paper Published", date: "Dec 2022", description: "First paper published in a journal." },
  { side: "right", label: "Teaching Assistant", date: "Feb 2023", description: "Became a TA for engineering course." },
];

export default function TimelineGitStyle() {
  return (
    <div className="timeline-outer">
      <div className="timeline-scroll">
        <div className="timeline-central-line" />
        {timelineData.map((item, idx) => (
          <div key={idx} className={`timeline-item timeline-${item.side}`}> 
            <div className="timeline-node" />
            <div className="timeline-card">
              <div className="timeline-label">{item.label}</div>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 