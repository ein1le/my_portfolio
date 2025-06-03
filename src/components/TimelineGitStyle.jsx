import React, { useRef, useEffect, useState } from "react";
import { FaCalendarAlt, FaMedal, FaBook, FaExternalLinkAlt } from "react-icons/fa";
import timelineData from "../constants/timeline_constants";
import TimelineCard from "./TimelineCard";

function getMonthRange(events) {
  if (!events.length) return [];
  const dates = events.map(e => new Date(e.date));
  const min = new Date(Math.min(...dates));
  const max = new Date(Math.max(...dates));
  min.setDate(1);
  max.setDate(1);
  const months = [];
  let d = new Date(min);
  while (d <= max) {
    months.push(new Date(d));
    d.setMonth(d.getMonth() + 1);
  }
  return months;
}

function getMonthKey(date) {
  return date.toISOString().slice(0, 7);
}

function getEventPosition(event, months) {
  const eventDate = new Date(event.date);
  for (let i = 0; i < months.length - 1; i++) {
    const start = months[i];
    const end = months[i + 1];
    if (eventDate >= start && eventDate < end) {
      const total = end - start;
      const part = eventDate - start;
      return (i + part / total) / (months.length - 1);
    }
  }
  return 1;
}

export default function TimelineGitStyle({ sidebarWidth = 220 }) {
  // Only include months from Jan 2023 onwards in the timeline
  const timelineStart = new Date('2023-01-01');
  // Sort timelineData by date descending (most recent first)
  const sortedTimelineData = [...timelineData].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Split events: after or on Jan 2023, and before
  const afterStart = sortedTimelineData.filter(e => new Date(e.date) >= timelineStart);
  const beforeStart = sortedTimelineData.filter(e => new Date(e.date) < timelineStart);

  // For month range, use only afterStart events
  const latestEventDate = afterStart.length > 0 ? new Date(afterStart[0].date) : timelineStart;
  // Build months array from latest event month to Jan 2023 (descending)
  function getMonthsFromToDesc(start, end) {
    const months = [];
    const d = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(end.getFullYear(), end.getMonth(), 1);
    while (d >= last) {
      months.push(new Date(d));
      d.setMonth(d.getMonth() - 1);
    }
    return months;
  }
  const monthsDesc = getMonthsFromToDesc(latestEventDate, timelineStart);
  const monthPositions = monthsDesc.map((m, i) => i / (monthsDesc.length - 1));

  // Calculate dynamic timeline height based on months in range (no extra bottom space)
  const monthsCount = monthsDesc.length;
  const perMonthSpacing = 350; // px per month
  const TIMELINE_HEIGHT = Math.max(8000, monthsCount * perMonthSpacing);

  // For each event, calculate its vertical percent position in the reversed order
  function getEventPositionDesc(event, monthsDesc) {
    const eventDate = new Date(event.date);
    // If event is after the most recent month, clamp to top
    if (eventDate > monthsDesc[0]) return 0;
    // If event is before Jan 2023, place at the bottom node (Jan 2023)
    if (eventDate < monthsDesc[monthsDesc.length - 1]) return 1;
    for (let i = 0; i < monthsDesc.length - 1; i++) {
      const start = monthsDesc[i];
      const end = monthsDesc[i + 1];
      if (eventDate <= start && eventDate > end) {
        const total = start - end;
        const part = start - eventDate;
        return (i + part / total) / (monthsDesc.length - 1);
      }
    }
    return 1;
  }
  const eventPositions = afterStart.map(event => getEventPositionDesc(event, monthsDesc));

  // For beforeStart, render at the bottom node (Jan 2023) at exactly percent=1
  const beforeStartOffsets = beforeStart.map(() => 1);

  const timelineRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      setHeight(timelineRef.current.offsetHeight);
    }
  }, [timelineRef.current]);

  return (
    <div
      className="w-full h-full min-h-[400px] max-h-screen overflow-y-auto p-0 relative bg-transparent scrollbar-thin scrollbar-thumb-[#31313a] scrollbar-track-card"
      style={{ minHeight: TIMELINE_HEIGHT }}
    >
      {/* Fade effect at top and bottom */}
      <div className="pointer-events-none sticky top-0 left-0 right-0 h-9 z-10" style={{ background: 'linear-gradient(to bottom, #1e1e1e 80%, transparent 100%)' }} />
      <div
        className="relative w-full flex flex-col items-center pt-8 pb-8"
        ref={timelineRef}
        style={{ height: TIMELINE_HEIGHT }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent to-accent2 -translate-x-1/2 z-0 min-h-screen" style={{ height: '100%' }} />
        {/* Render nodes for each month (descending) */}
        {monthsDesc.map((month, idx) => (
          <div
            key={getMonthKey(month)}
            className="absolute left-1/2 w-[22px] h-[22px] bg-card border-4 border-accent rounded-full -translate-x-1/2 z-20 shadow-md"
            style={{ top: `calc(${monthPositions[idx] * 100}% - 11px)` }}
          />
        ))}
        {/* Render event cards at interpolated positions (descending) */}
        {afterStart.map((event, idx) => {
          const percent = eventPositions[idx];
          return (
            <TimelineCard
              key={event.label + event.date}
              event={event}
              sidebarWidth={sidebarWidth}
              percent={percent}
              cardWidth={420}
            />
          );
        })}
        {/* Render earlier cards at the bottom node (Jan 2023), stacked */}
        {beforeStart.map((event, idx) => (
          <TimelineCard
            key={event.label + event.date}
            event={event}
            sidebarWidth={sidebarWidth}
            percent={beforeStartOffsets[idx]}
            cardWidth={420}
          />
        ))}
      </div>
      <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-9 z-10" style={{ background: 'linear-gradient(to top, #1e1e1e 80%, transparent 100%)' }} />
    </div>
  );
} 