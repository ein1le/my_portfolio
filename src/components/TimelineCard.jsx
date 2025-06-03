import React from "react";
import { FaCalendarAlt, FaMedal, FaExternalLinkAlt } from "react-icons/fa";

export default function TimelineCard({ event, sidebarWidth = 220, percent, cardWidth = 420 }) {
  let icon = null;
  if (event.type === "Milestone") {
    icon = <FaMedal className="text-accent2 text-[26px] mr-2" />;
  }

  // Shared card layout for Course and Event
  if (event.type === "Course" || event.type === "Event") {
    return (
      <div
        className={`absolute z-30 flex ${event.side === 'left' ? 'justify-end' : 'justify-start'} pointer-events-auto`}
        style={{
          left: event.side === 'left'
            ? `calc(${Math.max(sidebarWidth, 0)}px + 8px)`
            : `calc(100% - ${cardWidth}px)`,
          top: `calc(${percent * 100}% - 30px)`,
          width: cardWidth,
        }}
      >
        <div className="bg-card border border-border rounded-xl shadow-card flex flex-row items-center gap-4 w-full max-w-[420px] p-5 transition-all duration-200 hover:shadow-lg hover:border-accent overflow-hidden">
          {event.image && (
            <img src={event.image} alt="event" className="w-14 h-14 object-cover rounded-full bg-white flex-shrink-0 block" />
          )}
          <div className="flex-1 min-w-0 flex flex-col justify-center overflow-hidden">
            <div className={`font-semibold text-[17px] whitespace-normal text-ellipsis overflow-hidden break-words ${event.type === 'Event' ? 'text-accent' : 'text-accent2'}`}>{event.label}</div>
            {event.company && (
              <div className="text-accent2 text-[14px] mb-1 whitespace-normal text-ellipsis overflow-hidden break-words">{event.company}</div>
            )}
            <div className="text-text text-[13px] mb-1 whitespace-normal text-ellipsis overflow-hidden break-words">
              {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            {event.type === "Event" && event.description && (
              <div className="text-text text-[14px] mb-2 whitespace-normal break-words">{event.description}</div>
            )}
            {event.type === "Course" && event.id && (
              <div className="text-accent2 text-[13px] mb-2 whitespace-normal break-words">Credential ID {event.id}</div>
            )}
            {event.ref_link && (
              <a href={event.ref_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-card text-white border border-border rounded px-4 py-1.5 font-semibold text-[15px] no-underline mt-1 transition-colors duration-150 hover:bg-accent hover:text-white max-w-full overflow-hidden text-ellipsis">
                Show Media <FaExternalLinkAlt className="ml-2 text-[15px]" />
              </a>
            )}
            {event.type === "Course" && event.institution && (
              <div className="text-accent2 text-[14px] mt-1 whitespace-normal break-words">{event.institution}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Milestone fallback
  return (
    <div
      className={`absolute z-30 flex ${event.side === 'left' ? 'justify-end' : 'justify-start'} pointer-events-auto`}
      style={{
        left: event.side === 'left'
          ? `calc(${Math.max(sidebarWidth, 0)}px + 8px)`
          : `calc(100% - ${cardWidth}px)`,
        top: `calc(${percent * 100}% - 30px)`,
        width: cardWidth,
      }}
    >
      <div className="bg-card border border-border rounded-xl shadow-card flex flex-col gap-1 p-5 transition-all duration-200 hover:shadow-lg hover:border-accent">
        <div className="flex items-center mb-1">
          {icon}
          <div className="text-accent text-[15px] ml-1">
            {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
          </div>
        </div>
        <div className="font-bold text-accent2 text-[17px] whitespace-normal break-words">{event.label}</div>
      </div>
    </div>
  );
} 