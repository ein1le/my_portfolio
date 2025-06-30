import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function ExperienceHeader({ title, description, rightContent }) {
  return (
    <div style={{
      textAlign: 'left',
      marginBottom: '2.5rem',
      background: 'transparent',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#b5cea8' }}>{title}</h1>
        <div style={{ fontSize: '1.25rem', color: '#d4d4d4', fontWeight: 600, maxWidth: '60%' }}>{description}</div>
      </div>
      {rightContent ? (
        <div style={{ marginLeft: 32 }}>{rightContent}</div>
      ) : (
        <div style={{ display: 'flex', gap: 18, marginLeft: 32 }}>
          <FaSearch
            style={{
              color: '#b5cea8',
              fontSize: 26,
              cursor: 'pointer',
              opacity: 0.85,
              transition: 'opacity 0.2s',
            }}
            title="Search"
            onMouseOver={e => (e.currentTarget.style.opacity = 1)}
            onMouseOut={e => (e.currentTarget.style.opacity = 0.85)}
          />
          <FaFilter
            style={{
              color: '#b5cea8',
              fontSize: 26,
              cursor: 'pointer',
              opacity: 0.85,
              transition: 'opacity 0.2s',
            }}
            title="Filter"
            onMouseOver={e => (e.currentTarget.style.opacity = 1)}
            onMouseOut={e => (e.currentTarget.style.opacity = 0.85)}
          />
        </div>
      )}
    </div>
  );
} 