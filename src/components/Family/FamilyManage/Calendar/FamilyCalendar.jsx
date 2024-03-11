import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import { useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';
import usePatientList from '@/services/apis/usePatientList';

import FamilyCalendarModal from './FamilyCalendarModal';
import {
  getComponents,
  getSettingProps,
  customDayPropGetter,
  messages,
} from '@/components/Common/Calendar/CalendarSettingProps';

import { stringToColor } from '@/utils/calculators';

const localizer = momentLocalizer(moment);

const FamilyCalendar = () => {
  const [eventList, setEventList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const { isModalVisible, openModal, closeModal } = useModal();

  const { token } = useLoginInfo();
  const { patientList } = usePatientList();

  const { data, isError, isLoading } = useQuery(
    ['reservationList', token],
    async () => {
      const response = await axiosInstance.get('/api/v1/family/reservation');
      return response.data;
    },
    {
      enabled: Boolean(token),
    },
  );

  useEffect(() => {
    const getEventList = () => {
      let currentStartDate = moment(`${data.start_date} ${data.start_time}`);
      let currentEndDate = moment(`${data.start_date} ${data.end_time}`);
      const endDate = moment(`${data.end_date} ${data.end_time}`);
      const { weekdays } = data;

      const events = [];

      const patientName = patientList.filter((e) => e.id === patient_id);

      // 주어진 범위 내의 출근 요일에 해당하는 날짜를 별개의 이벤트로 추가
      while (currentEndDate.isSameOrBefore(endDate, 'day')) {
        const dayOfWeek = moment(currentEndDate).format('ddd');
        if (weekdays.includes(dayOfWeek)) {
          const event = {
            title: `${patientName} 님 (${data.diagnosis_name})`,
            mate: `간병인 ${data.mate_name} 님`,
            start: new Date(currentStartDate),
            end: new Date(currentEndDate),
            color: stringToColor(data.patient_name + data.diagnosis_name + data.mate_name),
          };
          events.push(event);
        }
        currentStartDate = currentStartDate.add(1, 'day');
        currentEndDate = currentEndDate.add(1, 'day');
      }

      setEventList(events);
    };

    if (data && data.length > 0) {
      getEventList();
    }
  }, [data]);

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
      {isModalVisible && <FamilyCalendarModal modalData={modalData} closeModal={closeModal} />}
    </>
  );
};

export default FamilyCalendar;
