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

export default function EducationCard({ title, subheader, date, location, grade, modules = [], publications = [], awards = [] }) {
  let cardClass = "";
  if (title.includes("Bristol")) cardClass += " bristol";
  if (title.includes("Harrow")) cardClass += " harrow";
  const [expanded, setExpanded] = useState(false);
  const [openPdf, setOpenPdf] = useState(null);
  // Logo selection
  let logo = null;
  if (title.includes("Bristol")) {
    logo = "https://upload.wikimedia.org/wikipedia/en/3/3a/University_of_Bristol_logo.svg";
  } else if (title.includes("Harrow")) {
    logo = "https://www.harrowschool.ac.th/wp-content/uploads/2020/09/harrow-logo.png";
  }
  // Custom background for hover (Bristol/Harrow)
  const hoverBg = title.includes("Bristol")
    ? "hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:z-0 hover:before:opacity-25 hover:before:bg-cover hover:before:bg-center hover:before:bg-no-repeat hover:before:pointer-events-none hover:before:rounded-xl hover:before:bg-[linear-gradient(120deg,_#007acc99_0%,_#b5cea899_100%),_url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')]"
    : title.includes("Harrow")
    ? "hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:z-0 hover:before:opacity-25 hover:before:bg-cover hover:before:bg-center hover:before:bg-no-repeat hover:before:pointer-events-none hover:before:rounded-xl hover:before:bg-[linear-gradient(120deg,_#007acc99_0%,_#b5cea899_100%),_url('https://www.harrowschool.ac.th/wp-content/uploads/2020/09/harrow-bangkok-campus.jpg')]"
    : "";
  return (
    <div
      className={`bg-card border border-border rounded-xl mb-6 px-8 py-10 shadow-card transition-all duration-200 flex flex-col min-w-0 relative overflow-hidden cursor-pointer ${expanded ? 'shadow-2xl' : ''} ${hoverBg}`}
      onClick={() => setExpanded(e => !e)}
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full relative z-10">
        {/* Left logo */}
        {logo && (
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full object-cover mr-5 bg-white shadow-md flex-shrink-0" />
        )}
        <div className="flex flex-col items-start justify-center text-left ml-0 flex-1">
          <div className="text-accent2 font-bold text-xl leading-tight">{title}</div>
          <div className="text-text text-base mt-1">{subheader}</div>
          {grade && (
            <div className="text-accent font-semibold text-[1.05em] mt-1">{grade}</div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <span className="flex items-center text-text text-sm"><FaCalendarAlt className="mr-1 text-accent" /> {date}</span>
          <span className="flex items-center text-text text-sm"><FaMapMarkerAlt className="mr-1 text-accent" /> {location}</span>
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