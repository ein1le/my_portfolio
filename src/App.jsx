import React, { useState, useRef, useEffect } from "react";
import Explorer from "./components/Explorer.jsx";
import Editor from "./components/Editor.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import EducationCard from "./components/EducationCard.jsx";
import TimelineGitStyle from "./components/TimelineGitStyle.jsx";
import TetrahedronAnimation from "./components/TetrahedronAnimation.jsx";
import { FaPython, FaReact, FaHtml5, FaGithub, FaExternalLinkAlt, FaCertificate, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaEllipsisH, FaTimes, FaCommentDots, FaLinkedin, FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions, VscTerminalPowershell, VscChevronDown, VscChevronUp, VscSplitHorizontal } from "react-icons/vsc";
import { SiKaggle, SiDiscord } from "react-icons/si";
import "./App.css";
import { fetchPublicRepos } from "./utils/github"; // adjust path as needed
import GithubCalendarSection from "./components/GitHubCalendar";
import GithubActivity from "./components/GitHubActivity";
import StaticSidebar from "./components/StaticSidebar";
import { getChatbotResponse } from "./utils/openai";
import wunbotIcon from './assets/wunbot.png'; // adjust path as needed
import academicExperiences from "./constants/academic_exp";
import extracurricularExperiences from "./constants/extracurricular_exp";
import education from "./constants/education";
import professionalExperiences from "./constants/professional_exp";
import SkillsSQLTable from "./components/SkillsSQLTable.jsx";
import ReactMarkdown from "react-markdown";
import tangleSlime from './assets/tangleslime.png';
import projects from "./constants/projects";

const files = [
  "about.md",
  "projects.py",
  "timeline",
  "education",
  "skills.sql",
  "skills.erd",
  "skills.db",
  "skills.pivot",
  "contact.json"
];

function ProjectsPage() {
  return (
    <div className="projects-grid">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </div>
  );
}

function TimelinePage() {
  return (
    <div>
      <h2>Timeline</h2>
      <p>Interactive timeline coming soon!</p>
    </div>
  );
}

function EducationPage() {
  return (
    <div>
      {education.map((edu, idx) => (
        <EducationCard key={idx} {...edu} />
      ))}
    </div>
  );
}

const experiences = [
  {
    title: "Experience 1",
    subheader: "Role at Company 1",
    date: "2020 - 2021",
    location: "Location 1",
    responsibilities: [
      "Led a team of 5 engineers.",
      "Developed a new workflow system.",
      "Coordinated with cross-functional teams."
    ]
  },
  {
    title: "Experience 2",
    subheader: "Role at Company 2",
    date: "2019 - 2020",
    location: "Location 2",
    responsibilities: [
      "Managed project timelines and deliverables.",
      "Implemented CI/CD pipelines.",
      "Mentored junior developers."
    ]
  },
  {
    title: "Experience 3",
    subheader: "Role at Company 3",
    date: "2018 - 2019",
    location: "Location 3",
    responsibilities: [
      "Designed scalable backend systems.",
      "Optimized database queries.",
      "Presented findings to stakeholders."
    ]
  },
  {
    title: "Experience 4",
    subheader: "Role at Company 4",
    date: "2017 - 2018",
    location: "Location 4",
    responsibilities: [
      "Built customer-facing dashboards.",
      "Integrated third-party APIs.",
      "Conducted code reviews."
    ]
  }
];

function ExperienceCard({ title, subheader, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", logo, description }) {
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

function ExperiencesPage() {
  return (
    <div>
      {professionalExperiences.map((exp, idx) => (
        <ExperienceCard key={idx} {...exp} />
      ))}
    </div>
  );
}

const terminalLines = [
  { type: "prompt", text: "$ skills --list" },
  { type: "output", text: "> Languages:" },
  { type: "skill", label: "Python", bar: 10, max: 10 },
  { type: "skill", label: "JavaScript", bar: 8, max: 10 },
  { type: "skill", label: "C++", bar: 7, max: 10 },
  { type: "prompt", text: "$ tools --list" },
  { type: "output", text: "- Git, Docker, AWS, Linux..." }
];

function TerminalSkills({ sidebarWidth = 200 }) {
  const [cursorPos, setCursorPos] = useState(0); // index in terminalLines
  const [blink, setBlink] = useState(true);
  const termRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "ArrowDown") {
        setCursorPos(pos => Math.min(pos + 1, terminalLines.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setCursorPos(pos => Math.max(pos - 1, 0));
        e.preventDefault();
      } else if (e.key === "Tab") {
        setCursorPos(pos => (pos + 1) % terminalLines.length);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      const el = termRef.current.querySelector('.cursor-line');
      if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [cursorPos]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: `calc(100vw - ${sidebarWidth}px)`,
      height: '100vh',
      background: '#111',
      color: '#b5cea8',
      fontFamily: 'Fira Mono, Consolas, monospace',
      fontSize: '1.08em',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        background: '#23232b',
        color: '#b5cea8',
        fontWeight: 600,
        fontSize: '1em',
        padding: '8px 24px',
        borderBottom: '1.5px solid #31313a',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        letterSpacing: '1px'
      }}>
        C:\\Windows\\System32&gt;
      </div>
      <div
        ref={termRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 0 32px 0',
          margin: 0,
          width: '100%',
          outline: 'none',
          position: 'relative',
        }}
        tabIndex={0}
      >
        <div style={{ width: '100%', minHeight: 320, paddingLeft: 32 }}>
          {terminalLines.map((line, idx) => {
            let content;
            if (line.type === "prompt") {
              content = <span style={{ color: '#7ec699' }}>{line.text}</span>;
            } else if (line.type === "output") {
              content = <span style={{ color: '#d4d4d4' }}>{line.text}</span>;
            } else if (line.type === "skill") {
              const bar = '█'.repeat(line.bar) + ' '.repeat(line.max - line.bar);
              const barColor = <span style={{ color: '#a259f7' }}>{bar}</span>;
              content = <span style={{ color: '#b5cea8' }}>- {line.label.padEnd(12)} [{barColor}] {line.bar}/{line.max}</span>;
            }
            return (
              <div
                key={idx}
                className={idx === cursorPos ? 'cursor-line' : ''}
                style={{
                  background: idx === cursorPos ? '#23232b' : 'transparent',
                  position: 'relative',
                  minHeight: 28,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: idx === cursorPos ? 600 : 400
                }}
              >
                {content}
                {idx === cursorPos && (
                  <span style={{
                    display: 'inline-block',
                    width: 12,
                    height: 22,
                    marginLeft: 6,
                    background: blink ? '#b5cea8' : 'transparent',
                    borderRadius: 2,
                    verticalAlign: 'middle',
                    transition: 'background 0.1s',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OtherExperienceCard({ title, subtitle, date, location, skills = [], languages = [], responsibilities = [], links = [], contributors = "", logo, description }) {
  const [expanded, setExpanded] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  // Placeholder logic
  let displayLogo = logo;
  if (!displayLogo) {
    displayLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'; // You can replace with a more stylish placeholder if desired
  }
  // Determine if responsibilities is an array of objects (detailed roles) or just an array of strings (simple bullets)
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
          <div className="education-subheader">{subtitle}</div>
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
                            <div style={{ fontStyle: 'italic', color: '#b5cea8', marginLeft: 28, marginTop: 2, fontSize: '0.97em' }}>
                              Contributors: {role.role_contributors}
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
              <div style={{ margin: '16px 0 0 32px', color: '#b5cea8', fontSize: '0.98em' }}>
                {contributors && (
                  <div style={{ fontStyle: 'italic', marginBottom: links && links.length > 0 ? 6 : 0 }}>
                    <span>Contributors: {contributors}</span>
                  </div>
                )}
                {/* Optionally, you could render media here if you want to separate from links */}
              </div>
            )}
            {links.length > 0 && (
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

function OtherExperiencesPage() {
  return (
    <div>
      {academicExperiences.map((exp, idx) => (
        <OtherExperienceCard key={idx} {...exp} />
      ))}
    </div>
  );
}

function ExtracurricularExperiencesPage() {
  return (
    <div>
      {extracurricularExperiences.map((exp, idx) => (
        <OtherExperienceCard key={idx} {...exp} />
      ))}
    </div>
  );
}

function AboutMarkdownOverlay({ sidebarWidth, terminalHeight, rightSidebarOffset, headerHeight }) {
  const [portfolioInfo, setPortfolioInfo] = React.useState("");
  React.useEffect(() => {
    fetch("/src/components/portfolio-information.md")
      .then(res => res.text())
      .then(setPortfolioInfo);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: headerHeight,
        left: sidebarWidth,
        right: rightSidebarOffset,
        bottom: terminalHeight,
        width: `calc(100vw - ${sidebarWidth + rightSidebarOffset}px)`,
        height: `calc(100vh - ${headerHeight + terminalHeight}px)`,
        overflow: "auto",
        zIndex: 1
      }}
    >
      <TetrahedronAnimation />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(24,24,31,0.55)",
          color: "#b5cea8",
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{
          maxWidth: 600,
          width: "90%",
          margin: "0 auto",
          padding: 32,
          borderRadius: 16,
          background: "rgba(35,35,43,0.7)",
          boxShadow: "0 4px 32px #0006",
          pointerEvents: "auto"
        }}>
          <ReactMarkdown>{portfolioInfo}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function UserInfoCard({ icon, title, subtitle, link }) {
  return (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#23232b',
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

const fileContents = {
  "about.md": (props) => (
    <AboutMarkdownOverlay
      sidebarWidth={props.sidebarWidth}
      terminalHeight={props.terminalHeight}
      rightSidebarOffset={props.rightSidebarOffset}
      headerHeight={props.headerHeight}
    />
  ),
  "projects.py": <ProjectsPage />,
  "timeline": <TimelinePage />,
  "education.py": <EducationPage />,
  "my_learning.log": <TimelineGitStyle />,
  "contact.json": <div><h2>Contact</h2><p>Email: you@example.com</p></div>,
  "professional_exp.ipynb": <ExperiencesPage />,
  "academic_exp.py": <OtherExperiencesPage />,
  "extracurricular_exp.py": <ExtracurricularExperiencesPage />,
  "skills.md": <TerminalSkills />,
  "skills.sql": <SkillsSQLTable />
};

const staticSidebarWidth = 56;
const minDynamicSidebarWidth = 300; // adjust as needed for your content
const headerHeight = 48; // adjust to match your HeaderBar height in px

function TerminalWindow({ height, onResizeStart, sidebarOffset, rightOffset = 0 }) {
  const [lines, setLines] = useState([{ text: "", prompt: true }]);
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorPos, setCursorPos] = useState(0);
  const [blink, setBlink] = useState(true);
  const termRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  // Keyboard input logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement !== termRef.current) return;
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Insert character
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          line.text = line.text.slice(0, cursorPos) + e.key + line.text.slice(cursorPos);
          return newLines;
        });
        setCursorPos(pos => pos + 1);
        e.preventDefault();
      } else if (e.key === "Backspace") {
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          if (cursorPos > 0) {
            line.text = line.text.slice(0, cursorPos - 1) + line.text.slice(cursorPos);
            setCursorPos(pos => pos - 1);
          }
          return newLines;
        });
        e.preventDefault();
      } else if (e.key === "Delete") {
        setLines(lines => {
          const newLines = [...lines];
          const line = newLines[currentLine];
          line.text = line.text.slice(0, cursorPos) + line.text.slice(cursorPos + 1);
          return newLines;
        });
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        setCursorPos(pos => Math.max(0, pos - 1));
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setLines(lines => {
          const line = lines[currentLine];
          setCursorPos(pos => Math.min(line.text.length, pos + 1));
          return lines;
        });
        e.preventDefault();
      } else if (e.key === "Enter") {
        setLines(lines => [...lines, { text: "", prompt: true }]);
        setCurrentLine(line => line + 1);
        setCursorPos(0);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLine, cursorPos]);

  return (
    <div
      style={{
        position: "fixed",
        left: sidebarOffset,
        right: rightOffset,
        bottom: 0,
        height,
        background: "#111",
        color: "#b5cea8",
        borderTop: "2px solid #23232b",
        zIndex: 300,
        boxShadow: "0 -2px 12px #0008",
        display: "flex",
        flexDirection: "column",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
      }}
    >
      {/* Terminal header bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#23232b",
        borderBottom: "1.5px solid #31313a",
        height: 36,
        padding: "0 16px 0 0",
        userSelect: "none",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: 0.5,
        position: "relative"
      }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", height: "100%" }}>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>PROBLEMS</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>OUTPUT</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>DEBUG CONSOLE</span>
          <span style={{ color: "#fff", borderBottom: "2px solid #007acc", padding: "0 8px", fontWeight: 600 }}>TERMINAL</span>
          <span style={{ color: "#b5cea8", opacity: 0.7, padding: "0 8px" }}>PORTS</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <VscTerminalPowershell style={{ color: "#007acc", fontSize: 18 }} />
          <FaPlus style={{ color: "#b5cea8", fontSize: 14 }} />
          <VscChevronDown style={{ color: "#b5cea8", fontSize: 14 }} />
          <VscSplitHorizontal style={{ color: "#b5cea8", fontSize: 16 }} />
          <FaTrash style={{ color: "#b5cea8", fontSize: 14 }} />
          <FaEllipsisH style={{ color: "#b5cea8", fontSize: 16 }} />
          <VscChevronUp style={{ color: "#b5cea8", fontSize: 14 }} />
          <FaTimes style={{ color: "#b5cea8", fontSize: 14 }} />
        </div>
      </div>
      <div
        style={{
          height: 8,
          cursor: "ns-resize",
          background: "#23232b",
          width: "100%",
          zIndex: 301
        }}
        onMouseDown={onResizeStart}
      />
      <div
        ref={termRef}
        tabIndex={0}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 24px",
          outline: "none",
          fontFamily: 'Fira Mono, Consolas, monospace',
          fontSize: 15,
          cursor: "text"
        }}
        onClick={() => termRef.current && termRef.current.focus()}
      >
        {lines.map((line, idx) => {
          const isCurrent = idx === currentLine;
          const beforeCursor = isCurrent ? line.text.slice(0, cursorPos) : line.text;
          const afterCursor = isCurrent ? line.text.slice(cursorPos) : "";
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", minHeight: 24 }}>
              <span style={{ color: "#7ec699", marginRight: 8 }}>PS C:\Users\ein1le&gt;</span>
              <span>{beforeCursor}</span>
              {isCurrent && (
                <span style={{
                  display: 'inline-block',
                  width: 10,
                  height: 20,
                  background: blink ? '#b5cea8' : 'transparent',
                  margin: '0 1px',
                  borderRadius: 2,
                  verticalAlign: 'middle',
                  transition: 'background 0.1s',
                }} />
              )}
              <span>{afterCursor}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ChatbotSidebar component
function ChatbotSidebar({ width, onResizeStart, onClose }) {
  const [messages, setMessages] = React.useState([
    { sender: 'bot', text: 'Hi! I am wunbot. How can I help you?' }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const messagesEndRef = React.useRef(null);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInput = (e) => setInput(e.target.value);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setMessages(msgs => [
      ...msgs,
      { sender: 'user', text: input }
    ]);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const userMsgs = [
        ...messages,
        { sender: 'user', text: input }
      ];
      const reply = await getChatbotResponse(userMsgs, prefix);
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: reply }
      ]);
    } catch (err) {
      setError("Failed to get response from chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: headerHeight,
        right: 0,
        width,
        height: `calc(100vh - ${headerHeight}px)`,
        background: '#23232b',
        borderLeft: '1.5px solid #222',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        transition: 'width 0.1s',
      }}
    >
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1.5px solid #31313a', color: '#b5cea8', fontWeight: 600, fontSize: 17 }}>
        Chatbot
        <FaTimes style={{ cursor: 'pointer', color: '#b5cea8' }} onClick={onClose} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 12px 70px 12px', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, idx) => (
          msg.sender === 'bot' ? (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <img src={wunbotIcon} alt="wunbot" style={{ width: 28, height: 28, marginRight: 8 }} />
                <span style={{ color: '#a259f7', fontWeight: 700, fontSize: 15 }}>wunbot</span>
              </div>
              <div style={{
                background: '#31313a',
                color: '#b5cea8',
                borderRadius: 12,
                padding: '8px 14px',
                maxWidth: '80%',
                fontSize: 15,
                boxShadow: '0 1px 6px #0002'
              }}>{msg.text}</div>
            </div>
          ) : (
            <div key={idx} style={{
              alignSelf: 'flex-end',
              background: '#007acc',
              color: '#fff',
              borderRadius: 12,
              padding: '8px 14px',
              marginBottom: 8,
              maxWidth: '80%',
              fontSize: 15,
              boxShadow: '0 1px 6px #007acc33'
            }}>{msg.text}</div>
          )
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#a259f7', fontSize: 15, margin: '8px 0' }}>Thinking...</div>
        )}
        {error && (
          <div style={{ alignSelf: 'flex-start', color: '#ff4d4f', fontSize: 15, margin: '8px 0' }}>{error}</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '10px 12px',
          background: '#23232b',
          borderTop: '1.5px solid #31313a',
          display: 'flex',
          alignItems: 'center',
          zIndex: 202
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Type your message..."
          style={{
            flex: 1,
            background: '#18181f',
            color: '#b5cea8',
            border: 'none',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 15,
            outline: 'none',
            marginRight: 8
          }}
          disabled={loading}
        />
        <button type="submit" style={{
          background: '#007acc',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'background 0.15s'
        }} disabled={loading}>Send</button>
      </form>
      <div
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, cursor: 'col-resize', zIndex: 202 }}
        onMouseDown={onResizeStart}
      />
    </div>
  );
}

function GitSidebarProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchPublicRepos("ein1le")
      .then(data => {
        setRepos(data.filter(repo => !repo.fork));
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch GitHub projects");
        setLoading(false);
      });
  }, []);
  if (loading) return <div style={{ color: '#a259f7', marginTop: 12 }}>Loading projects...</div>;
  if (error) return <div style={{ color: '#ff4d4f', marginTop: 12 }}>{error}</div>;
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ color: '#a259f7', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>GitHub Projects</div>
      {repos.map((repo, idx) => (
        <ProjectCard
          key={repo.id}
          title={repo.name}
          description={repo.description || "No description"}
          link={repo.html_url}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState("about.md");
  const [activeSidebar, setActiveSidebar] = useState("explorer"); // 'explorer', 'git', 'search', etc. or null
  const [sidebarWidths, setSidebarWidths] = useState({
    explorer: 220,
    git: 300,
    search: 260,
    // add more as needed
  });
  const [isSidebarResizing, setIsSidebarResizing] = useState(false);
  const mainContentRef = useRef(null);
  const [terminalHeight, setTerminalHeight] = useState(180);
  const [isTermResizing, setIsTermResizing] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotWidth, setChatbotWidth] = useState(340);
  const [isChatbotResizing, setIsChatbotResizing] = useState(false);

  // Sidebar resize handlers
  const startSidebarResizing = (e) => {
    setIsSidebarResizing(true);
    document.body.style.cursor = "col-resize";
  };
  const stopSidebarResizing = () => {
    setIsSidebarResizing(false);
    document.body.style.cursor = "";
  };
  const resizeSidebar = (e) => {
    if (isSidebarResizing && activeSidebar) {
      let newWidth = e.clientX - staticSidebarWidth;
      if (newWidth < 220) newWidth = 220;
      if (newWidth > 400) newWidth = 400;
      setSidebarWidths(widths => ({ ...widths, [activeSidebar]: newWidth }));
    }
  };
  useEffect(() => {
    if (isSidebarResizing) {
      window.addEventListener("mousemove", resizeSidebar);
      window.addEventListener("mouseup", stopSidebarResizing);
    } else {
      window.removeEventListener("mousemove", resizeSidebar);
      window.removeEventListener("mouseup", stopSidebarResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resizeSidebar);
      window.removeEventListener("mouseup", stopSidebarResizing);
    };
  }, [isSidebarResizing, activeSidebar]);

  // Sidebar icon click handler
  const handleSidebarIconClick = (type) => {
    setActiveSidebar(prev => (prev === type ? null : type));
  };

  // Current sidebar width
  const currentSidebarWidth = activeSidebar ? sidebarWidths[activeSidebar] : 0;

  // Terminal resize handlers
  const startTermResizing = (e) => {
    setIsTermResizing(true);
    document.body.style.cursor = "ns-resize";
  };
  const stopTermResizing = () => {
    setIsTermResizing(false);
    document.body.style.cursor = "";
  };
  const resizeTerm = (e) => {
    if (isTermResizing) {
      const vh = window.innerHeight;
      let newHeight = vh - e.clientY;
      if (newHeight < 120) newHeight = 120;
      if (newHeight > vh * 0.6) newHeight = vh * 0.6;
      setTerminalHeight(newHeight);
    }
  };
  useEffect(() => {
    if (isTermResizing) {
      window.addEventListener("mousemove", resizeTerm);
      window.addEventListener("mouseup", stopTermResizing);
    } else {
      window.removeEventListener("mousemove", resizeTerm);
      window.removeEventListener("mouseup", stopTermResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resizeTerm);
      window.removeEventListener("mouseup", stopTermResizing);
    };
  }, [isTermResizing]);

  // Chatbot sidebar resize handlers
  const startChatbotResizing = (e) => {
    setIsChatbotResizing(true);
    document.body.style.cursor = "col-resize";
  };
  const stopChatbotResizing = () => {
    setIsChatbotResizing(false);
    document.body.style.cursor = "";
  };
  const resizeChatbot = (e) => {
    if (isChatbotResizing) {
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 300) newWidth = 300;
      if (newWidth > 400) newWidth = 400;
      setChatbotWidth(newWidth);
    }
  };
  useEffect(() => {
    if (isChatbotResizing) {
      window.addEventListener("mousemove", resizeChatbot);
      window.addEventListener("mouseup", stopChatbotResizing);
    } else {
      window.removeEventListener("mousemove", resizeChatbot);
      window.removeEventListener("mouseup", stopChatbotResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resizeChatbot);
      window.removeEventListener("mouseup", stopChatbotResizing);
    };
  }, [isChatbotResizing]);

  // Dynamically set skills.md content to pass sidebarWidth
  const dynamicFileContents = {
    ...fileContents,
    "skills.md": <TerminalSkills sidebarWidth={currentSidebarWidth} />,
    "skills.sql": <SkillsSQLTable />
  };

  // Pass right offset to TerminalWindow
  const rightSidebarOffset = showChatbot ? chatbotWidth : 0;

  return (
    <>
      <HeaderBar
        onChatbotClick={() => setShowChatbot(s => !s)}
        showChatbot={showChatbot}
      />
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        <StaticSidebar onSidebarIconClick={handleSidebarIconClick} activeSidebar={activeSidebar} />
        {/* Unified Sidebar: Only one visible at a time */}
        {activeSidebar && (
          <div
            className={`sidebar ${activeSidebar}-sidebar`}
            style={{
              width: currentSidebarWidth,
              background: '#23232b',
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: staticSidebarWidth,
              top: headerHeight,
              height: `calc(100vh - ${headerHeight}px - ${terminalHeight}px)`,
              boxSizing: "border-box",
              zIndex: 101,
              borderRight: activeSidebar === "git" ? '1.5px solid #222' : undefined,
              transition: 'width 0.1s, height 0.1s',
            }}
          >
            {activeSidebar === "explorer" && <Explorer selected={selected} onSelect={setSelected} />}
            {activeSidebar === "git" && (
              <>
                <div style={{ padding: 24, color: '#b5cea8', fontWeight: 600, fontSize: 18 }}>Git</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <GithubCalendarSection />
                  <GithubActivity />
                  <GitSidebarProjects />
                </div>
                <div style={{ flex: 1 }} />
              </>
            )}
            {activeSidebar === "search" && (
              <div style={{ padding: 24, color: '#b5cea8', fontWeight: 600, fontSize: 18 }}>Search (Coming Soon)</div>
            )}
            {activeSidebar === "contact" && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px 38px 24px 24px', gap: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <img src={tangleSlime} alt="Tangle Slime" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <div style={{ color: '#b5cea8', fontWeight: 600, fontSize: 20 }}>Drop me an email!</div>
                </div>
                <textarea
                  placeholder="Type your message..."
                  style={{
                    width: '100%',
                    minHeight: 120,
                    background: '#18181f',
                    color: '#b5cea8',
                    border: '1.5px solid #31313a',
                    borderRadius: 8,
                    padding: '12px 14px',
                    fontSize: 15,
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>
            )}
            {activeSidebar === "user" && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '20px 48px 24px 24px',
                gap: 18,
                overflowY: 'auto'
              }}>
                <div style={{ color: '#b5cea8', fontWeight: 600, fontSize: 20, marginBottom: 8 }}>User Info</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <UserInfoCard
                    icon={<FaGithub style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="GitHub"
                    subtitle="github.com/ein1le"
                    link="https://github.com/ein1le"
                  />
                  <UserInfoCard
                    icon={<FaLinkedin style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="LinkedIn"
                    subtitle="linkedin.com/in/wishawin/"
                    link="https://linkedin.com/in/wishawin/"
                  />
                  <UserInfoCard
                    icon={<FaTelegram style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="Telegram"
                    subtitle="t.me/einle1"
                    link="https://t.me/einle1"
                  />
                  <UserInfoCard
                    icon={<FaEnvelope style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="Email"
                    subtitle="wishawin@gmail.com"
                    link="mailto:wishawin@gmail.com"
                  />
                  <UserInfoCard
                    icon={<FaPhone style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="Phone"
                    subtitle="+44 7534578468"
                    link="tel:+44 7534578468"
                  />
                  <UserInfoCard
                    icon={<SiKaggle style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="Kaggle"
                    subtitle="kaggle.com/wishawinlertnawapan"
                    link="https://kaggle.com/wishawinlertnawapan"
                  />
                  <UserInfoCard
                    icon={<SiDiscord style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />}
                    title="Discord"
                    subtitle="discord.com/users/1wun/"
                    link="https://discord.com/users/1wun/"
                  />
                </div>
              </div>
            )}
            {/* Add more sidebar types as needed */}
            <div
              className="sidebar-resizer"
              onMouseDown={startSidebarResizing}
              style={{ right: 0, top: 0, bottom: 0, width: 6, position: "absolute", cursor: "col-resize" }}
            />
            <div
              style={{ position: 'absolute', top: 8, right: 12, color: '#b5cea8', cursor: 'pointer', fontSize: 20 }}
              onClick={() => setActiveSidebar(null)}
              title="Close Sidebar"
            >
              ×
            </div>
          </div>
        )}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: `calc(100vh - ${terminalHeight}px)`,
          overflow: "hidden",
          marginLeft: staticSidebarWidth + currentSidebarWidth,
          marginRight: showChatbot ? chatbotWidth : 0
        }}>
          <div className="main-content" ref={mainContentRef} style={{ flex: 1, minHeight: 0, paddingTop: headerHeight }}>
            <Editor
              content={typeof dynamicFileContents[selected] === 'function' ? dynamicFileContents[selected] : dynamicFileContents[selected]}
              sidebarWidth={staticSidebarWidth + currentSidebarWidth}
              terminalHeight={terminalHeight}
              rightSidebarOffset={rightSidebarOffset}
              headerHeight={headerHeight}
            />
          </div>
          <StatusBar />
        </div>
        <TerminalWindow
          height={terminalHeight}
          onResizeStart={startTermResizing}
          sidebarOffset={staticSidebarWidth + currentSidebarWidth}
          rightOffset={rightSidebarOffset}
        />
        {showChatbot && (
          <ChatbotSidebar width={chatbotWidth} onResizeStart={startChatbotResizing} onClose={() => setShowChatbot(false)} />
        )}
      </div>
    </>
  );
} 