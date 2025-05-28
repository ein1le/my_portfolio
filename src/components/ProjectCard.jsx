import React from "react";
import { FaPython, FaReact, FaHtml5, FaJs, FaNodeJs, FaJava, FaDatabase, FaGithub, FaCss3, FaRProject } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import "./ProjectCard.css";

const languageIconMap = {
  python: <FaPython style={{ color: '#3572A5' }} />,
  react: <FaReact style={{ color: '#61dafb' }} />,
  html: <FaHtml5 style={{ color: '#e34c26' }} />,
  javascript: <FaJs style={{ color: '#f7df1e' }} />,
  node: <FaNodeJs style={{ color: '#3c873a' }} />,
  java: <FaJava style={{ color: '#b07219' }} />,
  sql: <FaDatabase style={{ color: '#b07219' }} />,
  github: <FaGithub style={{ color: '#b5cea8' }} />,
  css: <FaCss3 style={{ color: '#264de4' }} />,
  vite: <SiVite style={{ color: '#646cff' }} />,
  r: <FaRProject style={{ color: '#264de4' }} />
};

export default function ProjectCard({ title, description, link, languages = [] }) {
  return (
    <div className="project-card taller-project-card">
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <div className="project-card-img-container">
        <img
          src="https://placehold.co/400x220/23232b/7ec699?text=Project+Image"
          alt="project placeholder"
          className="project-card-img-large"
        />
      </div>
      <div className="project-card-languages">
        {languages.length > 0 ? languages.map((lang, idx) => (
          <span key={idx} className="project-lang-tag">
            {languageIconMap[lang.toLowerCase()] || lang}
          </span>
        )) : null}
      </div>
      <p style={{ margin: '12px 0 16px 0' }}>{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer" className="project-link-btn">View Project</a>}
    </div>
  );
} 