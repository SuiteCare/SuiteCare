import React, { useState, useEffect } from 'react';

const TimePicker = ({ time, setTime, start, end }) => {
  const [defaultTime, setDefaultTime] = useState('00:00');
  const [timeObj, setTimeObj] = useState({ hour: '00', minute: '00' });

  useEffect(() => {
    // time이 정의되어 있으면 기본값을 설정하고, 아니면 '00:00'으로 유지
    setDefaultTime(time || '00:00');
  }, [time]);

  useEffect(() => {
    const [defaultHour, defaultMinute] = defaultTime.split(':');
    setTimeObj({ hour: defaultHour, minute: defaultMinute });
  }, [defaultTime]);

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setTimeObj((prevData) => {
      const newTime = `${newHour}:${prevData.minute}`;
      setTime(newTime);
      return { ...prevData, hour: newHour };
    });
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    setTimeObj((prevData) => {
      const newTime = `${prevData.hour}:${newMinute}`;
      setTime(newTime);
      return { ...prevData, minute: newMinute };
    });
  };

  // select box 생성용
  const hours = [...Array(end - start + 1).keys()].map((i) => (i + start).toString().padStart(2, '0'));
  const minutes = [...Array(60 / 5).keys()].map((i) => (i * 5).toString().padStart(2, '0'));

  return (
    <div className='time_picker'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        className='bi bi-alarm'
        viewBox='0 0 16 16'
      >
        <path d='M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z' />
        <path d='M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1' />
      </svg>
      <select name='hour' value={timeObj.hour} onChange={handleHourChange}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select name='minute' value={timeObj.minute} onChange={handleMinuteChange}>
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
