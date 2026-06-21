import * as XLSX from "xlsx";

// Import: reads an uploaded .xlsx file → Todo[]
export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        const todos = rows
          .filter((row) => row.title && String(row.title).trim())
          .map((row) => ({
            id: crypto.randomUUID(),
            title: String(row.title).trim(),
            dueDate: row.dueDate ? String(row.dueDate).trim() : null,
            category: ["Work", "Personal", "Urgent"].includes(row.category)
              ? row.category
              : "Personal",
            completed: row.completed === true || row.completed === "true",
            createdAt: new Date().toISOString(),
          }));

        resolve(todos);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

// Export: takes current todos → triggers a .xlsx download
export function exportTodosToExcel(todos, filename = "todo-export.xlsx") {
  const rows = todos.map((todo) => ({
    Title: todo.title,
    "Due Date": todo.dueDate || "",
    Category: todo.category,
    Completed: todo.completed ? "Yes" : "No",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  XLSX.writeFile(workbook, filename);
}