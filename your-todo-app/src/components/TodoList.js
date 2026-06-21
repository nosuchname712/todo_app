"use client";

import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return <p>No tasks yet — add one above.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}