import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

import MateCalendarModal from './MateCalendarModal';
import {
  getComponents,
  getSettingProps,
  customDayPropGetter,
  messages,
} from '@/components/Common/Calendar/CalendarSettingProps';

import { stringToColor } from '@/utils/calculators';

const localizer = momentLocalizer(moment);
const settingProps = getSettingProps();

const MateCalendar = () => {
  const [eventList, setEventList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const { isModalVisible, openModal, closeModal } = useModal();

  const { token } = useLoginInfo();

  const {
    data: dbData,
    isError,
    isLoading,
  } = useQuery(
    ['reservationList', token],
    async () => {
      const response = await axiosInstance.get('/api/v1/reservation/mate');
      return response.data;
    },
    {
      enabled: Boolean(token),
    },
  );

  useEffect(() => {
    const data = [
      {
        id: 0,
        recruitment_id: 0,
        family_id: 'string',
        family_name: 'string',
        confirm_at: '2024-03-07',
        start_date: '2024-03-07',
        end_date: '2024-03-17',
        start_time: {
          hour: 10,
          minute: 0,
          second: 0,
          nano: 0,
        },
        end_time: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        weekdays: [0, 1, 2, 3, 4, 5, 6],
      },
      {
        id: 1,
        recruitment_id: 1,
        family_id: 'string',
        family_name: 'string',
        confirm_at: '2024-03-07',
        start_date: '2024-03-10',
        end_date: '2024-03-31',
        start_time: {
          hour: 10,
          minute: 0,
          second: 0,
          nano: 0,
        },
        end_time: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        weekdays: [1, 2, 3, 4, 5],
      },
    ];

    console.log('Mate Calendar용 데이터를 가져오는가?', data);

    const getEventList = () => {
      data.forEach((eventItem) => {
        let currentStartDate = moment(
          `${eventItem.start_date} ${eventItem.start_time.hour}:${eventItem.start_time.minute}`,
        );
        let currentEndDate = moment(`${eventItem.start_date} ${eventItem.end_time.hour}:${eventItem.end_time.minute}`);
        const endDate = moment(`${eventItem.end_date} ${eventItem.end_time.hour}:${eventItem.end_time.minute}`);
        const weekdays = eventItem?.weekdays;

        console.log('잘나오고있나ㅠ', currentStartDate, currentEndDate, endDate, weekdays);

        const events = [];

        // 주어진 범위 내의 출근 요일에 해당하는 날짜를 별개의 이벤트로 추가
        while (currentEndDate.isSameOrBefore(endDate, 'day')) {
          const dayOfWeek = moment(currentEndDate).format('ddd');
          if (weekdays.includes(dayOfWeek)) {
            const event = {
              title: `${eventItem.patient_name} 님 (${eventItem.diagnosis_name || '진단명 없음'})`,
              family: `보호자 ${eventItem.family_name} 님`,
              start: new Date(currentStartDate),
              end: new Date(currentEndDate),
              color: stringToColor(
                (eventItem.patient_name || '환자명도 없음') +
                  (eventItem.diagnosis_name || '진단명 없음') +
                  eventItem.family_name,
              ),
            };
            events.push(event);
          }
          currentStartDate = currentStartDate.add(1, 'day');
          currentEndDate = currentEndDate.add(1, 'day');
        }

        setEventList(events);
      });
    };

    if (data && data.length > 0) {
      getEventList();
    }
  }, []);

  return (
    <>
      <Calendar
        className='Calendar'
        localizer={localizer}
        events={eventList}
        culture='ko-KR'
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'agenda']}
        timeslots={2} // step={30}와 동일
        messages={messages}
        dayPropGetter={customDayPropGetter}
        {...getComponents(openModal, setModalData)}
        {...getSettingProps()}
      />
      {isModalVisible && <MateCalendarModal modalData={modalData} closeModal={closeModal} />}
    </>
  );
};

export default MateCalendar;
