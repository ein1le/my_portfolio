import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const explorerStructure = [
  {
    type: "folder",
    name: "about",
    children: [
      { type: "file", name: "about.md" },
      { type: "file", name: "skills.sql" }
    ]
  },
  {
    type: "folder",
    name: "education",
    children: [
      { type: "file", name: "education.py" },
      { type: "file", name: "my_learning.log" }
    ]
  },
  {
    type: "folder",
    name: "experiences",
    children: [
      { type: "file", name: "professional_exp.ipynb" },
      { type: "file", name: "academic_exp.py" },
      { type: "file", name: "extracurricular_exp.py" },
      { type: "file", name: "volunteering.py" }
    ]
  },
  {
    type: "folder",
    name: "projects",
    children: [
      { type: "file", name: "projects.py" }
    ]
  }
];

const fileDescriptions = {
  "about.md": "Hero Page",
  "skills.sql": "Skills Database",
  "education.py": "Academic History",
  "my_learning.log": "Learning and Events Log",
  "professional_exp.ipynb": "Professional Experience",
  "academic_exp.py": "Academic-related Extracurriculars",
  "extracurricular_exp.py": "Other Extracurriculars",
  "volunteering.py": "Volunteering Activities",
  "projects.py": "Personal Projects Portfolio"
};

function Folder({ name, children, open, toggle, renderChildren }) {
  return (
    <div>
      <div className="flex items-center cursor-pointer py-1 pl-2 pr-0 text-text font-bold select-none transition-colors duration-200 hover:bg-[#31313a]" onClick={toggle}>
        {open ? <FaChevronDown /> : <FaChevronRight />} <span className="ml-1 text-lg">{name}</span>
      </div>
      {open && <ul className="list-none pl-4 m-0">{renderChildren()}</ul>}
    </div>
  );
}

export default function Explorer({ selected, onSelect }) {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState({
    about: true,
    education: true,
    experiences: true,
    projects: true
  });

  const toggleFolder = folder => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="w-[200px] bg-card py-4 border-r border-[#222] text-text">
      <h4 className="m-0 mb-2 ml-4 text-xl text-accent2 tracking-wide">EXPLORER</h4>
      <div className="flex items-center cursor-pointer py-1 pl-2 pr-0 text-text font-bold select-none transition-colors duration-200 hover:bg-[#31313a]" onClick={() => setPortfolioOpen(o => !o)}>
        {portfolioOpen ? <FaChevronDown /> : <FaChevronRight />} <span className="ml-1 text-xl">Portfolio</span>
      </div>
      {portfolioOpen && (
        <div className="pl-3">
          {explorerStructure.map(folder => (
            <Folder
              key={folder.name}
              name={folder.name}
              open={openFolders[folder.name]}
              toggle={e => {
                e.stopPropagation();
                toggleFolder(folder.name);
              }}
              renderChildren={() =>
                folder.children.map(child => (
                  <li
                    key={child.name}
                    className={`rounded px-2 py-1 cursor-pointer transition-colors duration-200 text-lg ${selected === child.name ? 'bg-[#31313a] text-white' : 'hover:bg-[#31313a] hover:text-white'}`}
                    title={fileDescriptions[child.name] || undefined}
                    onClick={e => {
                      e.stopPropagation();
                      onSelect(child.name);
                    }}
                  >
                    {child.name}
                  </li>
                ))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
} 