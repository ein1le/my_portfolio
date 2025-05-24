import React, { useState } from "react";
import Explorer from "./components/Explorer.jsx";
import Editor from "./components/Editor.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
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
    link: "https://github.com/yourusername/vscode-portfolio"
  },
  {
    title: "Cool API Project",
    description: "A RESTful API for managing tasks, built with Node.js and Express.",
    link: "https://github.com/yourusername/cool-api-project"
  },
  {
    title: "Personal Blog",
    description: "A markdown-powered blog with a custom static site generator.",
    link: "https://github.com/yourusername/personal-blog"
  }
];

function ProjectsPage() {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map((proj, idx) => (
        <ProjectCard key={idx} {...proj} />
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

const fileContents = {
  "about.md": <div><h2>About Me</h2><p>I'm a passionate developer who loves building cool things!</p></div>,
  "projects.py": <ProjectsPage />,
  "timeline": <TimelinePage />,
  "education": <div><h2>Education</h2><p>Education details will go here.</p></div>,
  "contact.json": <div><h2>Contact</h2><p>Email: you@example.com</p></div>
};

export default function App() {
  const [selected, setSelected] = useState(files[0]);
  return (
    <div className="app-container">
      <div className="main-content">
        <Explorer files={files} selected={selected} onSelect={setSelected} />
        <Editor content={fileContents[selected]} />
      </div>
      <StatusBar />
    </div>
  );
} 