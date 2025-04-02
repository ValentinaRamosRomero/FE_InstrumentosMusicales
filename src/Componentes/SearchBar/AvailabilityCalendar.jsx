import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./AvailabilityCalendar.css";
import calendarIcon from '../../assets/icons/calendar-icon.png';

const AvailabilityCalendar = ({ onFilterByDate }) => {
  const [dateInit, setDateInit] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  const handleApplyFilter = () => {
    if (!dateInit || !dateEnd) {
      alert("Selecciona un rango de fechas primero.");
      return;
    }

    const formattedInit = formatDate(dateInit);
    const formattedEnd = formatDate(dateEnd);

    const requestBody = {
      dateInit: formattedInit,
      dateEnd: formattedEnd
    };

    console.log("📤 Enviando al backend:\n", JSON.stringify(requestBody, null, 2));

    if (onFilterByDate) {
      onFilterByDate(formattedInit, formattedEnd);
    }

    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="availability-calendar">
      <div className="calendar-icon-container" onClick={toggleCalendar}>
        <img src={calendarIcon} alt="Calendario" className={`calendar-icon ${showCalendar ? 'rotated' : ''}`} />
      </div>

      {showCalendar && (
        <div className="calendar-popup" ref={calendarRef}>
          <DatePicker
            selected={dateInit}
            onChange={(dates) => {
              const [start, end] = dates;
              setDateInit(start);
              setDateEnd(end);
              if (start) console.log("📅 Fecha inicio:", formatDate(start));
              if (end) console.log("📅 Fecha fin:", formatDate(end));
            }}
            startDate={dateInit}
            endDate={dateEnd}
            selectsRange
            inline
          />
          <div className="calendar-buttons">
            <button onClick={handleApplyFilter} className="apply-button">Aplicar</button>
            <button onClick={handleCloseCalendar} className="close-button mobile-only">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
