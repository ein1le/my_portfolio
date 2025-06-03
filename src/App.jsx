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
import OtherExperienceCard from "./components/OtherExperienceCard";
import UserInfoCard from "./components/UserInfoCard";
import TerminalWindow from "./components/TerminalWindow";
import ChatbotSidebar from "./components/ChatbotSidebar";
import userInfo from "./constants/userinfo";
import ProfessionalExperienceCard from "./components/ProfessionalExperienceCard";
import TerminalSkills from "./components/TerminalSkills";
import { Analytics } from "@vercel/analytics/react";

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

function EducationPage() {
  return (
    <div>
      {education.map((edu, idx) => (
        <EducationCard key={idx} {...edu} />
      ))}
    </div>
  );
}

function ExperiencesPage() {
  return (
    <div>
      {professionalExperiences.map((exp, idx) => (
        <ProfessionalExperienceCard key={idx} {...exp} />
      ))}
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

const iconMap = {
  FaGithub: <FaGithub style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  FaLinkedin: <FaLinkedin style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  FaTelegram: <FaTelegram style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  FaEnvelope: <FaEnvelope style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  FaPhone: <FaPhone style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  SiKaggle: <SiKaggle style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
  SiDiscord: <SiDiscord style={{ color: '#b5cea8', fontSize: 22, marginRight: 16 }} />,
};

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
                  {userInfo.map((info, idx) => (
                    <UserInfoCard
                      key={idx}
                      icon={iconMap[info.iconName]}
                      title={info.title}
                      subtitle={info.subtitle}
                      link={info.link}
                    />
                  ))}
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
      <Analytics />
    </>
  );
} 