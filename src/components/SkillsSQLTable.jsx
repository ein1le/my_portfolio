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
    fetch("/skills.csv")
      .then(res => {
        if (!res.ok) throw new Error("Could not load skills.csv");
        return res.text();
      })
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true });
        const data = parsed.data.filter(row => row.name);
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
    <div style={{
      background: "#23272f",
      borderRadius: 16,
      padding: 32,
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#e3e8ee",
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {/* Message box with transparent input and Query button */}
      <div style={{
        marginBottom: 28,
        fontSize: 17,
        color: "#3fa7ff",
        background: "#262b36",
        borderRadius: 12,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        minHeight: 52,
        boxShadow: "0 2px 8px rgba(63,167,255,0.04)"
      }}>
        <span style={{ color: "#3fa7ff", marginRight: 10, fontWeight: 600 }}>SQL&gt;</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="SELECT * from skills"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e3e8ee",
            fontFamily: "inherit",
            fontSize: 17,
            flex: 1,
            padding: "4px 0"
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleQuery(); }}
        />
        <button
          onClick={handleQuery}
          style={{
            marginLeft: 14,
            background: 'linear-gradient(90deg, #3fa7ff 0%, #6f7bfd 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '8px 22px',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.18s, box-shadow 0.18s',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(63,167,255,0.10)'
          }}
        >
          Query
        </button>
      </div>
      {error && <div style={{ color: '#ff6b81', marginBottom: 18, fontWeight: 500 }}>{error}</div>}
      {queried && !error && tableData.length > 0 && (
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          background: "#23272f",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(63,167,255,0.04)"
        }}>
          <thead>
            <tr style={{ background: "#232b3a", color: "#3fa7ff" }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>#</th>
              {columns.map(col => (
                <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 ? "#23272f" : "#20232a" }}>
                <td style={{ padding: "10px 16px", color: "#7ec699", fontWeight: 600 }}>{i + 1}</td>
                {columns.map(col => (
                  <td key={col} style={{ padding: "10px 16px" }}>
                    {col === "libraries" && row[col]
                      ? String(row[col]).split(';').filter(lib => lib.trim()).map(lib => (
                          <button
                            key={lib}
                            style={{
                              background: "#232b3a",
                              color: "#3fa7ff",
                              border: "none",
                              borderRadius: 999,
                              padding: "4px 16px",
                              marginRight: 8,
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: "pointer",
                              marginBottom: 4,
                              boxShadow: "0 1px 4px rgba(63,167,255,0.08)",
                              transition: "background 0.18s, color 0.18s"
                            }}
                            onMouseOver={e => {
                              e.target.style.background = '#3fa7ff';
                              e.target.style.color = '#232b3a';
                            }}
                            onMouseOut={e => {
                              e.target.style.background = '#232b3a';
                              e.target.style.color = '#3fa7ff';
                            }}
                          >
                            {lib}
                          </button>
                        ))
                      : col === "projects" && row[col]
                        ? String(row[col]).split(';').map(p => (
                            <span key={p} style={{
                              background: "linear-gradient(90deg, #6f7bfd 0%, #3fa7ff 100%)",
                              color: "#fff",
                              borderRadius: 999,
                              padding: "4px 14px",
                              marginRight: 8,
                              fontSize: 14,
                              fontWeight: 600,
                              display: 'inline-block',
                              marginBottom: 4,
                              boxShadow: "0 1px 4px rgba(111,123,253,0.10)"
                            }}>{p}</span>
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