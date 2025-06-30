import React from "react";

export default function UserInfoCard({ icon, title, subtitle, link }) {
  return (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: 'var(--sidebar_color)',
        borderRadius: 12,
        padding: '16px 20px',
        textDecoration: 'none',
        boxShadow: '0 2px 8px #0002',
        border: '1.5px solid #31313a',
        minWidth: 0,
        transition: 'box-shadow 0.15s, border 0.15s',
        margin: 0,
        color: '#b5cea8',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        {icon}
        <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
      </div>
      <span style={{ fontSize: 13, color: '#7ec699', marginLeft: 38, wordBreak: 'break-all' }}>{subtitle}</span>
    </a>
  );
} 