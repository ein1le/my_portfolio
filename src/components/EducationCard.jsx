import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaFileAlt, FaMedal, FaExternalLinkAlt, FaBook } from "react-icons/fa";
import PDFModal from "./PDFModal";


function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export default function EducationCard({ title, subheader, date, location, grade, modules = [], publications = [], awards = [], logo, hoverImage }) {
  let cardClass = "";
  if (title.includes("Bristol")) cardClass += " bristol";
  if (title.includes("Harrow")) cardClass += " harrow";
  const [expanded, setExpanded] = useState(false);
  const [openPdf, setOpenPdf] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState(title);
  const [subheaderDisplay, setSubheaderDisplay] = useState(subheader);
  const [showCursor, setShowCursor] = useState(false);

  React.useEffect(() => {
    if (hovered) {
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
  }, [hovered, title, subheader]);

  return (
    <div
      className={`bg-card border border-border rounded-xl mb-6 px-8 py-14 transition-all duration-200 flex flex-col min-w-0 relative overflow-hidden cursor-pointer ${expanded ? 'shadow-2xl' : ''} ${cardClass}`}
      onClick={() => setExpanded(e => !e)}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        boxShadow: !expanded ? '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(63,167,255,0.10), 0 4px 24px 0 rgba(0,0,0,0.12)' : undefined,
      }}
    >
      {/* Hover background image with gradient overlay */}
      {hoverImage && !expanded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s',
            backgroundImage: `linear-gradient(to left, rgba(35,35,43,0.01) 60%, rgba(35,35,43,0.85) 100%), linear-gradient(120deg, rgba(35,35,43,0.6) 0%, rgba(34,87,122,0.4) 100%), url(${hoverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
      )}
      <div className="flex justify-between items-center w-full relative z-10" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
        {/* Left logo */}
        {logo && (
          <img src={logo} alt="logo" className="w-16 h-16 rounded-full object-cover mr-7 bg-white shadow-md flex-shrink-0" style={{ width: 64, height: 64 }} />
        )}
        <div className="flex flex-col items-start justify-center text-left ml-0 flex-1">
          <div className="text-accent2 font-bold" style={{ fontSize: '2.1rem', lineHeight: 1.1 }}>
            {titleDisplay}
            {showCursor && hovered && <span className="inline-block animate-pulse ml-0.5">|</span>}
          </div>
          <div className="text-text mt-1" style={{ fontWeight: 600 }}>
            {subheaderDisplay}
          </div>
          {grade && (
            <div className="text-accent font-semibold text-[1.05em] mt-1">{grade}</div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <span className="flex items-center text-text" style={{ fontSize: '1.15rem', fontWeight: 600 }}><FaCalendarAlt className="mr-1 text-accent" /> {date}</span>
          <span className="flex items-center text-text" style={{ fontSize: '1.15rem', fontWeight: 600 }}><FaMapMarkerAlt className="mr-1 text-accent" /> {location}</span>
          <span className="mt-2 text-accent2 text-lg">{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      {/* Expandable section */}
      <div className={`transition-all duration-700 overflow-hidden ${expanded ? 'max-h-[2000px] mt-5 pt-3 pb-3' : 'max-h-0 pt-0 pb-0'}`}>
        {expanded && (
          <>
            {awards.length > 0 && (
              <div className="flex items-center gap-2 mb-2 ml-1 flex-wrap">
                {awards.map((award, idx) => (
                  <span key={idx} className="flex items-center bg-card border border-accent rounded-2xl px-3 py-1 text-accent2 text-sm font-medium shadow-sm gap-1 hover:bg-[#2d1e4a] hover:border-yellow-400 transition-colors duration-200" title={award}>
                    <FaMedal className="text-yellow-400 text-[1.1em] drop-shadow-sm mr-1" />
                    <span className="text-accent2 text-[0.98em] font-semibold">{award}</span>
                  </span>
                ))}
              </div>
            )}
            {modules.length > 0 && (
              <div className="mb-4">
                <div className="text-accent2 font-semibold text-[1.08em] mb-1">Modules</div>
                <ul className="text-text text-base ml-5 list-disc">
                  {modules.map((mod, idx) => (
                    <li key={idx} className="mb-1">{mod}</li>
                  ))}
                </ul>
              </div>
            )}
            {publications.length > 0 && (
              <div className="flex flex-col gap-4 bg-card rounded-lg pt-3">
                <div className="text-accent2 font-bold text-[1.1em] mb-2 pl-1">Publications & Papers</div>
                {publications.map((pub, idx) => (
                  <div
                    className="flex items-start gap-3 bg-card rounded-md px-3 py-2 shadow-sm cursor-pointer hover:bg-background/80 transition-colors duration-200"
                    key={idx}
                    onClick={e => { e.stopPropagation(); setOpenPdf(pub); }}
                  >
                    <FaFileAlt className="text-accent text-[1.3em] mt-1" />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-start w-full">
                        <div className="font-medium text-text text-[1.08em]">{pub.title}</div>
                        <div className="text-accent2 text-[0.98em] ml-4 whitespace-nowrap self-start">{pub.date}</div>
                      </div>
                      <div className="text-accent text-[0.98em] mt-1">{pub.course}</div>
                      {/* Authors as bubbles */}
                      {pub.authors && (
                        <div className="flex items-center mb-1 mt-1 ml-1" style={{ gap: 8 }}>
                          {pub.authors.split(',').map((name, idx) => {
                            const initials = getInitials(name);
                            return (
                              <span
                                key={idx}
                                title={name.trim()}
                                className="inline-flex items-center justify-center w-7 h-7 rounded-none border-2 border-accent shadow-md relative"
                                style={{
                                  clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)',
                                  background: stringToColor(name),
                                  marginLeft: 0,
                                  zIndex: 10 - idx,
                                }}
                              >
                                {initials}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <div className="text-accent2 text-[0.97em] mb-1">{pub.description}</div>
                      {pub.hyperlink && (
                        <a
                          href={pub.hyperlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent2 text-[0.97em] mt-1 flex items-center gap-1 hover:underline"
                        >
                          <span>Repository</span>
                          <FaExternalLinkAlt style={{ fontSize: '0.95em' }} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                <PDFModal
                  open={!!openPdf}
                  onClose={() => setOpenPdf(null)}
                  pdfUrl={openPdf?.pdfUrl}
                  pdfUrls={openPdf?.pdfUrls}
                  title={openPdf?.title}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 