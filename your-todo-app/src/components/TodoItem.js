"use client";

import { useState } from "react";
import EditTodo from "./EditTodo";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditTodo
        todo={todo}
        onSave={(id, changes) => {
          onUpdate(id, changes);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#999" : "#000",
          flex: 1,
        }}
      >
        {todo.title}
      </span>
      <span style={{ fontSize: "0.8rem", color: "#666" }}>
        {todo.category}
        {todo.dueDate ? ` · due ${todo.dueDate}` : ""}
      </span>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}