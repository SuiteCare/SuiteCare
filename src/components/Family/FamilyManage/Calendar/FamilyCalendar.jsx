import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useMutation, useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

import FamilyCalendarModal from './FamilyCalendarModal';
import {
  getComponents,
  getSettingProps,
  customDayPropGetter,
  messages,
} from '@/components/Common/Calendar/CalendarSettingProps';

import { normalizeWeekDays, stringToColor } from '@/utils/calculators';

const localizer = momentLocalizer(moment);
const settingProps = getSettingProps();

const FamilyCalendar = () => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { token } = useLoginInfo();
  const [eventList, setEventList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [currentCalendar, setCurrentCalendar] = useState(new Date());

  const handleNavigate = (newDate) => {
    setCurrentCalendar(newDate);
  };

  const { data, isError, isLoading } = useQuery(
    ['reservationList', token],
    async () => {
      const response = await axiosInstance.get('/api/v1/reservation/family');
      return response.data;
    },
    {
      enabled: Boolean(token),
    },
  );

  const detailMutation = useMutation(async ($recruitmentId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/recruitment/${$recruitmentId}/detail`);
      const msg = response.headers.get('msg');
      if (response.data) {
        return response.data;
      }
      if (msg === 'fail') {
        console.log('디테일 데이터 불러오기 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  });

  const patientMutation = useMutation(async ($recruitmentId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/recruitment/${$recruitmentId}/patient`);
      const msg = response.headers.get('msg');
      if (response.data) {
        return response.data;
      }
      if (msg === 'fail') {
        console.log('환자 데이터 불러오기 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  });

  const loadEventInfo = async ($recruitmentId) => {
    try {
      const [detailResponse, patientResponse] = await Promise.all([
        detailMutation.mutateAsync($recruitmentId),
        patientMutation.mutateAsync($recruitmentId),
      ]);

      return { detailResponse, patientResponse };
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return false;
    }
  };

  useEffect(() => {
    const getEventList = async () => {
      if (!data || data.length === 0) return;

      const currentYear = currentCalendar.getFullYear();
      const currentMonth = currentCalendar.getMonth() + 1;

      const currentCalendarData = data.filter((e) => {
        const startDate = new Date(e.start_date);
        const endDate = new Date(e.end_date);

        const isEventInCurrentMonth =
          startDate.getFullYear() === currentYear &&
          endDate.getFullYear() === currentYear &&
          startDate.getMonth() + 1 <= currentMonth &&
          endDate.getMonth() + 1 >= currentMonth;

        return isEventInCurrentMonth;
      });

      const promises = currentCalendarData.map(async (eventItem) => {
        try {
          const { detailResponse, patientResponse } = await loadEventInfo(eventItem.recruitment_id);

          const recruitmentInfo = { ...detailResponse, ...patientResponse };

          let currentStartDate = moment(`${eventItem.start_date} ${eventItem.start_time}`);
          let currentEndDate = moment(`${eventItem.start_date} ${eventItem.end_time}`);
          const endDate = moment(`${eventItem.end_date} ${eventItem.end_time}`);
          const weekdays = normalizeWeekDays(eventItem.weekdays);

          const events = [];

          // 주어진 범위 내의 출근 요일에 해당하는 날짜를 별개의 이벤트로 추가
          while (currentEndDate.isSameOrBefore(endDate, 'day')) {
            const dayOfCurrentEndDate = +moment(currentEndDate).format('d');
            if (weekdays.includes(dayOfCurrentEndDate)) {
              const event = {
                ...eventItem,
                title: `${recruitmentInfo.patient_name} (${recruitmentInfo.patient_diagnosis_name || '진단명 없음'})`,
                mate: `담당 메이트 ${eventItem.mate_name} (${eventItem.mate_resume_id})`,
                detail: { reservation: { ...eventItem, ...detailResponse }, patient: { ...patientResponse } },
                start: new Date(currentStartDate),
                end: new Date(currentEndDate),
                color: stringToColor(
                  (eventItem.recruitment_id || 'id가 없을 리는 없음') +
                    (recruitmentInfo.patient_name || '환자명 없음') +
                    (recruitmentInfo.diagnosis_name || '진단명 없음') +
                    eventItem.mate_name,
                ),
              };
              events.push(event);
            }
            currentStartDate = currentStartDate.add(1, 'day');
            currentEndDate = currentEndDate.add(1, 'day');
          }

          return events;
        } catch (error) {
          console.error('Error occurred while fetching modal data:', error);
          return [];
        }
      });

      const resolvedEvents = await Promise.all(promises);
      const flattenedEvents = resolvedEvents.flat();
      setEventList(flattenedEvents);
    };

    getEventList();
  }, [data, currentCalendar]);

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
        onNavigate={handleNavigate}
        {...getComponents(openModal, setModalData)}
        {...settingProps}
      />
      {isModalVisible && <FamilyCalendarModal modalData={modalData} closeModal={closeModal} />}
    </>
  );
};

export default FamilyCalendar;
