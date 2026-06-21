"use client";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CATEGORY_COLORS = {
  Work: "#2563eb",
  Personal: "#16a34a",
  Urgent: "#dc2626",
};

export default function Calendar({ todos }) {
  // react-big-calendar needs each event to have a Date object for start/end
  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => ({
      id: todo.id,
      title: todo.title,
      start: new Date(todo.dueDate),
      end: new Date(todo.dueDate),
      allDay: true,
      category: todo.category,
    }));

  function eventStyleGetter(event) {
    return {
      style: {
        backgroundColor: CATEGORY_COLORS[event.category] || "#6b7280",
        borderRadius: "4px",
        color: "white",
        border: "none",
      },
    };
  }

  return (
    <div style={{ height: "600px", marginTop: "1rem" }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        views={["month"]}
      />
    </div>
  );
}