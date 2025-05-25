import React, { useState, useRef, useEffect } from "react";
import Explorer from "./components/Explorer.jsx";
import Editor from "./components/Editor.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import EducationCard from "./components/EducationCard.jsx";
import TimelineGitStyle from "./components/TimelineGitStyle.jsx";
import TetrahedronAnimation from "./components/TetrahedronAnimation.jsx";
import { FaPython, FaReact, FaHtml5, FaGithub, FaExternalLinkAlt, FaCertificate, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaEllipsisH, FaTimes, FaCommentDots } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions, VscTerminalPowershell, VscChevronDown, VscChevronUp, VscSplitHorizontal } from "react-icons/vsc";
import "./App.css";
import { fetchPublicRepos } from "./utils/github"; // adjust path as needed
import GithubCalendarSection from "./components/GitHubCalendar";
import GithubActivity from "./components/GitHubActivity";
import StaticSidebar from "./components/StaticSidebar";
import { getChatbotResponse } from "./utils/openai";
import wunbotIcon from './assets/wunbot.png'; // adjust path as needed

const files = [
  "about.md",
  "projects.py",
  "timeline",
  "education",
  "contact.json"
];

function ProjectsPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicRepos("ein1le")
      .then(data => {
        // Optionally filter out forked/private repos, or sort by stars, etc.
        setRepos(data.filter(repo => !repo.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <GithubCalendarSection />
      <GithubActivity /> {/* Optional */}
      <div className="projects-grid">
        {repos.map((repo) => (
          <div className="project-grid-card" key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {/* Use repo.owner.avatar_url or a fallback image */}
              <img
                src={repo.owner.avatar_url}
                alt={repo.name}
                className="project-grid-img"
              />
              <div className="project-grid-title">{repo.name}</div>
              <div className="project-grid-desc">{repo.description || "No description"}</div>
            </a>
          </div>
        ))}
      </div>
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
  const bristolPublications = [
    {
      title: "GKN Aerospace Ring Hoop Tension Test Investigation",
      course: "[MENGM5000] Group Industrial Project",
      authors: "Sophie Cook, Demetri Gaffney, Tallulah Jackson-Coombs, Daniel Lee",
      description: "An investigation on the parameters affecting the accuracy of material property determination of aluminium using ring hoop tension tests",
      date: "© April 29, 2025",
      pdfUrl: "/pdfs/bristol-paper.pdf"
    },
    {
      title: "Biomechanics of Legged Vehicles for Interplanetary Applications",
      course: "[MENGM0059] Advanced Topics in Mechanical Engineering",
      description: "Report on the biomechanical feasibility and modifications to a Boston Dynamics Spot robot for Martian applications",
      date: "February 25, 2025",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Richmond Building - Renewable Energy Strategy",
      course: "[MENGM0064] Renewable Energy for a Sustainable Future",
      authors: "Demetri Gaffney, Daniel Lee,Anjli Majitha",
      description: "Official proposition of renewable energy alternative solutions for the University of Bristol's Richmond Building for Scope 1-2 emissions reduction",
      date: "December 5, 2024",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Multivariable and Nonlinear Control of a 2-DOF Planar Manipulator",
      course: "[MENGM0067] Multivariable and Nonlinear Control",
      authors:"Ibrahim Arekat, William Sakyi",
      description: "",
      date: "December 3, 2024",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Reduced Order Recurrent Neural Networks for Vibration Modelling",
      course: "[SEMTM0007] Data-Driven Physical Modelling",
      description: "Utilisation of reduced order methods such as DMD, and various Neural Networks including ESNs, RNNs, and NODEs for modelling impact test vibration data",
      date: "November 28, 2024",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Evolutionary Algorithms for Optimisation of Sensors for SHM Applications",
      course: "[MENG35000] Individual Research Project",
      description: "Dissertation investiating heuristic information-based convex optimisation algorithms such as genetic algorithms and particle swarm for nonlinear optimisation of sensor placements on structural beams",
      date: "© May 9, 2024",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "STP Ltd. Management Portfolio",
      course: "[MENG30012] Engineering Management",
      authors:"Kabeer Dayal, Vic Komolrojanaporn,  Daniel Lee, Abdullah Monnoo, Aung Zaw Myat",
      description: "Business portfolio, including components of risk assessments, product quality management plan, shareholder brief, etc. for a planned fictional VR glasses product launch",
      date: "May 2, 2024",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Finite Element Analysis of GCU Design on LNG Carriers",
      course: "[MENGM30011] Applied Solid Mechanics",
      description: "",
      date: "December 14, 2023",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Deployable Solar Array Portfolio",
      course: "[MENG20006] Engineering Practice",
      authors:"Ibrahim Arekat, Kabeer Dayal, Abdullah Monnoo",
      description: "",
      date: "April 5, 2023",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Compliance and Material Properties Analysis of a Rack and Pin Hinge",
      course: "[MENG10005] Engineering Communication, Measurement, and Data Analysis",
      description: "",
      date: "May 14, 2022",
      pdfUrl: "/pdfs/bristol-article.pdf"
    },
    {
      title: "Design Portfolio",
      course: "[CENG10012] Engineering Design",
      description: "Robot Chariot and Artefact study of a SR-71 Design Report",
      date: "December 17, 2021",
      pdfUrl: "/pdfs/bristol-article.pdf"
    }
  ];
  const harrowPublications = [
    {
      title: "Harrow Science Fair",
      course: "SCI101",
      authors: "Emily Chan, Michael Lee",
      description: "Presented at Harrow Science Fair 2020, this project won first place.",
      date: "Mar 2020",
      pdfUrl: "/pdfs/harrow-science.pdf"
    },
    {
      title: "Harrow Math Olympiad",
      course: "MATH201",
      authors: "Sophie Tan, Daniel Kim",
      description: "Awarded at International Math Olympiad for innovative problem solving.",
      date: "Jul 2019",
      pdfUrl: "/pdfs/harrow-math.pdf"
    }
  ];
  const bristolAwards = ["Bristol PLUS Award", "Bristol Skills Accelerator"];
  const harrowAwards = ["Harrow Prize Distinction", "Sixth Form Mathematics Prize","Sixth Form House Prize"];
  return (
    <div>
      <EducationCard
        title="University of Bristol"
        subheader="Integrated Masters, Mechanical Engineering"
        date="2021 - 2025"
        location="Bristol, UK"
        publications={bristolPublications}
        awards={bristolAwards}
      />
      <EducationCard
        title="Harrow International School"
        subheader="Highschool"
        date="2011 - 2021"
        location="Bangkok, Thailand"
        publications={harrowPublications}
        awards={harrowAwards}
      />
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

function ExperienceCard({ title, subheader, date, location, responsibilities }) {
  const [expanded, setExpanded] = useState(false);
  let cardClass = "education-card experience-card";
  if (expanded) cardClass += " expanded";
  return (
    <div className={cardClass} onClick={() => setExpanded(e => !e)} tabIndex={0} style={{ cursor: "pointer" }}>
      <div className="education-card-main">
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
          <ul className="experience-responsibilities">
            {responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ExperiencesPage() {
  return (
    <div>
      {experiences.map((exp, idx) => (
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

function OtherExperienceCard({ title, subtitle, date, location, skills = [], languages = [], responsibilities = [], links = [], logo, description }) {
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
                        <ul style={{ marginLeft: 24, color: "#b5cea8", fontSize: "1em", position: 'relative' }}>
                          {role.bullets.map((item, bidx) => (
                            <li key={bidx}>{item}</li>
                          ))}
                        </ul>
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
  const experiences = [
    {
      title: "United Kingdom Singapore Student Council (UKSSC)",
      subtitle: "Technology Director",
      date: "Mar 2025 - Present",
      location: "London, UK",
      skills: ["Leadership", "Technology", "Strategy"],
      description: "Lorum ipsum",
      responsibilities: [
        {
          role: "Technology Director",
          date: "May 2025 - Present",
          bullets: ["Lorum ipsum dolor sit amet."]
        },
        {
          role: "Technology Associate",
          date: "Mar 2025 - May 2025",
          bullets: ["Lorum ipsum dolor sit amet."]
        },
        {
          role: "SingSoc Representative",
          date: "Mar 2024 - Mar 2025",
          bullets: ["Lorum ipsum dolor sit amet."]
        }
      ]
    },
    {
      title: "Bristol Investment Fund (BIF)",
      subtitle: "Portfolio Risk Analyst",
      date: "Jan 2025 - May 2025",
      location: "Bristol, UK",
      skills: ["Finance", "Risk Analysis", "Portfolio Management"],
      description: "Lorum ipsum",
      responsibilities: []
    },
    {
      title: "Bristol Trading Society (BTS)",
      subtitle: "Quantitative Analyst - Derivatives",
      date: "Jan 2025 - May 2025",
      location: "Bristol, UK",
      skills: ["Quantitative Analysis", "Derivatives", "Trading"],
      description: "Lorum ipsum",
      responsibilities: []
    },
  ];
  return (
    <div>
      {experiences.map((exp, idx) => (
        <OtherExperienceCard key={idx} {...exp} />
      ))}
    </div>
  );
}

function ExtracurricularExperiencesPage() {
  const experiences = [
    {
      title: "Malaysian and Singaporean Students' Association (MSSA)",
      subtitle: "Executive Committee 24/25, General Secretary",
      date: "Mar 2024 - May 2025",
      location: "Bristol, UK",
      skills: ["Leadership", "Organization", "Communication"],
      description: "Lorum ipsum",
      responsibilities: []
    },
    {
      title: "Bristol MechSoc",
      subtitle: "Executive Committee 24/25",
      date: "Mar 2024 - May 2025",
      location: "Bristol, UK",
      skills: ["Media", "Events", "Teamwork"],
      description: "Lorum ipsum",
      responsibilities: [
        {
          role: "Media Officer",
          date: "Mar 2024 - May 2025",
          bullets: ["Lorum ipsum dolor sit amet."]
        },
        {
          role: "Senior Events Representative",
          date: "Mar 2024 - May 2025",
          bullets: ["Lorum ipsum dolor sit amet."]
        }
      ]
    },
    {
      title: "University of Bristol Student's Union",
      subtitle: "BAME Network Committee",
      date: "Sep 2024 - Mar 2025",
      location: "Bristol, UK",
      skills: ["Diversity", "Advocacy", "Community"],
      description: "Lorum ipsum",
      responsibilities: []
    },
    {
      title: "University of Bristol Faculty of Engineering",
      subtitle: "Mechanical Engineering Course Representative",
      date: "Feb 2024 - May 2025",
      location: "Bristol, UK",
      skills: ["Representation", "Engineering", "Leadership"],
      description: "Lorum ipsum",
      responsibilities: [
        {
          role: "Senior Course Rep",
          date: "Aug 2024 - May 2025",
          bullets: ["Lorum ipsum dolor sit amet."]
        },
        {
          role: "Course Rep",
          date: "Feb 2024 - Aug 2024",
          bullets: ["Lorum ipsum dolor sit amet."]
        }
      ]
    },
    {
      title: "University of Bristol Thai Society",
      subtitle: "Executive Committee 21/22, Public Relations Officer",
      date: "Sep 21 - Mar 2022",
      location: "Bristol, UK",
      skills: ["Public Relations", "Event Promotion", "Community"],
      description: "Lorum ipsum",
      responsibilities: []
    }
  ];
  return (
    <div>
      {experiences.map((exp, idx) => (
        <OtherExperienceCard key={idx} {...exp} />
      ))}
    </div>
  );
}

const fileContents = {
  "about.md": (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <TetrahedronAnimation />
      <div style={{ position: "relative", zIndex: 1, padding: "48px 0 0 0" }}>
        <h2>About Me</h2>
        <p>I'm a passionate developer who loves building cool things!</p>
      </div>
    </div>
  ),
  "projects.py": <ProjectsPage />,
  "timeline": <TimelinePage />,
  "education.yml": <EducationPage />,
  "my_learning.log": <TimelineGitStyle />,
  "contact.json": <div><h2>Contact</h2><p>Email: you@example.com</p></div>,
  "professional_exp.ipynb": <ExperiencesPage />,
  "academic_exp.py": <OtherExperiencesPage />,
  "extracurricular_exp.py": <ExtracurricularExperiencesPage />,
  "skills.md": <TerminalSkills />
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

export default function App() {
  const [selected, setSelected] = useState("about.md");
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const mainContentRef = useRef(null);
  const [terminalHeight, setTerminalHeight] = useState(180);
  const [isTermResizing, setIsTermResizing] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotWidth, setChatbotWidth] = useState(340);
  const [isChatbotResizing, setIsChatbotResizing] = useState(false);

  const startResizing = (e) => {
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.body.style.cursor = "";
  };

  const resize = (e) => {
    if (isResizing) {
      let newWidth = e.clientX - staticSidebarWidth;
      if (newWidth < minDynamicSidebarWidth) newWidth = minDynamicSidebarWidth;
      if (newWidth > 400) newWidth = 400;
      setSidebarWidth(newWidth);
    }
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

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
    "skills.md": <TerminalSkills sidebarWidth={sidebarWidth} />
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
        <StaticSidebar />
        <div
          className="sidebar"
          style={{
            width: sidebarWidth,
            background: '#23232b',
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: staticSidebarWidth,
            top: headerHeight,
            height: `calc(100vh - ${headerHeight}px)`,
            boxSizing: "border-box",
            zIndex: 101,
          }}
        >
          <Explorer selected={selected} onSelect={setSelected} />
          <div
            className="sidebar-resizer"
            onMouseDown={startResizing}
            style={{ right: 0, top: 0, bottom: 0, width: 6, position: "absolute", cursor: "col-resize" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", marginLeft: staticSidebarWidth + sidebarWidth, marginRight: showChatbot ? chatbotWidth : 0 }}>
          <div className="main-content" ref={mainContentRef} style={{ flex: 1, minHeight: 0, paddingTop: headerHeight }}>
            <Editor content={dynamicFileContents[selected]} />
          </div>
          <StatusBar />
        </div>
        <TerminalWindow
          height={terminalHeight}
          onResizeStart={startTermResizing}
          sidebarOffset={staticSidebarWidth + sidebarWidth}
          rightOffset={rightSidebarOffset}
        />
        {showChatbot && (
          <ChatbotSidebar width={chatbotWidth} onResizeStart={startChatbotResizing} onClose={() => setShowChatbot(false)} />
        )}
      </div>
    </>
  );
} 