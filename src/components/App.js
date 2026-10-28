
import React, { useState } from "react";
import ".styles/App.css";

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEditing, setIsEditing] = useState(false);
  const [yearInput, setYearInput] = useState(String(year));

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function previousYear() {
    setYear(year - 1);
  }

  function nextYear() {
    setYear(year + 1);
  }

  function saveYear() {
    const newYear = Number(yearInput);
    if (yearInput.trim() !== "" && Number.isInteger(newYear) &&
        newYear >= 1 && newYear <= 9999) {
      setYear(newYear);
    } else {
      setYearInput(String(year));
    }
    setIsEditing(false);
  }

  return (
    <div className="calendar">
      <h1>Calendar</h1>

      <div className="controls">
        <button id="prevYear" onClick={previousYear}>
          &lt;&lt;
        </button>

        <button id="prevMonth" onClick={previousMonth}>
          &lt;
        </button>

        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>

        {isEditing ? (
          <input
            id="yearInput"
            type="number"
            min="1"
            max="9999"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            onBlur={saveYear}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveYear();
              if (e.key === "Escape") {
                setYearInput(String(year));
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span
            id="year"
            onDoubleClick={() => {
              setYearInput(String(year));
              setIsEditing(true);
            }}
            title="Double-click to edit year"
          >
            {year}
          </span>
        )}

        <button id="nextMonth" onClick={nextMonth}>
          &gt;
        </button>

        <button id="nextYear" onClick={nextYear}>
          &gt;&gt;
        </button>
      </div>

      <table id="calendarTable">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <th key={day}>{day}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>{day ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
