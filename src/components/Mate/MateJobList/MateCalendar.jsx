import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';

const localizer = momentLocalizer(moment);

const MateCalendar = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const getEventList = () => {
      // 서버와 통신해서 다음 데이터를 받아온다고 가정한다.
      const rawData = {
        patient_name: '김환자',
        diagnosis_name: '중풍',
        family_name: '이보호',
        start_date: '2023-12-18',
        end_date: '2024-2-1',
        weekdays: ['월', '목', '토', '일'],
        start_time: '09:00',
        end_time: '17:00',
      };

      let currentStartDate = moment(`${rawData.start_date} ${rawData.start_time}`);
      let currentEndDate = moment(`${rawData.start_date} ${rawData.end_time}`);
      const endDate = moment(`${rawData.end_date} ${rawData.end_time}`);
      const weekdays = rawData.weekdays;

      const events = [];

      // 주어진 범위 내의 출근 요일에 해당하는 날짜를 별개의 이벤트로 추가
      while (currentEndDate.isSameOrBefore(endDate, 'day')) {
        const dayOfWeek = moment(currentEndDate).format('ddd');
        if (weekdays.includes(dayOfWeek)) {
          const event = {
            title: `${rawData.patient_name}님 (${rawData.diagnosis_name})`,
            family: `보호자 ${rawData.family_name}님`,
            start: new Date(currentStartDate),
            end: new Date(currentEndDate),
            color: '#db4',
          };
          events.push(event);
        }
        currentStartDate = currentStartDate.add(1, 'day');
        currentEndDate = currentEndDate.add(1, 'day');
      }

      setEventList(events);
    };

    getEventList();
  }, []);

  const messages = {
    today: '오늘',
    previous: '이전',
    next: '다음',
    month: '월별 보기',
    week: '주별 보기',
    day: '일별 보기',
    agenda: '목록 보기',
    date: '날짜',
    time: '시간',
    event: '간병',
    showMore: (total) => `+${total}개 더 보기`,
    noEventsInRange: '해당 기간에는 간병 일정이 없습니다.',
  };

  const formats = {
    monthHeaderFormat: 'YYYY년 M월',
    dayRangeHeaderFormat: ({ start }, culture, localizer) => {
      let weekRange = new Date(start);
      weekRange.setDate(weekRange.getDate() + 6);
      return `${localizer.format(start, 'M월 DD일', culture)} ~ ${localizer.format(
        new Date(weekRange),
        'M월 DD일',
        culture,
      )}`;
    },
    agendaDateFormat: (date, culture, localizer) => localizer.format(date, 'M월 DD일 (ddd)', culture),
    agendaHeaderFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, 'M월 DD일', culture)} ~ ${localizer.format(end, 'M월 DD일', culture)}`,
  };

  const customDayPropGetter = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6)
      return {
        className: 'rbc-weekend',
      };
    else return {};
  };

  const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong> / <span>{event.family}</span>
    </div>
  );

  const MonthEventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
    </div>
  );

  return (
    <div>
      <Calendar
        className='Calendar'
        localizer={localizer}
        events={eventList}
        culture={'ko-KR'}
        components={{
          event: EventComponent,
          month: { event: MonthEventComponent },
        }}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'agenda']}
        messages={messages}
        timeslots={2} // step={30}와 동일
        min={moment().startOf('day').clone().hour(6).toDate()}
        max={moment().startOf('day').clone().hour(22).toDate()}
        formats={{
          monthHeaderFormat: formats.monthHeaderFormat,
          dayRangeHeaderFormat: formats.dayRangeHeaderFormat,
          agendaDateFormat: formats.agendaDateFormat,
          agendaHeaderFormat: formats.agendaHeaderFormat,
        }}
        dayPropGetter={customDayPropGetter}
        style={{ height: 800 }}
      />
    </div>
  );
};

export default MateCalendar;
