export const calAge = ($birth) => ~~((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));

export const calTimeDiff = ($start, $end) => {
  const getMinutes = ($time) => {
    const [hours, minutes] = $time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  return (getMinutes($end) - getMinutes($start)) / 60;
};

export const countWeekdays = (startDate, endDate, weekdaysArr) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const start = new Date(startDate);
  const end = new Date(endDate);

  let count = 0;
  let current = new Date(start);

  while (current <= end) {
    if (weekdaysArr.includes(weekdays[current.getDay()])) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};
