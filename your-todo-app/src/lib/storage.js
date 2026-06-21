const STORAGE_KEY = "todo-app-tasks";

export function loadTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to load todos from localStorage:", err);
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (err) {
    console.error("Failed to save todos to localStorage:", err);
    return false;
  }
}