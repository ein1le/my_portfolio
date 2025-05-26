// SkillsSQLTable.jsx
import React, { useState } from "react";
import Papa from "papaparse";
import alasql from "alasql";

export default function SkillsSQLTable() {
  const [query, setQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [queried, setQueried] = useState(false);

  const handleQuery = () => {
    setError("");
    setQueried(true);
    fetch("/src/components/skills.csv")
      .then(res => {
        if (!res.ok) throw new Error("Could not load skills.csv");
        return res.text();
      })
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true });
        const data = parsed.data.filter(row => row.language);
        try {
          // alasql needs an array of objects
          alasql("DROP TABLE IF EXISTS skills");
          alasql("CREATE TABLE skills");
          alasql.tables.skills.data = data;
          // Run the query
          const result = alasql(query);
          if (result.length === 0) {
            setTableData([]);
            setColumns([]);
            setError("No results.");
            return;
          }
          setTableData(result);
          setColumns(Object.keys(result[0]));
        } catch (e) {
          setTableData([]);
          setColumns([]);
          setError("Invalid SQL query or unsupported operation.");
        }
      })
      .catch(() => {
        setError("Could not load skills.csv");
        setTableData([]);
        setColumns([]);
      });
  };

  return (
    <div style={{ background: "#18181f", borderRadius: 10, padding: 24, fontFamily: "Fira Mono, Consolas, monospace", color: "#b5cea8" }}>
      {/* Message box with transparent input and Query button */}
      <div style={{ marginBottom: 24, fontSize: 16, color: "#a259f7", background: "#23232b", borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', minHeight: 48 }}>
        <span style={{ color: "#b5cea8", marginRight: 8 }}>SQL&gt;</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="SELECT * from skills"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#b5cea8",
            fontFamily: "inherit",
            fontSize: 16,
            flex: 1,
            '::placeholder': { color: '#b5cea8', opacity: 0.3 }
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleQuery(); }}
        />
        <button
          onClick={handleQuery}
          style={{
            marginLeft: 12,
            background: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 18px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'background 0.15s',
            outline: 'none'
          }}
        >
          Query
        </button>
      </div>
      {error && <div style={{ color: '#ff4d4f', marginBottom: 16 }}>{error}</div>}
      {queried && !error && tableData.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#23232b", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#23232b", color: "#a259f7" }}>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th>
              {columns.map(col => (
                <th key={col} style={{ padding: "8px 12px", textAlign: "left" }}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 ? "#23232b" : "#20202a" }}>
                <td style={{ padding: "8px 12px", color: "#7ec699" }}>{i + 1}</td>
                {columns.map(col => (
                  <td key={col} style={{ padding: "8px 12px" }}>
                    {col === "projects" && row[col]
                      ? String(row[col]).split(';').map(p => (
                          <span key={p} style={{ background: "#007acc", color: "#fff", borderRadius: 6, padding: "2px 8px", marginRight: 6, fontSize: 13 }}>{p}</span>
                        ))
                      : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}