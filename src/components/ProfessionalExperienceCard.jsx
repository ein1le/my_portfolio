import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaUserClock, FaUserTie, FaUserGraduate, FaUser } from "react-icons/fa";

const typeIconMap = {
  "contract": <FaUserClock style={{ color: '#a259f7', marginRight: 4 }} />, // contract
  "full-time": <FaUserTie style={{ color: '#b5cea8', marginRight: 4 }} />, // full-time
  "internship": <FaUserGraduate style={{ color: '#b5cea8', marginRight: 4 }} />, // internship
  "part-time": <FaUser style={{ color: '#b5cea8', marginRight: 4 }} />, // part-time
  "student-job": <FaUserGraduate style={{ color: '#b5cea8', marginRight: 4 }} /> // student-job
};

export default function ProfessionalExperienceCard({ title, subheader, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", logo, image, description, type }) {
  const [expanded, setExpanded] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState(title);
  const [subheaderDisplay, setSubheaderDisplay] = useState(subheader);
  const [showCursor, setShowCursor] = useState(false);
  let displayLogo = image || logo;
  if (!displayLogo) {
    displayLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
  const hasDetailedRoles = Array.isArray(responsibilities) && responsibilities.length > 0 && typeof responsibilities[0] === 'object' && responsibilities[0] !== null && responsibilities[0].role;

  // Typewriter effect
  React.useEffect(() => {
    if (hovered && !expanded) {
      let t = 0;
      let s = 0;
      setTitleDisplay("");
      setSubheaderDisplay("");
      setShowCursor(false);
      const titleInterval = setInterval(() => {
        t++;
        setTitleDisplay(title.slice(0, t));
        if (t >= title.length) {
          clearInterval(titleInterval);
          setShowCursor(true);
        }
      }, 18);
      const subheaderInterval = setInterval(() => {
        s++;
        setSubheaderDisplay(subheader.slice(0, s));
        if (s >= subheader.length) clearInterval(subheaderInterval);
      }, 18 + title.length * 2);
      return () => { clearInterval(titleInterval); clearInterval(subheaderInterval); };
    } else {
      setTitleDisplay(title);
      setSubheaderDisplay(subheader);
      setShowCursor(false);
    }
  }, [hovered, expanded, title, subheader]);

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
          <img src={displayLogo} alt="logo" className="w-10 h-10 rounded-full object-cover mr-5 bg-white shadow-md flex-shrink-0" />
        )}
        {/* Title and subtitle anchored to right of image, left-aligned */}
        <div className="flex flex-col items-start justify-center text-left ml-0 flex-1">
          <div className="text-accent2 font-bold text-3xl" style={{ marginBottom: '2px', lineHeight: 1.1 }}>
            {titleDisplay}
            {showCursor && hovered && !expanded && <span className="inline-block animate-pulse ml-0.5">|</span>}
          </div>
          <div className="text-text text-lg font-bold" style={{ marginTop: 0 }}>{subheaderDisplay}</div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[160px]">
          <span className="flex items-center text-text text-lg font-semibold"><FaCalendarAlt className="mr-1" /> {date}</span>
          <span className="flex items-center text-text text-lg font-semibold"><FaMapMarkerAlt className="mr-1" /> {location}</span>
          {/* Type field with icon */}
          {type && (
            <span className="inline-flex items-center bg-card text-accent border border-border rounded px-3 py-1 font-semibold text-[14px] ml-2"><span className="mr-1">{typeIconMap[type] || <FaUser style={{ color: '#a259f7', marginRight: 4 }} />}</span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          )}
          <span className="mt-2 text-accent2 text-lg">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      {/* Expandable section */}
      <div className={`transition-all duration-700 overflow-hidden ${expanded ? 'max-h-[2000px] mt-5 pt-3 pb-3 opacity-100 scale-100' : 'max-h-0 pt-0 pb-0 opacity-0 scale-95'} ease-in-out`}>
        {expanded && (
          <>
            {(skills && skills.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-card border border-accent rounded-xl px-3 py-1 text-accent2 text-sm font-medium shadow-sm">{skill}</span>
                ))}
              </div>
            )}
            {(languages && languages.length > 0) && (
              <div className="flex items-center gap-3 mb-3 justify-end w-full">
                {languages.map((lang, idx) => (
                  <span key={idx} className="text-accent text-xl hover:text-accent2 transition-transform duration-200" title={lang.name}>{lang.icon}</span>
                ))}
              </div>
            )}
            {description && (
              <div className="text-text text-base mb-3 mx-1">{description}</div>
            )}
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
                      {role.bullets && (
                        <ul className="ml-6 text-accent2 text-base list-disc">
                          {role.bullets.map((b, bidx) => <li key={bidx}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <ul className="ml-6 text-accent2 text-base list-disc relative z-10">
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {(contributors || (links && links.length > 0)) && (
              <div className="mt-4 ml-8 text-accent2 text-sm">
                {contributors && (
                  <div className="italic mb-1">Contributors: {contributors}</div>
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