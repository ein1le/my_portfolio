import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import "./ProfessionalExperienceCard.css";

export default function ProfessionalExperienceCard({ title, subheader, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", logo, description }) {
  const [expanded, setExpanded] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  let displayLogo = logo;
  if (!displayLogo) {
    displayLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
  const hasDetailedRoles = Array.isArray(responsibilities) && responsibilities.length > 0 && typeof responsibilities[0] === 'object' && responsibilities[0] !== null && responsibilities[0].role;

  return (
    <div className={"education-card experience-card" + (expanded ? " expanded" : "")}
         onClick={() => setExpanded(e => !e)}
         tabIndex={0}
         style={{ cursor: "pointer" }}>
      <div className="education-card-main">
        {/* Left logo, if provided */}
        {displayLogo && (
          <img src={displayLogo} alt="logo" className="education-card-logo" />
        )}
        {/* Title and subtitle anchored to right of image, left-aligned */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 0 }}>
          <div className="education-title">{title}</div>
          <div className="education-subheader">{subheader}</div>
        </div>
        <div className="education-card-right">
          <span className="education-date"><FaCalendarAlt /> {date}</span>
          <span className="education-location"><FaMapMarkerAlt /> {location}</span>
          <span className="education-expand-icon">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      <div className={`education-card-expandable${expanded ? " expanded" : ""}`}>
        {expanded && (
          <>
            {(skills && skills.length > 0) && (
              <div className="experience-skills">
                {skills.map((skill, idx) => (
                  <span key={idx} className="experience-skill-tag">{skill}</span>
                ))}
              </div>
            )}
            {(languages && languages.length > 0) && (
              <div className="experience-languages">
                {languages.map((lang, idx) => (
                  <span key={idx} className="experience-lang-icon" title={lang.name}>{lang.icon}</span>
                ))}
              </div>
            )}
            {description && (
              <div style={{ color: '#d4d4d4', fontSize: '1em', marginBottom: 12, marginLeft: 2, marginRight: 2 }}>{description}</div>
            )}
            {Array.isArray(responsibilities) && responsibilities.length > 0 && (
              <div className="experience-roles-list" style={{ position: 'relative', paddingLeft: 32 }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute',
                  left: 12,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'linear-gradient(to bottom, #007acc 0%, #a259f7 100%)',
                  borderRadius: 2,
                  zIndex: 0
                }} />
                {hasDetailedRoles ? (
                  responsibilities.map((role, idx) => (
                    <div key={idx} className="experience-role-block" style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 600,
                        color: "#b5cea8",
                        fontSize: "1.08em",
                        marginBottom: 2
                      }}>
                        <span>〇 {role.role}</span>
                        <span style={{ color: "#a259f7", fontWeight: 500, fontSize: "0.98em", marginLeft: 16 }}>{role.date}</span>
                      </div>
                      {role.bullets && (
                        <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                          {role.bullets.map((b, bidx) => <li key={bidx}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {(contributors || (links && links.length > 0)) && (
              <div style={{ margin: '16px 0 0 32px', color: '#b5cea8', fontSize: '0.98em' }}>
                {contributors && (
                  <div style={{ fontStyle: 'italic', marginBottom: links && links.length > 0 ? 6 : 0 }}>
                    <span>Contributors: {contributors}</span>
                  </div>
                )}
              </div>
            )}
            {links && links.length > 0 && (
              <div className="experience-links-box">
                {links.map((link, idx) => (
                  link.type === "image" ? (
                    <span key={idx} className="experience-link-img-thumb" onClick={e => { e.stopPropagation(); setOpenImg(link.src); }}>
                      <img src={link.src} alt="certificate" />
                    </span>
                  ) : (
                    <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="experience-link">
                      {link.icon || <FaExternalLinkAlt />} {link.label}
                    </a>
                  )
                ))}
                {openImg && (
                  <div className="experience-img-modal" onClick={() => setOpenImg(null)}>
                    <img src={openImg} alt="certificate" />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 