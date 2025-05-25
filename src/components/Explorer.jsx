import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import "./Explorer.css";

const explorerStructure = [
  {
    type: "folder",
    name: "about",
    children: [
      { type: "file", name: "about.md" },
      { type: "file", name: "skills.md" },
      { type: "file", name: "contact.info" }
    ]
  },
  {
    type: "folder",
    name: "education",
    children: [
      { type: "file", name: "education.yml" },
      { type: "file", name: "my_learning.log" }
    ]
  },
  {
    type: "folder",
    name: "experiences",
    children: [
      { type: "file", name: "professional_exp.ipynb" },
      { type: "file", name: "other_exp.py" },
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

function Folder({ name, children, open, toggle, renderChildren }) {
  return (
    <div>
      <div className="explorer-folder" onClick={toggle}>
        {open ? <FaChevronDown /> : <FaChevronRight />} <span className="explorer-folder-label">{name}</span>
      </div>
      {open && <ul>{renderChildren()}</ul>}
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
    <div className="explorer">
      <h4>EXPLORER</h4>
      <div className="explorer-folder" onClick={() => setPortfolioOpen(o => !o)}>
        {portfolioOpen ? <FaChevronDown /> : <FaChevronRight />} <span className="explorer-folder-label">Portfolio</span>
      </div>
      {portfolioOpen && (
        <div style={{ paddingLeft: 12 }}>
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
                    className={selected === child.name ? "selected" : ""}
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