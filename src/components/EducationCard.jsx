import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaFileAlt, FaMedal } from "react-icons/fa";
import PDFModal from "./PDFModal";
import "./EducationCard.css";

export default function EducationCard({ title, subheader, date, location, grade, modules = [], publications = [], awards = [] }) {
  let cardClass = "education-card";
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
  return (
    <div className={cardClass + (expanded ? " expanded" : "")}
         onClick={() => setExpanded(e => !e)}
         tabIndex={0}
         style={{ cursor: "pointer" }}>
      <div className="education-card-main">
        {/* Left logo */}
        {logo && (
          <img src={logo} alt="logo" className="education-card-logo" />
        )}
        <div>
          <div className="education-title">{title}</div>
          <div className="education-subheader">{subheader}</div>
          {grade && (
            <div style={{ color: '#a259f7', fontSize: '1.05em', marginTop: 2 }}>{grade}</div>
          )}
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
            {awards.length > 0 && (
              <div className="education-awards">
                {awards.map((award, idx) => (
                  <span key={idx} className="education-award-tag" title={award}>
                    <FaMedal className="education-award-icon" />
                    <span className="education-award-text">{award}</span>
                  </span>
                ))}
              </div>
            )}
            {modules.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#b5cea8', fontWeight: 600, fontSize: '1.08em', marginBottom: 6 }}>Modules</div>
                <ul style={{ color: '#d4d4d4', fontSize: '1em', margin: 0, paddingLeft: 20 }}>
                  {modules.map((mod, idx) => (
                    <li key={idx} style={{ marginBottom: 2 }}>{mod}</li>
                  ))}
                </ul>
              </div>
            )}
            {publications.length > 0 && (
              <div className="education-publications">
                <div className="education-pub-header">Publications & Papers</div>
                {publications.map((pub, idx) => (
                  <div
                    className="education-publication"
                    key={idx}
                    onClick={e => { e.stopPropagation(); setOpenPdf(pub); }}
                    style={{ cursor: "pointer" }}
                  >
                    <FaFileAlt className="education-pub-icon" />
                    <div className="education-pub-content">
                      <div className="education-pub-title-row">
                        <div className="education-pub-title">{pub.title}</div>
                        <div className="education-pub-date">{pub.date}</div>
                      </div>
                      <div className="education-pub-course">{pub.course}</div>
                      <div className="education-pub-authors">{pub.authors}</div>
                      <div className="education-pub-desc">{pub.description}</div>
                    </div>
                  </div>
                ))}
                <PDFModal
                  open={!!openPdf}
                  onClose={() => setOpenPdf(null)}
                  pdfUrl={openPdf?.pdfUrl}
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