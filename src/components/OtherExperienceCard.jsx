import React, { useState } from "react";
import { FaExternalLinkAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";

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

 
  //TODO: MechSoc? (Django?)
  //180
  // BIF
  // BTS
  // L2I
  

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
      className={`bg-card border border-border rounded-xl mb-6 px-8 py-10 shadow-card transition-all duration-200 flex flex-col min-w-0 relative overflow-hidden cursor-pointer group ${expanded ? 'shadow-2xl' : ''} ${!expanded ? 'hover:bg-accent/10 hover:border-accent hover:shadow-xl' : ''}`}
      onClick={() => setExpanded(e => !e)}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center w-full relative z-10">
        {/* Left logo, if provided */}
        {displayLogo && (
          <img src={displayLogo} alt="logo" className="w-10 h-10 rounded-full object-cover mr-5 bg-white shadow-md flex-shrink-0" />
        )}
        {/* Title and subtitle anchored to right of image, left-aligned */}
        <div className="flex flex-col items-start justify-center text-left ml-0 flex-1">
          <div className="text-accent2 font-bold text-xl leading-tight min-h-[1.5em]">
            {titleDisplay}
            {showCursor && hovered && !expanded && <span className="inline-block animate-pulse ml-0.5">|</span>}
          </div>
          <div className="text-text text-base mt-1 min-h-[1.2em]">{subtitleDisplay}</div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <span className="text-text text-sm">{date}</span>
          <span className="text-text text-sm">{location}</span>
          <span className="mt-2 text-accent2 text-lg">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      {/* Expandable section */}
      <div className={`transition-all duration-700 overflow-hidden ${expanded ? 'max-h-[2000px] mt-5 pt-3 pb-3 opacity-100 scale-100' : 'max-h-0 pt-0 pb-0 opacity-0 scale-95'} ease-in-out`}>
        {expanded && (
          <>
            {(skills.length > 0 || languages.length > 0) && (
              <div className="flex items-center mb-3 justify-between">
                <div className="flex flex-nowrap items-center gap-2 flex-1 min-w-0">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-card border border-accent rounded-xl px-3 py-1 text-accent2 text-sm font-medium shadow-sm">{skill}</span>
                  ))}
                </div>
                {languages.length > 0 && (
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    {languages.map((lang, idx) => (
                      <span key={idx} className="text-accent text-xl hover:text-accent2 transition-transform duration-200" title={lang.name}>{lang.icon}</span>
                    ))}
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
                  responsibilities.map((role, idx) => (
                    <div key={idx} className="mb-4 relative z-10">
                      <div className="flex justify-between items-center font-semibold text-accent2 text-base mb-1">
                        <span>〇 {role.role}</span>
                        <span className="text-accent font-medium text-sm ml-4">{role.date}</span>
                      </div>
                      {Array.isArray(role.bullets) ? (
                        <>
                          <ul className="ml-6 text-accent2 text-base list-disc">
                            {role.bullets.map((item, bidx) => (
                              <li key={bidx}>{item}</li>
                            ))}
                          </ul>
                          {/* Display role_contributors if present */}
                          {role.role_contributors && (
                            <div className="flex items-center gap-1 ml-7 mt-1 text-[0.97em]">
                              {role.role_contributors.split(',').map((name, idx) => {
                                const initials = getInitials(name);
                                const link = Array.isArray(role.role_contributors_link) ? role.role_contributors_link[idx] : undefined;
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
                          {/* Display role_links if present */}
                          {role.role_links && role.role_links.length > 0 && (
                            <div className="flex items-center gap-3 mt-1 flex-wrap ml-6">
                              {role.role_links.map((link, lidx) => (
                                link.type === "image" ? (
                                  <span key={lidx} className="cursor-pointer rounded overflow-hidden border border-border transition-colors duration-200 hover:border-accent" onClick={e => { e.stopPropagation(); setOpenImg(link.src); }}>
                                    <img src={link.src} alt="role media" className="w-10 h-10 object-cover" />
                                  </span>
                                ) : (
                                  <a key={lidx} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent text-[0.95em] font-medium hover:text-accent2 transition-colors duration-200">
                                    {link.icon || <FaExternalLinkAlt />} {link.label}
                                  </a>
                                )
                              ))}
                              {openImg && (
                                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[1000] cursor-pointer" onClick={() => setOpenImg(null)}>
                                  <img src={openImg} alt="role media" className="max-w-[90%] max-h-[90%] object-contain rounded-lg" />
                                </div>
                              )}
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
                  ))
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
              <div className="mt-4 ml-8 text-accent2 text-sm flex items-center gap-2">
                {contributors && (
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
              </div>
            )}
            {links && links.length > 0 && (
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {links.map((link, idx) => (
                  link.type === "image" ? (
                    <span key={idx} className="cursor-pointer rounded overflow-hidden border border-border transition-colors duration-200 hover:border-accent" onClick={e => { e.stopPropagation(); setOpenImg(link.src); }}>
                      <img src={link.src} alt="certificate" className="w-10 h-10 object-cover" />
                    </span>
                  ) : (
                    <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent text-[0.95em] font-medium hover:text-accent2 transition-colors duration-200">
                      {link.icon || <FaExternalLinkAlt />} {link.label}
                    </a>
                  )
                ))}
                {openImg && (
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[1000] cursor-pointer" onClick={() => setOpenImg(null)}>
                    <img src={openImg} alt="certificate" className="max-w-[90%] max-h-[90%] object-contain rounded-lg" />
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