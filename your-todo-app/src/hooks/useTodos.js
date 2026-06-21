"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "todo-app-tasks";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load todos from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever todos change (skip the very first render)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error("Failed to save todos to localStorage:", err);
    }
  }, [todos, isLoaded]);

  function addTodo({ title, dueDate, category }) {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      dueDate: dueDate || null,
      category: category || "Personal",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function updateTodo(id, changes) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function importTodos(newTodos) {
    setTodos((prev) => [...prev, ...newTodos]);
  }

  function reorderTodos(newOrderArray) {
    setTodos(newOrderArray);
  }

  return {
    todos,
    isLoaded,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    importTodos,
    reorderTodos,
  };
}