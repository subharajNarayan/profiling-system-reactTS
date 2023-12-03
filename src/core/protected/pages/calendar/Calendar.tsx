import React, { useState, useEffect } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";

const Calendar = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const serverdate = "2022-07-16T07:00:00.000Z";
    const localDate = new Date(serverdate);
    const nepaliDate = new NepaliDate(localDate).getBS();
    const { year, month, date } = nepaliDate;
    const finalDate = `${year}-${month + 1}-${date}`;
    console.log({finalDate});
    
  }, []);

  console.log(date);
  return (
    <section className="p-4">
      <h4>Nepali Date</h4>
      <div className="calendar">
        <NepaliDatePicker
          inputClassName="form-control"
          className=""
          value={date ? date : ""}
          onChange={(value) => setDate(value)}
          options={{ calenderLocale: "ne", valueLocale: "en" }}
        />
      </div>
    </section>
  );
}

export default Calendar;
