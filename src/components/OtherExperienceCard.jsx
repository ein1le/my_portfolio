import React, { useState } from "react";
import { FaExternalLinkAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./OtherExperienceCard.css";

export default function OtherExperienceCard({ title, subtitle, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", contributors_link = [], logo, description }) {
  const [expanded, setExpanded] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  let displayLogo = logo;
  if (!displayLogo) {
    displayLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
  const hasDetailedRoles = Array.isArray(responsibilities) && responsibilities.length > 0 && typeof responsibilities[0] === 'object' && responsibilities[0] !== null && responsibilities[0].role;

  // Helper to get initials from a name
  function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Helper to generate a color from a string
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

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
          <div className="education-subheader">{subtitle}</div>
        </div>
        <div className="education-card-right">
          <span className="education-date">{date}</span>
          <span className="education-location">{location}</span>
          <span className="education-expand-icon">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      <div className={`education-card-expandable${expanded ? " expanded" : ""}`}>
        {expanded && (
          <>
            {(skills.length > 0 || languages.length > 0) && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, justifyContent: 'space-between' }}>
                <div
                  className="experience-skills"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  {skills.map((skill, idx) => (
                    <span key={idx} className="experience-skill-tag">{skill}</span>
                  ))}
                </div>
                {languages.length > 0 && (
                  <div className="experience-languages" style={{ marginBottom: 0, flex: '0 0 auto', marginLeft: 16 }}>
                    {languages.map((lang, idx) => (
                      <span key={idx} className="experience-lang-icon" title={lang.name}>
                        {lang.icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Description under skills/languages */}
            {description && (
              <div style={{ color: '#d4d4d4', fontSize: '1em', marginBottom: 12, marginLeft: 2, marginRight: 2 }}>
                {description}
              </div>
            )}
            {/* RESPONSIBILITIES SECTION */}
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
                      {Array.isArray(role.bullets) ? (
                        <>
                          <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                            {role.bullets.map((item, bidx) => (
                              <li key={bidx}>{item}</li>
                            ))}
                          </ul>
                          {/* Display role_contributors if present */}
                          {role.role_contributors && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 28, marginTop: 2, fontSize: '0.97em' }}>
                              {role.role_contributors.split(',').map((name, idx) => {
                                const initials = getInitials(name);
                                const link = Array.isArray(role.role_contributors_link) ? role.role_contributors_link[idx] : undefined;
                                const circle = (
                                  <span
                                    key={idx}
                                    title={name.trim()}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 24,
                                      height: 24,
                                      borderRadius: '50%',
                                      background: stringToColor(name),
                                      color: '#fff',
                                      fontWeight: 700,
                                      fontSize: 13,
                                      boxShadow: '0 1px 4px #0002',
                                      cursor: link ? 'pointer' : 'default',
                                      transition: 'background 0.2s',
                                      marginLeft: idx === 0 ? 0 : -10,
                                      border: '2px solid #23232b',
                                    }}
                                    onClick={link ? (e) => { e.stopPropagation(); window.open(link, '_blank'); } : undefined}
                                  >
                                    {initials}
                                  </span>
                                );
                                return circle;
                              })}
                            </div>
                          )}
                          {/* Display role_links if present */}
                          {role.role_links && role.role_links.length > 0 && (
                            <div className="experience-links-box" style={{ marginLeft: 24, marginTop: 4 }}>
                              {role.role_links.map((link, lidx) => (
                                link.type === "image" ? (
                                  <span key={lidx} className="experience-link-img-thumb" onClick={e => { e.stopPropagation(); setOpenImg(link.src); }}>
                                    <img src={link.src} alt="role media" />
                                  </span>
                                ) : (
                                  <a key={lidx} href={link.href} target="_blank" rel="noopener noreferrer" className="experience-link">
                                    {link.icon || <FaExternalLinkAlt />} {link.label}
                                  </a>
                                )
                              ))}
                              {openImg && (
                                <div className="experience-img-modal" onClick={() => setOpenImg(null)}>
                                  <img src={openImg} alt="role media" />
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        // fallback for old format: treat role as a string
                        <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                          <li>{typeof role === 'string' ? role : ''}</li>
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  // Simple bullets only, no role titles
                  <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {/* CONTRIBUTORS & LINKS/MEDIA SECTION */}
            {(contributors || (links && links.length > 0)) && (
              <div style={{ margin: '16px 0 0 32px', color: '#b5cea8', fontSize: '0.98em', display: 'flex', alignItems: 'center', gap: 10 }}>
                {contributors && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {contributors.split(',').map((name, idx) => {
                      const initials = getInitials(name);
                      const link = Array.isArray(contributors_link) ? contributors_link[idx] : undefined;
                      const circle = (
                        <span
                          key={idx}
                          title={name.trim()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: stringToColor(name),
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 14,
                            boxShadow: '0 1px 4px #0002',
                            cursor: link ? 'pointer' : 'default',
                            transition: 'background 0.2s',
                            marginLeft: idx === 0 ? 0 : -10,
                            border: '2px solid #23232b',
                          }}
                          onClick={link ? (e) => { e.stopPropagation(); window.open(link, '_blank'); } : undefined}
                        >
                          {initials}
                        </span>
                      );
                      return circle;
                    })}
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