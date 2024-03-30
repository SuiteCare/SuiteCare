import axios from 'axios';

export const calAge = ($birth) => Math.floor((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));

export const calTimeDiff = ($start, $end) => {
  const getMinutes = ($time) => {
    const [hours, minutes] = $time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  return (getMinutes($end) - getMinutes($start)) / 60;
};

export const weekdayDic = ['일', '월', '화', '수', '목', '금', '토'];

export const normalizeWeekDays = (weekdays) => {
  if (typeof weekdays === 'string') {
    return !Number.isNaN(Number(weekdays[0]))
      ? weekdays.split(',').map((e) => Number(e))
      : weekdays.split(',').map((e) => weekdayDic.indexOf(e));
  }
  if (typeof weekdays === 'object') {
    if (typeof Number(weekdays[0]) === 'number') {
      if (typeof weekdays[0] === 'number') {
        return weekdays;
      }
      return weekdays.map((e) => +e);
    }
    return weekdays.map((e) => weekdayDic.indexOf(e));
  }
};

export const countWeekdays = (startDate, endDate, weekdays) => {
  const weekdaysArr = normalizeWeekDays(weekdays);

  const start = new Date(startDate);
  const end = new Date(endDate);

  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    if (weekdaysArr.includes(current.getDay())) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

export const stringToColor = (str, saturation = 55, lightness = 50) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const genderToKo = (gender) => {
  switch (gender) {
    case 'M':
      return '남';
    case 'F':
      return '여';
    default:
      return null;
  }
};

export const getMinWage = async () => {
  try {
    const response = await axios.get(
      `https://api.odcloud.kr/api/15068774/v1/uddi:ea28d355-6222-40db-8237-ceda86c5675d?serviceKey=${process.env.NEXT_PUBLIC_PUBLIC_DATA_PORTAL_MINWAGE_KEY}`,
    );
    if (response.data?.data?.length) {
      return response.data.data[0];
    }
    console.error('Invalid response data structure:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const minWage = 9860;
