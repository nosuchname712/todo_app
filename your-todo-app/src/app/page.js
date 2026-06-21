"use client";

import { useState, useMemo } from "react";
import useTodos from "@/hooks/useTodos";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import ImportExport from "@/components/ImportExport";
import { filterTodos, sortTodosByDueDate, paginate } from "@/lib/todoUtils";

export default function Home() {
  const {
    todos,
    isLoaded,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    importTodos,
  } = useTodos();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Recompute only when an input actually changes, not on every render
  const processedTodos = useMemo(() => {
    const filtered = filterTodos(todos, { searchTerm, statusFilter });
    return sortTodosByDueDate(filtered, sortOrder);
  }, [todos, searchTerm, statusFilter, sortOrder]);

  const { pageItems, totalPages, currentPage: safePage } = useMemo(
    () => paginate(processedTodos, currentPage, pageSize),
    [processedTodos, currentPage, pageSize]
  );

  // Reset to page 1 whenever a filter/search/sort changes, so you don't get stranded on an empty page
  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }
  function handleStatusChange(value) {
    setStatusFilter(value);
    setCurrentPage(1);
  }
  function handleSortChange(value) {
    setSortOrder(value);
    setCurrentPage(1);
  }
  function handlePageSizeChange(value) {
    setPageSize(value);
    setCurrentPage(1);
  }

  if (!isLoaded) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
      <h1>To-Do List</h1>

      <AddTodo onAdd={addTodo} />

      <ImportExport todos={todos} onImport={importTodos} />

      <Filters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <TodoList
        todos={pageItems}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </main>
  );
}