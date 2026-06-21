"use client";

export default function Filters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1, minWidth: "150px" }}
      />

      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        <option value="none">No sort</option>
        <option value="asc">Due date ↑</option>
        <option value="desc">Due date ↓</option>
      </select>
    </div>
  );
}