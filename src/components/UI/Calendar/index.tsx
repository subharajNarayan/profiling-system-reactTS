import React from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";
import "./calendar.scss";

interface CalendarProps {
  name: string;
}

const Calendar = (props: CalendarProps) => {
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    // Get the current date in UTC format
    const currentDate = new Date().toISOString();

    // Convert the current date to Nepali date
    const localDate = new Date(currentDate);
    const nepaliDate = new NepaliDate(localDate).getBS();
    const { year, month, date } = nepaliDate;
    const finalDate = `${year}-${month + 1}-${date}`;

    // Set the initial date
    setDate(finalDate);
  }, []);

  console.log(date);
  

  return (
    <section className="nepali-calendar">
      <div className="calendar">
        <NepaliDatePicker
          inputClassName="form-control"
          className=""
          value={date}
          onChange={(value) => setDate(value)}
          options={{ calenderLocale: "ne", valueLocale: "en" }}
          {...props}
        />
      </div>
    </section>
  );
};

export default Calendar;
