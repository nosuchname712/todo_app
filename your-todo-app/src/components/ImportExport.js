"use client";

import { useRef, useState } from "react";
import { parseCsvFile } from "@/lib/csvUtils";
import { parseExcelFile, exportTodosToExcel } from "@/lib/excelUtils";

export default function ImportExport({ todos, onImport }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");

    try {
      const isCsv = file.name.toLowerCase().endsWith(".csv");
      const imported = isCsv
        ? await parseCsvFile(file)
        : await parseExcelFile(file);

      if (imported.length === 0) {
        setError("No valid tasks found in the file. Check that it has a 'title' column.");
      } else {
        onImport(imported);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to read the file. Make sure it's a valid CSV or Excel file.");
    } finally {
      e.target.value = ""; // allow re-selecting the same file
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
      <button onClick={() => fileInputRef.current.click()}>
        Import CSV/Excel
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button onClick={() => exportTodosToExcel(todos)}>
        Export to Excel
      </button>

      {error && <span style={{ color: "red", fontSize: "0.85rem" }}>{error}</span>}
    </div>
  );
}