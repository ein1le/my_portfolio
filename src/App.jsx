import React, { useState, useRef, useEffect } from "react";
import Explorer from "./components/Explorer.jsx";
import Editor from "./components/Editor.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import EducationCard from "./components/EducationCard.jsx";
import TimelineGitStyle from "./components/TimelineGitStyle.jsx";
import TetrahedronAnimation from "./components/TetrahedronAnimation.jsx";
import "./App.css";

const files = [
  "about.md",
  "projects.py",
  "timeline",
  "education",
  "contact.json"
];

const projects = [
  {
    title: "VS Code Portfolio",
    description: "A developer portfolio styled like the VS Code interface, built with React.",
    link: "https://github.com/yourusername/vscode-portfolio",
    image: "https://raw.githubusercontent.com/microsoft/vscode-docs/main/images/code-stable.png"
  },
  {
    title: "Cool API Project",
    description: "A RESTful API for managing tasks, built with Node.js and Express.",
    link: "https://github.com/yourusername/cool-api-project",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Personal Blog",
    description: "A markdown-powered blog with a custom static site generator.",
    link: "https://github.com/yourusername/personal-blog",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website built with React and Vite.",
    link: "https://github.com/yourusername/portfolio-website",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  }
];

function ProjectsPage() {
  return (
    <div className="projects-grid">
      {projects.map((proj, idx) => (
        <div className="project-grid-card" key={idx}>
          <a href={proj.link} target="_blank" rel="noopener noreferrer">
            <img src={proj.image} alt={proj.title} className="project-grid-img" />
            <div className="project-grid-title">{proj.title}</div>
            <div className="project-grid-desc">{proj.description}</div>
          </a>
        </div>
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
        <div>
          <div className="education-title">{title}</div>
          <div className="education-subheader">{subheader}</div>
        </div>
        <div className="education-card-right">
          <span className="education-date">{date}</span>
          <span className="education-location">{location}</span>
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
      left: sidebarWidth,
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
  "other_exp.py": <div><h2>Other Experience</h2><p>Details about other experience.</p></div>,
  "skills.md": <TerminalSkills />
};

export default function App() {
  const [selected, setSelected] = useState("about.md");
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const mainContentRef = useRef(null);

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
      let newWidth = e.clientX;
      if (mainContentRef.current) {
        const rect = mainContentRef.current.getBoundingClientRect();
        newWidth = e.clientX - rect.left;
      }
      if (newWidth < 200) newWidth = 200;
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

  // Dynamically set skills.md content to pass sidebarWidth
  const dynamicFileContents = {
    ...fileContents,
    "skills.md": <TerminalSkills sidebarWidth={sidebarWidth} />
  };

  return (
    <div className="app-container">
      <HeaderBar />
      <div className="main-content" ref={mainContentRef}>
        <div
          className="sidebar"
          style={{ width: sidebarWidth, background: '#23232b' }}
        >
          <Explorer selected={selected} onSelect={setSelected} />
          <div
            className="sidebar-resizer"
            onMouseDown={startResizing}
            style={{ right: 0 }}
          />
        </div>
        <Editor content={dynamicFileContents[selected]} />
      </div>
      <StatusBar />
    </div>
  );
} 