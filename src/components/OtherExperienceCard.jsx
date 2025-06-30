import React, { useState } from "react";
import { FaExternalLinkAlt, FaChevronUp, FaChevronDown, FaGithub, FaStar, FaCamera, FaYoutube, FaGlobe, FaPython, FaGoogle, FaMicrosoft, FaInstagram } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import { titleDescription } from "../constants/extracurricular_exp";

export default function OtherExperienceCard({ title, subtitle, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", contributors_link = [], logo, description }) {
  const [expanded, setExpanded] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState(title);
  const [subtitleDisplay, setSubtitleDisplay] = useState(subtitle);
  const [showCursor, setShowCursor] = useState(false);
  let displayLogo = logo;
  if (!displayLogo) {
    displayLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
  const hasDetailedRoles = Array.isArray(responsibilities) && responsibilities.length > 0 && typeof responsibilities[0] === 'object' && responsibilities[0] !== null && responsibilities[0].role;

  // Defensive: ensure arrays
  skills = Array.isArray(skills) ? skills : [];
  languages = Array.isArray(languages) ? languages : [];
  responsibilities = Array.isArray(responsibilities) ? responsibilities : [];
  links = Array.isArray(links) ? links : [];
  contributors_link = Array.isArray(contributors_link) ? contributors_link : [];
  // Defensive: contributors can be string or array
  if (Array.isArray(contributors)) {
    contributors = contributors.join(", ");
  } else if (contributors == null) {
    contributors = "";
  }

  // Defensive: ensure title and subtitle are strings
  title = typeof title === 'string' ? title : '';
  subtitle = typeof subtitle === 'string' ? subtitle : '';

  const linkTypeMap = {
    github: {
      color: "#18181f",
      textColor: "#fff",
      icon: <FaGithub style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #000"
    },
    certificate: {
      color: "#ffe066",
      textColor: "#222",
      icon: <FaStar style={{ fontSize: 20, marginRight: 10, color: "#bfa600" }} />,
      border: "1.5px solid #bfa600"
    },
    media: {
      color: "#23272f",
      textColor: "#fff",
      icon: <FaCamera style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #444"
    },
    youtube: {
      color: "#ff4d4f",
      textColor: "#fff",
      icon: <FaYoutube style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #b30000"
    },
    website: {
      color: "#3fa7ff",
      textColor: "#fff",
      icon: <FaGlobe style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #007acc"
    },
    linktree: {
      color: "#39e09b",
      textColor: "#fff",
      icon: <SiLinktree style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #39e09b"
    },
    instagram: {
      color: "#e1306c",
      textColor: "#fff",
      icon: <FaInstagram style={{ fontSize: 20, marginRight: 10 }} />,
      border: "1.5px solid #e1306c"
    }
  };

  const languageIconMap = {
    "Python": <FaPython />,
    "Google Workspace": <FaGoogle />,
    "Teams": <FaMicrosoft />
  };

  function LinkButton({ type, label_name, link, asset }) {
    const style = linkTypeMap[type] || linkTypeMap["website"];
    const content = (
      <button
        style={{
          display: "flex",
          alignItems: "center",
          background: "#23232b",
          color: style.textColor,
          border: style.border,
          borderRadius: 6,
          padding: "4px 10px",
          fontWeight: 500,
          fontSize: 13,
          cursor: "pointer",
          marginRight: 8,
          marginBottom: 6,
          minWidth: 0,
          boxShadow: "0 1px 4px #0001",
          outline: "none"
        }}
        onClick={link ? (e) => { e.stopPropagation(); window.open(link, "_blank"); } : undefined}
        type="button"
      >
        {React.cloneElement(style.icon, { style: { ...style.icon.props.style, fontSize: 15, marginRight: 7 } })}
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: '#fff' }}>{label_name}</span>
      </button>
    );
    if ((type === "media" || type === "certificate") && asset) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {content}
          <img
            src={asset}
            alt={label_name}
            style={{
              width: 28,
              height: 28,
              objectFit: "cover",
              borderRadius: 5,
              marginLeft: 7,
              border: "1.2px solid #31313a"
            }}
          />
        </div>
      );
    }
    return content;
  }

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

  // Typewriter effect
  React.useEffect(() => {
    if (hovered && !expanded) {
      let t = 0;
      let s = 0;
      setTitleDisplay("");
      setSubtitleDisplay("");
      setShowCursor(false);
      const titleInterval = setInterval(() => {
        t++;
        setTitleDisplay(title.slice(0, t));
        if (t >= title.length) {
          clearInterval(titleInterval);
          setShowCursor(true);
        }
      }, 18);
      const subtitleInterval = setInterval(() => {
        s++;
        setSubtitleDisplay(subtitle.slice(0, s));
        if (s >= subtitle.length) clearInterval(subtitleInterval);
      }, 18 + title.length * 2);
      return () => { clearInterval(titleInterval); clearInterval(subtitleInterval); };
    } else {
      setTitleDisplay(title);
      setSubtitleDisplay(subtitle);
      setShowCursor(false);
    }
  }, [hovered, expanded, title, subtitle]);

  return (
    <div
      className={`border border-border rounded-xl mb-6 px-8 py-16 transition-all duration-200 flex flex-col min-w-0 relative overflow-hidden cursor-pointer group ${expanded ? 'shadow-2xl' : ''} ${!expanded ? 'hover:bg-accent/10 hover:border-accent hover:shadow-xl' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #23232b 0%, #22577A 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 1.5px 4px rgba(63,167,255,0.08)',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
      }}
      onClick={() => setExpanded(e => !e)}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center w-full relative z-10">
        {/* Left logo, if provided */}
        {displayLogo && (
          <img src={displayLogo} alt="logo" className="w-16 h-16 rounded-full object-cover mr-5 bg-white shadow-md flex-shrink-0" />
        )}
        {/* Title and subtitle anchored to right of image, left-aligned */}
        <div className="flex flex-col items-start justify-center text-left ml-0 flex-1">
          <div className="text-accent2 font-bold text-3xl" style={{ marginBottom: '2px', lineHeight: 1.1 }}>
            {titleDisplay}
            {showCursor && hovered && !expanded && <span className="inline-block animate-pulse ml-0.5">|</span>}
          </div>
          <div className="text-text text-lg font-bold" style={{ marginTop: 0 }}>{subtitleDisplay}</div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <span className="text-text text-lg font-semibold">{date}</span>
          <span className="text-text text-lg font-semibold">{location}</span>
          <span className="mt-2 text-accent2 text-lg">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      {/* Expandable section */}
      <div className={`transition-all duration-700 overflow-hidden ${expanded ? 'max-h-[2000px] mt-5 pt-3 pb-3 opacity-100 scale-100' : 'max-h-0 pt-0 pb-0 opacity-0 scale-95'} ease-in-out`}>
        {expanded && (
          <>
            {(skills.length > 0 || languages.length > 0) && (
              <div className="flex items-center mb-3 w-full">
                <div className="flex flex-nowrap items-center gap-2 flex-1 min-w-0">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-card border border-accent rounded-xl px-3 py-1 text-accent2 text-sm font-medium shadow-sm">{skill}</span>
                  ))}
                </div>
                {languages.length > 0 && (
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {languages.map((lang, idx) => {
                      const name = typeof lang === 'string' ? lang : lang.name;
                      const icon = languageIconMap[name];
                      return (
                        <span key={idx} className="text-accent text-xl hover:text-accent2 transition-transform duration-200" title={name}>
                          {icon ? icon : name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {/* Description under skills/languages */}
            {description && (
              <div className="text-text text-base mb-3 mx-1">{description}</div>
            )}
            {/* RESPONSIBILITIES SECTION */}
            {Array.isArray(responsibilities) && responsibilities.length > 0 && (
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-2 top-0 bottom-0 w-1 rounded bg-gradient-to-b from-accent to-accent2 z-0" />
                {hasDetailedRoles ? (
                  responsibilities.map((role, idx) => {
                    // Defensive normalization for nested fields
                    const bullets = Array.isArray(role.bullets) ? role.bullets : [];
                    const role_links = Array.isArray(role.role_links) ? role.role_links : [];
                    const role_contributors = typeof role.role_contributors === 'string' ? role.role_contributors : (Array.isArray(role.role_contributors) ? role.role_contributors.join(", ") : "");
                    const role_contributors_link = Array.isArray(role.role_contributors_link) ? role.role_contributors_link : [];
                    return (
                      <div key={idx} className="mb-4 relative z-10">
                        <div className="flex justify-between items-center font-semibold text-accent2 text-base mb-1">
                          <span>〇 {role.role}</span>
                          <span className="text-accent font-medium text-sm ml-4">{role.date}</span>
                        </div>
                        {bullets.length > 0 ? (
                          <>
                            <ul className="ml-6 text-accent2 text-base list-disc">
                              {bullets.map((item, bidx) => (
                                <li key={bidx}>{item}</li>
                              ))}
                            </ul>
                            {/* Render links (multi-role) */}
                            {role_links.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                                {role_links.map((link, lidx) => (
                                  <LinkButton key={lidx} {...link} />
                                ))}
                              </div>
                            )}
                            {/* Display role_contributors if present */}
                            {role_contributors && (
                              <div className="flex items-center gap-1 ml-7 mt-1 text-[0.97em]">
                                {role_contributors.split(',').map((name, idx) => {
                                  const initials = getInitials(name);
                                  const link = role_contributors_link[idx];
                                  const circle = (
                                    <span
                                      key={idx}
                                      title={name.trim()}
                                      className="inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-white text-xs shadow-md cursor-pointer transition-colors duration-200 border-2 border-card"
                                      style={{
                                        background: stringToColor(name),
                                        marginLeft: idx === 0 ? 0 : -10,
                                        cursor: link ? 'pointer' : 'default',
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
                          </>
                        ) : (
                          // fallback for old format: treat role as a string
                          <ul className="ml-6 text-accent2 text-base list-disc relative z-10">
                            <li>{typeof role === 'string' ? role : ''}</li>
                          </ul>
                        )}
                      </div>
                    );
                  })
                ) : (
                  // Simple bullets only, no role titles
                  <ul className="ml-6 text-accent2 text-base list-disc relative z-10">
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {/* CONTRIBUTORS & LINKS/MEDIA SECTION */}
            {(contributors || (links && links.length > 0)) && (
              <div className="mt-4 text-accent2 text-sm flex items-center gap-2">
                {typeof contributors === 'string' && contributors && (
                  <div className="flex items-center gap-1">
                    {contributors.split(',').map((name, idx) => {
                      const initials = getInitials(name);
                      const link = Array.isArray(contributors_link) ? contributors_link[idx] : undefined;
                      const circle = (
                        <span
                          key={idx}
                          title={name.trim()}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white text-sm shadow-md cursor-pointer transition-colors duration-200 border-2 border-card"
                          style={{
                            background: stringToColor(name),
                            marginLeft: idx === 0 ? 0 : -10,
                            cursor: link ? 'pointer' : 'default',
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
                {/* Render links (single-role) in the old place */}
                {links && links.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    {links.map((link, idx) => (
                      <LinkButton key={idx} {...link} />
                    ))}
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