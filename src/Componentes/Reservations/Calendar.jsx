import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

const Calendar = ({ startDate, endDate, onChange, bookedDateRanges = [] }) => {
  useEffect(() => {
    console.log("📆 Fechas reservadas recibidas en Calendar:", bookedDateRanges);
  }, [bookedDateRanges]);

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
        excludeDateIntervals={bookedDateRanges}
        dayClassName={(date) =>
          bookedDateRanges.some((range) => {
            const check = new Date(date);
            check.setHours(0, 0, 0, 0);

            const start = new Date(range.startDate);
            const end = new Date(range.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            return check >= start && check <= end;
          })
            ? "booked-date"
            : undefined
        }
      />
    </div>
  );
};

export default Calendar;
