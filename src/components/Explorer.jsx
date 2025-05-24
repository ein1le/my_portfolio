import React from "react";
import "./Explorer.css";

export default function Explorer({ files, onSelect, selected }) {
  return (
    <div className="explorer">
      <h4>EXPLORER</h4>
      <ul>
        {files.map(file => (
          <li
            key={file}
            className={selected === file ? "selected" : ""}
            onClick={() => onSelect(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
} 