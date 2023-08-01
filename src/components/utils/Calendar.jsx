import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa los estilos predeterminados del calendario
import "../../styles/calendar.css"

const MyCalendar = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  return (
    <div className="my-calendar-container">
      {/* Clase para el contenedor del calendario */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="my-calendar"
        // Clase para el calendario
        tileClassName="my-calendar-day"
        // Clase para las celdas de día
      />
    </div>
  );
};

export default MyCalendar;
