import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';

import cardstyles from './PendingReservation.module.css';
import styles from '@/components/Common/ManageTable.module.css';
import PendingReservationCard from './PendingReservationCard';
import Loading from '@/components/Common/Modal/Loading';

const PendingReservation = ({ data }) => {
  const navigator = useRouter();

  const { id } = useLoginInfo();

  const { isError, isLoading, patientList } = usePatientList(id);

  const { isModalVisible, openModal, closeModal } = useModal();
  const [modalData, setModalData] = useState({});
  const [recruitmentSelectedInfo, setRecruitmentSelectedInfo] = useState({});

  const [selectedRecId, setSelectedRecId] = useState(null);

  const getPatientDetail = async ($event) => {
    setModalData($event);
    try {
      const patientPromise = axiosInstance.get(`/api/v1/patient/${$event.id}`);
      const patientDetailPromise = axiosInstance.get(`/api/v1/patientDetail/${$event.id}`);

      const [patientResponse, patientDetailResponse] = await Promise.all([patientPromise, patientDetailPromise]);

      setModalData((prevData) => ({
        ...prevData,
        ...patientResponse.data,
        ...patientDetailResponse.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: recruitmentList,
    isError: isRecListError,
    isLoading: isRecListLoading,
  } = useQuery(
    ['reservationList', id],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/pendingRecruitment', { params: { id } });
      return data.reverse();
    },
    {
      enabled: Boolean(id),
    },
  );

  const {
    data: mateList,
    isError: isMateListError,
    isLoading: isMateListLoading,
  } = useQuery(
    ['mateList', selectedRecId],
    async () => {
      const { matedata } = await axiosInstance.get('/api/v1/applicant-list', {
        params: { reservation_id: selectedRecId },
      });
      console.log('mateList', selectedRecId, data);
      return data;
    },
    {
      enabled: Boolean(selectedRecId),
    },
  );

  const selectRecruitment = ($id) => recruitmentList?.find((e) => e.id === $id);
  const selectPatient = ($id) => patientList?.filter((e) => e.id === $id)[0];

  const handleSelectChange = (e) => {
    const newValue = e.target.value;

    if (newValue === 'add') {
      if (window.confirm('새로운 간병예약 신청 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/addpatient');
      }
    } else {
      const selectedRecruitment = recruitmentList?.find((v) => v.reservation_id === +newValue);
      const selectedPatient = selectPatient(selectedRecruitment?.patient_id);

      setRecruitmentSelectedInfo((prevData) => ({
        ...prevData,
        ...selectedRecruitment,
        ...selectedPatient,
      }));

      setSelectedRecId(selectedRecruitment?.reservation_id);
    }
  };

  const handleReset = () => {
    window.location.reload();
  };
  const handleDetailClick = ($event) => {
    getPatientDetail($event);
    openModal();
  };

  return (
    <div className={cardstyles.PendingReservation}>
      {isLoading || isRecListLoading || isMateListLoading ? <Loading /> : ''}
      <div className={`${cardstyles.select_reservation} input_wrapper`}>
        <label>간병공고 목록</label>
        <select onChange={handleSelectChange}>
          <option onSelect={handleReset}>간병공고 선택</option>
          {recruitmentList?.map((e) => (
            <option key={e.recruitment_id} value={e.recruitment_id}>
              {e.patient_name} | {e.start_date} ~ {e.end_date}
            </option>
          ))}
          <option value='add'>새로운 간병 공고 등록하기</option>
        </select>
      </div>
      <hr />
      <div className={styles.ManageTable}>
        <table>
          <thead>
            <tr>
              <th>성명</th>
              <th>진단명</th>
              <th>날짜</th>
              <th>요일</th>
              <th>시간</th>
              <th>지역</th>
              <th>제시시급</th>
              <th>공고 상세정보</th>
            </tr>
          </thead>
          <tbody>
            {data?.lenth === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className='error'>등록한 공고가 없습니다.</div>
                </td>
              </tr>
            ) : (
              data?.map((e, index) => (
                <tr key={e}>
                  <td>{e.patient_name}</td>
                  <td>{e.patient_diagnosis_name}</td>
                  <td>
                    {e.start_date} ~ {e.end_date}
                  </td>
                  <td>{e.weekday}</td>
                  <td>
                    {e.start_time} ~ {e.end_time}
                  </td>
                  <td>{e.location}</td>
                  <td>
                    <button type='button' onClick={() => handleDetailClick(e)}>
                      상세정보 보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {recruitmentList?.reservation_id ? (
        <PendingReservationCard data={recruitmentList} mateList={mateList} />
      ) : (
        <div className='no_result'>정보를 확인할 간병 공고를 선택하세요.</div>
      )}
    </div>
  );
};

export default PendingReservation;
