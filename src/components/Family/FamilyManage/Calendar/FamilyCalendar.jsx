import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import CalendarModal from '@/components/Common/Modal/Detail/CalendarModal';
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
  const [eventList, setEventList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [currentCalendar, setCurrentCalendar] = useState(new Date());

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/reservation/family');
      if (data.code === 200) {
        return data.result;
      }
      console.log('데이터를 불러오는 데 오류가 발생했습니다.');
      return [];
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      return [];
    }
  };

  const loadEventData = async () => {
    const data = await fetchData();
    return data.filter((e) => {
      const startDate = new Date(e.start_date);
      const endDate = new Date(e.end_date);
      const currentYear = currentCalendar.getFullYear();
      const currentMonth = currentCalendar.getMonth() + 1;
      return (
        startDate.getFullYear() === currentYear &&
        endDate.getFullYear() === currentYear &&
        startDate.getMonth() + 1 <= currentMonth &&
        endDate.getMonth() + 1 >= currentMonth
      );
    });
  };

  const handleMutationResponse = (data) => {
    if (data.code === 200) {
      return data.result;
    }
    console.log('데이터 불러오기 실패');
    return [];
  };

  const handleMutationError = (error) => {
    console.error('Error occurred while fetching modal data:', error);
    return {};
  };

  const detailMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/recruitment/${$recruitmentId}/detail`);
      return handleMutationResponse(data);
    } catch (error) {
      return handleMutationError(error);
    }
  });

  const patientMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/recruitment/${$recruitmentId}/patient`);
      return handleMutationResponse(data);
    } catch (error) {
      return handleMutationError(error);
    }
  });

  const loadEventInfo = async ($recruitmentId) => {
    try {
      const [detailResponse, patientResponse] = await Promise.all([
        detailMutation.mutateAsync($recruitmentId),
        patientMutation.mutateAsync($recruitmentId),
      ]);

      return { detail: detailResponse[0], patient: patientResponse[0] };
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return false;
    }
  };

  const generateEvents = (eventItem, recruitmentInfo, currentStartDate, currentEndDate) => {
    const { detail, patient } = recruitmentInfo;

    const events = [];
    const endDate = moment(`${eventItem.end_date} ${eventItem.end_time}`);
    const weekdays = normalizeWeekDays(eventItem.weekdays);

    while (currentEndDate.isSameOrBefore(endDate, 'day')) {
      const dayOfCurrentEndDate = +moment(currentEndDate).format('d');
      if (weekdays.includes(dayOfCurrentEndDate)) {
        const event = {
          title: `${patient.patient_name} (${patient.patient_diagnosis_name || '진단명 없음'})`,
          mate: `담당 메이트 ${eventItem.mate_name} (${eventItem.mate_resume_id})`,
          detail: { reservation: { ...eventItem, ...detail }, patient },
          start: new Date(currentStartDate),
          end: new Date(currentEndDate),
          color: stringToColor(
            (eventItem.recruitment_id || 'id 없음') +
              (patient.patient_name || '환자명 없음') +
              (patient.patient_diagnosis_name || '진단명 없음') +
              eventItem.mate_name,
          ),
        };
        events.push(event);
      }
      currentStartDate.add(1, 'day');
      currentEndDate.add(1, 'day');
    }

    return events;
  };

  useEffect(() => {
    const getEventList = async () => {
      const data = await loadEventData();
      const promises = data.map(async (eventItem) => {
        try {
          const recruitmentInfo = await loadEventInfo(eventItem.recruitment_id);
          const currentStartDate = moment(`${eventItem.start_date} ${eventItem.start_time}`);
          const currentEndDate = moment(`${eventItem.start_date} ${eventItem.end_time}`);
          return generateEvents(eventItem, recruitmentInfo, currentStartDate, currentEndDate);
        } catch (error) {
          console.error('Error occurred while fetching modal data:', error);
          return [];
        }
      });

      const resolvedEvents = await Promise.all(promises);
      setEventList(resolvedEvents.flat());
    };

    getEventList();
  }, [currentCalendar]);

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
        timeslots={2}
        messages={messages}
        dayPropGetter={customDayPropGetter}
        onNavigate={(newDate) => setCurrentCalendar(newDate)}
        {...getComponents(openModal, setModalData)}
        {...settingProps}
      />
      {isModalVisible && <CalendarModal modalData={modalData} closeModal={closeModal} page='family' />}
    </>
  );
};

export default FamilyCalendar;
