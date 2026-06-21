import Papa from "papaparse";

// Expected CSV columns: title, dueDate, category, completed
export function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const todos = results.data
          .filter((row) => row.title && row.title.trim()) // skip rows with no title
          .map((row) => ({
            id: crypto.randomUUID(),
            title: row.title.trim(),
            dueDate: row.dueDate ? row.dueDate.trim() : null,
            category: ["Work", "Personal", "Urgent"].includes(row.category)
              ? row.category
              : "Personal",
            completed: row.completed === "true" || row.completed === "TRUE",
            createdAt: new Date().toISOString(),
          }));
        resolve(todos);
      },
      error: (err) => reject(err),
    });
  });
}