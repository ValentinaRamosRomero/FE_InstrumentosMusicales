import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./AvailabilityCalendar.css";
import calendarIcon from '../../assets/icons/calendar-icon.png';

const AvailabilityCalendar = ({ dateInit, dateEnd, setDateInit, setDateEnd }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  return (
    <div className="availability-calendar">
      <div className="calendar-icon-container" onClick={toggleCalendar}>
        <img src={calendarIcon} alt="Calendario" className={`calendar-icon ${showCalendar ? 'rotated' : ''}`} />
      </div>

      {showCalendar && (
        <div className="calendar-popup">
          <DatePicker
            selected={dateInit}
            onChange={(dates) => {
              const [start, end] = dates;
              setDateInit(start);
              setDateEnd(end);
            }}
            startDate={dateInit}
            endDate={dateEnd}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
