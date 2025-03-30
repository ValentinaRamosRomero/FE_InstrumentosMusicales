import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

const Calendar = ({ startDate, endDate, onChange, isDateBooked }) => {
  return (
    <div className="calendar-box">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        selectsRange
        inline
        minDate={new Date()}
        dayClassName={(date) =>
          isDateBooked(date) ? "booked-date" : undefined
        }
      />
    </div>
  );
};

export default Calendar;
