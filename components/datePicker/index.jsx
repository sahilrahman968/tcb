import React, { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const disabledDates = ['2023-11-30', '2023-12-01', '2023-12-15'];

  const handleDateChange = (e) => {
    const date = e.target.value;

    if (disabledDates.includes(date)) {
      alert('This date is disabled. Please choose another date.');
      setSelectedDate('');
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div>
      <label htmlFor="dateInput">Select a date:</label>
      <input
        type="date"
        id="dateInput"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
