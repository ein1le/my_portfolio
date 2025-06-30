import React from 'react';

export default function SidebarPanelTitle({ children }) {
  return (
    <div style={{
      fontSize: '0.92em',
      fontWeight: 700,
      letterSpacing: '0.13em',
      color: '#b5cea8',
      textTransform: 'uppercase',
      padding: '2px 0 8px 18px',
      opacity: 0.85
    }}>
      {children}
    </div>
  );
} 