export function filterTodos(todos, { searchTerm, statusFilter }) {
  let result = todos;

  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    result = result.filter((todo) => todo.title.toLowerCase().includes(term));
  }

  if (statusFilter === "completed") {
    result = result.filter((todo) => todo.completed);
  } else if (statusFilter === "incomplete") {
    result = result.filter((todo) => !todo.completed);
  }
  // statusFilter === "all" → no filtering

  return result;
}

export function sortTodosByDueDate(todos, sortOrder) {
  if (sortOrder === "none") return todos;

  const sorted = [...todos].sort((a, b) => {
    // Todos with no due date are pushed to the end, regardless of sort direction
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return sorted;
}

export function paginate(todos, currentPage, pageSize) {
  const totalPages = Math.max(1, Math.ceil(todos.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const pageItems = todos.slice(startIndex, startIndex + pageSize);

  return {
    pageItems,
    totalPages,
    currentPage: safePage,
    totalItems: todos.length,
  };
}