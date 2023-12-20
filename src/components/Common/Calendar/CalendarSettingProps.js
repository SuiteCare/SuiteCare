import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

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
  event: '일정 목록',
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

export const customDayPropGetter = (date) => {
  if (date.getDay() === 0 || date.getDay() === 6)
    return {
      className: 'rbc-weekend',
    };
  else return {};
};

const EventComponent = ({ event, showEvent }) => (
  <div onClick={() => showEvent(event)}>
    <strong>{event.title}</strong>
    <br />
    <span>{event.mate}</span>
  </div>
);

const AgendaEventComponent = ({ event, showEvent }) => (
  <div onClick={() => showEvent(event)}>
    <span style={{ color: event.color }}>●</span> <strong>{event.title}</strong> / <span>{event.mate}</span>
  </div>
);

const MonthEventComponent = ({ event, showEvent }) => (
  <div onClick={() => showEvent(event)}>
    <strong>{event.title}</strong>
  </div>
);

export const getSettingProps = () => ({
  style: { height: 800 },
  messages: { messages },
  min: moment().startOf('day').clone().hour(6).toDate(),
  max: moment().startOf('day').clone().hour(22).toDate(),
  components: {
    event: EventComponent,
    month: { event: MonthEventComponent },
    agenda: { event: AgendaEventComponent },
  },
  formats: {
    monthHeaderFormat: formats.monthHeaderFormat,
    dayRangeHeaderFormat: formats.dayRangeHeaderFormat,
    agendaDateFormat: formats.agendaDateFormat,
    agendaHeaderFormat: formats.agendaHeaderFormat,
  },
  eventPropGetter: (event) => ({
    style: { backgroundColor: event.color },
  }),
});
