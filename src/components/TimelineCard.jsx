import React from "react";
import { FaCalendarAlt, FaMedal, FaExternalLinkAlt } from "react-icons/fa";

export default function TimelineCard({ event, sidebarWidth = 220, percent, cardWidth = 420 }) {
  let icon = null;
  let cardClass = "timeline-card";
  if (event.type === "Milestone") {
    icon = <FaMedal style={{ color: '#b5cea8', fontSize: 26, marginRight: 8 }} />;
    cardClass += " timeline-milestone";
  }
  // No icon for Course or Event

  // Shared card layout for Course and Event
  if (event.type === "Course" || event.type === "Event") {
    return (
      <div
        className={`timeline-item timeline-${event.side}`}
        style={{
          position: 'absolute',
          left: event.side === 'left'
            ? `calc(${Math.max(sidebarWidth, 0)}px + 8px)`
            : `calc(100% - ${cardWidth}px)`,
          top: `calc(${percent * 100}% - 30px)`,
          width: cardWidth,
          zIndex: 3,
          justifyContent: event.side === 'left' ? 'flex-end' : 'flex-start',
          pointerEvents: 'auto',
        }}
      >
        <div className={cardClass} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14, width: '100%', maxWidth: cardWidth, wordBreak: 'break-word', overflow: 'hidden' }}>
          {event.image && (
            <img src={event.image} alt="event" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', background: '#fff', flexShrink: 0, display: 'block' }} />
          )}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            <div className="timeline-label" style={{ fontWeight: 600, fontSize: 17, whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-word', color: event.type === 'Event' ? '#a259f7' : undefined }}>{event.label}</div>
            {event.company && (
              <div style={{ color: '#b5cea8', fontSize: 14, marginBottom: 2, whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-word' }}>{event.company}</div>
            )}
            <div style={{ color: '#d4d4d4', fontSize: 13, marginBottom: 2, whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-word' }}>
              {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            {event.type === "Event" && event.description && (
              <div className="timeline-desc" style={{ marginBottom: 8 }}>{event.description}</div>
            )}
            {event.type === "Course" && event.id && (
              <div style={{ color: '#b5cea8', fontSize: 13, marginBottom: 8, whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-word' }}>
                Credential ID {event.id}
              </div>
            )}
            {event.ref_link && (
              <a href={event.ref_link} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', background: '#23232b', color: '#fff', border: '1.5px solid #31313a', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 15, textDecoration: 'none', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%'
              }}>
                Show Media <FaExternalLinkAlt style={{ marginLeft: 8, fontSize: 15 }} />
              </a>
            )}
            {event.type === "Course" && event.institution && (
              <div style={{ color: '#b5cea8', fontSize: 14, marginTop: 2, whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-word' }}>{event.institution}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Milestone fallback
  return (
    <div
      className={`timeline-item timeline-${event.side}`}
      style={{
        position: 'absolute',
        left: event.side === 'left'
          ? `calc(${Math.max(sidebarWidth, 0)}px + 8px)`
          : `calc(100% - ${cardWidth}px)`,
        top: `calc(${percent * 100}% - 30px)`,
        width: cardWidth,
        zIndex: 3,
        justifyContent: event.side === 'left' ? 'flex-end' : 'flex-start',
        pointerEvents: 'auto',
      }}
    >
      <div className={cardClass}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          {icon}
          <div className="timeline-date">
            {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
          </div>
        </div>
        <div className="timeline-label">{event.label}</div>
      </div>
    </div>
  );
} 