import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

const DateRangePicker = ({ setYearRange }) => {
  const [dateRange, setDateRange] = useState([new Date(2000, 0, 1), new Date()]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="date-range-container">
      <DatePicker
        selected={startDate}
        onChange={(update) => setDateRange(update)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <button 
        onClick={() => setYearRange({ start: startDate.getFullYear(), end: endDate.getFullYear() })} 
        className="apply-button"
      >
        Aplicar
      </button>
    </div>
  );
};

export default DateRangePicker;
