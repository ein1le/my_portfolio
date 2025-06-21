import React from "react";
import { FaPython, FaReact, FaHtml5, FaJs, FaNodeJs, FaJava, FaDatabase, FaGithub, FaCss3, FaRProject, FaGit, FaFigma, FaSwift, FaBox } from "react-icons/fa";
import { SiVite, SiVercel, SiFlutter, SiDart, SiCmake, SiTailwindcss, SiJupyter, SiCplusplus, SiThreedotjs } from "react-icons/si";
import { motion } from "framer-motion";

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
  r: <FaRProject style={{ color: '#264de4' }} />,
  git: <FaGit style={{ color: '#b5cea8' }} />,
  vercel: <SiVercel style={{ color: '#fff', background: '#000', borderRadius: '3px' }} />,
  figma: <FaFigma style={{ color: '#b5cea8' }} />,
  flutter: <SiFlutter style={{ color: '#02569B' }} />,
  dart: <SiDart style={{ color: '#0175C2' }} />,
  cmake: <SiCmake style={{ color: '#064F8C' }} />,
  swift: <FaSwift style={{ color: '#F05138' }} />,
  "c++": <SiCplusplus style={{ color: '#00599C' }} />,
  tailwind: <SiTailwindcss style={{ color: '#38BDF8' }} />,
  jupyter: <SiJupyter style={{ color: '#F37626' }} />,
  threejs: <SiThreedotjs style={{ color: '#000' }} />,
  parcel: <FaBox style={{ color: '#f9c646' }} />
};
export default function ProjectCard({ title, description, link, languages = [], contributors = [], image }) {
  const [isHovered, setIsHovered] = React.useState(false);
  // Helper to get initials from a name
  function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  // Helper to generate a color from a string
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  }
  return (
    <motion.div
      className="min-h-[420px] max-w-[400px] flex flex-col justify-between items-stretch bg-card border border-border rounded-xl p-6 mb-6 shadow-card transition-all duration-200 hover:shadow-cardHover hover:border-accent"
      style={{ perspective: 1200 }}
      whileHover={{ rotateX: -14, boxShadow: "0 12px 32px 0 rgba(50,50,100,0.25)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full" style={{ minHeight: 60 }}>
        <motion.h3
          className="mb-3 text-accent2 font-bold text-2xl md:text-3xl z-20"
          initial={false}
          animate={isHovered ? { y: -36, scale: 1.15, boxShadow: "0 8px 32px 0 rgba(162,89,247,0.18)" } : { y: 0, scale: 1, boxShadow: "none" }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{ position: isHovered ? "absolute" : "relative", left: 24, top: isHovered ? 0 : undefined }}
        >
          {title}
        </motion.h3>
      </div>
      <div className="w-full flex justify-center items-center mb-3.5" style={{ paddingTop: isHovered ? 36 : 0 }}>
        <img
          src={image || "https://placehold.co/400x220/23232b/7ec699?text=Project+Image"}
          alt={title + " project image"}
          className="w-full max-w-[340px] h-[180px] object-cover rounded-lg bg-[#18181f] border border-border"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {languages.length > 0 ? languages.map((lang, idx) => (
          <span key={idx} className="flex items-center bg-[#18181f] rounded-lg px-2.5 py-1 text-accent2 text-base font-medium gap-1.5">
            {languageIconMap[lang.toLowerCase()] || lang}
          </span>
        )) : null}
      </div>
      {/* Contributors bubbles */}
      {contributors && contributors.length > 0 && (
        <div className="flex items-center gap-1.5 my-2">
          {contributors.map((contrib, idx) => {
            const name = typeof contrib === 'string' ? contrib : contrib.name;
            const link = typeof contrib === 'object' && contrib.link ? contrib.link : undefined;
            const initials = getInitials(name);
            const circle = (
              <span
                key={idx}
                title={name.trim()}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white text-sm shadow-md cursor-pointer transition-colors duration-200 border-2 border-card"
                style={{
                  background: stringToColor(name),
                  marginLeft: idx === 0 ? 0 : -10,
                  cursor: link ? 'pointer' : 'default',
                }}
                onClick={link ? (e) => { e.stopPropagation(); window.open(link, '_blank'); } : undefined}
              >
                {initials}
              </span>
            );
            return circle;
          })}
        </div>
      )}
      <p className="my-3 text-text">{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-white rounded-lg px-4 py-2 font-semibold text-[15px] cursor-pointer no-underline mt-6 transition-colors duration-150 hover:bg-[#005fa3]">View Project</a>}
    </motion.div>
  );
} 