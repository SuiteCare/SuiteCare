import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';

import cardstyles from './PendingReservation.module.css';
import tablestyles from '@/components/Common/ManageTable.module.css';
import PendingReservationCard from './PendingReservationCard';
import Loading from '@/components/Common/Modal/Loading';
import PatientDetailModal from './PatientDetailModal';
import RecruitmentDetailModal from '../../../Common/Modal/Detail/RecruitmentDetailModal';
import MateDetailModal from './MateDetailModal';

import { calAge, genderToKo } from '@/utils/calculators.js';

const PendingReservation = ({ data }) => {
  const navigator = useRouter();

  const { isModalVisible, openModal } = useModal();
  const [selectedModal, setSelectedModal] = useState(null);

  const closeModal = () => {
    // 모달을 보이지 않게 하기 위해 상태를 초기화
    setSelectedModal(null);
  };

  const [modalData, setModalData] = useState({});
  const [reModalData, setReModalData] = useState({});
  const [maModalData, setMaModalData] = useState({});

  const { id } = useLoginInfo();

  const { isError, isLoading, patientList } = usePatientList(id);

  const [recruitmentSelectedInfo, setRecruitmentSelectedInfo] = useState({});

  const [selectedRecId, setSelectedRecId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedMate, setSelectedMate] = useState(null);

  const {
    data: recruitmentList,
    isError: isRecListError,
    isLoading: isRecListLoading,
  } = useQuery(
    ['reservationList', id],
    async () => {
      const { data: recruitmentData } = await axiosInstance.get('/api/v1/pendingRecruitment', { params: { id } });
      return recruitmentData.reverse();
    },
    {
      enabled: Boolean(id),
    },
  );

  useEffect(() => {
    console.log('recruitmentList', recruitmentList);
  }, [recruitmentList]);

  const {
    data: applyMateList,
    isError: isApplyMateListError,
    isLoading: isApplyMateListLoading,
  } = useQuery(
    ['applyMateList', selectedRecId],
    async () => {
      const { data: applyMateData } = await axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/M`, {
        params: {
          recruitment_id: selectedRecId,
        },
      });
      console.log('applyMateList', selectedRecId, applyMateData);

      return applyMateData;
    },
    {
      enabled: Boolean(selectedRecId),
    },
  );

  const {
    data: offerMateList,
    isError: isOfferMateListError,
    isLoading: isOfferMateListLoading,
  } = useQuery(
    ['offerMateList', selectedRecId],
    async () => {
      const { data: offerMateData } = await axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/F`, {
        params: {
          recruitment_id: selectedRecId,
        },
      });
      console.log('offerMateList', selectedRecId, offerMateData);

      return offerMateData;
    },
    {
      enabled: Boolean(selectedRecId),
    },
  );

  useEffect(() => {
    console.log('applyMateList', applyMateList);
  }, [applyMateList]);

  useEffect(() => {
    console.log('offerMateList', offerMateList);
  }, [applyMateList]);

  const handleSelectChange = (e) => {
    const newValue = e.target.value;

    if (newValue === 'add') {
      if (window.confirm('새로운 간병예약 신청 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/recruitment');
      }
    } else {
      const selectedRecruitment = recruitmentList?.find((v) => v.id === +newValue);
      const selectPatient = selectedRecruitment.patient_name;

      setRecruitmentSelectedInfo((prevData) => ({
        ...prevData,
        ...selectedRecruitment,
        ...selectedPatient,
      }));

      setSelectedRecId(selectedRecruitment?.id);
      setSelectedPatient(selectPatient);

      console.log(selectedPatient);
    }
  };

  const getPatientDetail = async ($event) => {
    setModalData($event);
    try {
      const patientPromise = axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/patient`);
      const recruitmentDataPromise = axiosInstance.get('/api/v1/pendingRecruitment', { params: { id } });
      const [patientResponse, recruitmentDataResponse] = await Promise.all([patientPromise, recruitmentDataPromise]);
      const recruitmentResponse = recruitmentDataResponse.data.find((recruitment) => recruitment.id === selectedRecId);

      setModalData((prevData) => ({
        ...prevData,
        ...patientResponse.data,
        ...(recruitmentResponse || {}), // recruitmentResponse가 undefined이면 빈 객체를 병합
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getRecruitmentDetail = async ($event) => {
    setReModalData($event);
    try {
      const recruitmentdetailPromise = await axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/detail`);
      const recruitmentDataPromise = axiosInstance.get('/api/v1/pendingRecruitment', { params: { id } });
      const [recruitmentdetailResponse, recruitmentDataResponse] = await Promise.all([
        recruitmentdetailPromise,
        recruitmentDataPromise,
      ]);
      const recruitmentResponse = recruitmentDataResponse.data.find((recruitment) => recruitment.id === selectedRecId);

      setReModalData((prevData) => ({
        ...prevData,
        ...recruitmentdetailResponse.data,
        ...(recruitmentResponse || {}),
      }));
      console.log('r', reModalData);
    } catch (error) {
      console.error(error);
    }
  };

  const getApplyMateDetail = async (mateId) => {
    console.log(mateId);
    try {
      const applyMateDetailPromise = axiosInstance.get(`/api/v1/mate/resume/${mateId}`);
      const applyMateDataPromise = axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/M`);
      const [applyMateDetailResponse, applyMateDataResponse] = await Promise.all([
        applyMateDetailPromise,
        applyMateDataPromise,
      ]);

      const matchedMate = applyMateDataResponse.data.find((mate) => mate.mate_resume_id === mateId);

      setMaModalData((prevData) => ({
        ...prevData,
        ...applyMateDetailResponse.data,
        matchedMate: matchedMate ?? {},
      }));

      setSelectedMate(matchedMate.mate_resume_id);
      console.log('간병인', selectedMate);
      console.log('ma', maModalData);
    } catch (error) {
      console.error(error);
    }
  };

  const getOfferMateDetail = async (mateId) => {
    console.log(mateId);
    try {
      const offerMateDetailPromise = axiosInstance.get(`/api/v1/mate/resume/${mateId}`);
      const offerMateDataPromise = axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/F`);

      const [offerMateDetailResponse, offerMateDataResponse] = await Promise.all([
        offerMateDetailPromise,
        offerMateDataPromise,
      ]);

      const matchedMate = offerMateDataResponse.data.find((mate) => mate.mate_resume_id === mateId);

      setMaModalData((prevData) => ({
        ...prevData,
        ...offerMateDetailResponse.data,
        matchedMate: matchedMate ?? {},
      }));

      console.log('ma', maModalData);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientDetailClick = ($event) => {
    getPatientDetail($event);
    openModal();
    setSelectedModal('PatientDetail');
  };

  const handleRecruitmentDetailClick = ($event) => {
    getRecruitmentDetail($event);
    openModal();
    setSelectedModal('RecruitmentDetail');
  };

  const handleApplyMateDetailClick = (mateId) => {
    getApplyMateDetail(mateId);
    openModal();
    setSelectedModal('ApplyMateDetail');
  };

  const handleOfferMateDetailClick = (mateId) => {
    getOfferMateDetail(mateId);
    openModal();
    setSelectedModal('OfferMateDetail');
  };

  useEffect(() => {
    getOfferMateDetail(selectedMate);
  }, []);

  const mutation = useMutation(async (mateId) => {
    getApplyMateDetail(mateId);
    console.log(mateId);

    try {
      const body = {
        recruitment_id: selectedRecId,
        mate_id: selectedMate,
      };

      console.log('request body', body);
      const response = await axiosInstance.post(`/api/v1/reservation`, body);
      if (response.data === 1) {
        const isConfirmed = window.confirm('예약을 확정하시겠습니까?');

        if (isConfirmed) {
          alert('예약이 확정되었습니다.');
          console.log('1', response.data);
          window.location.reload();
        } else {
          return false;
        }
      } else if (response.data > 1) {
        alert('이미 확정되었습니다.');
        console.log('2', response.data);
        window.location.reload();
      } else {
        console.log('데이터 제출 실패');
        return false;
      }
      closeModal();
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  });

  const handleAccept = () => {
    console.log('selectedMate', selectedMate);
    if (selectedMate) {
      mutation.mutate(selectedMate);
    } else {
      alert('먼저 상세정보를 확인해주세요.'); // 선택된 간병인이 없을 경우 경고 메시지 출력
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className={cardstyles.PendingReservation}>
      {isLoading || isRecListLoading || isApplyMateListLoading ? <Loading /> : null}
      <div className={`${cardstyles.select_reservation} input_wrapper`}>
        <label>간병공고 목록</label>
        <select onChange={handleSelectChange}>
          <option onSelect={handleReset}>간병공고 선택</option>
          {recruitmentList?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.patient_name} | {e.start_date} ~ {e.end_date}
            </option>
          ))}
          <option value='add'>새로운 간병 공고 등록하기</option>
        </select>
      </div>

      <hr />

      {selectedRecId ? (
        <>
          <div className={cardstyles.button_wrapper}>
            <button type='button' onClick={() => handlePatientDetailClick(selectedRecId)}>
              환자 정보 보기
            </button>
            <button
              type='button'
              className={cardstyles.second_button}
              onClick={() => handleRecruitmentDetailClick(selectedRecId)}
            >
              공고 정보 보기
            </button>
          </div>
          <span />

          <h3>내가 제안한 간병인 리스트</h3>
          <div className={tablestyles.ManageTable}>
            <table className={cardstyles.table_margin}>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>성명</th>
                  <th>성별</th>
                  <th>나이</th>
                  <th>주요 서비스</th>
                  <th>상태</th>
                  <th>간병인 상세정보</th>
                </tr>
              </thead>
              <tbody>
                {offerMateList?.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className='error'>내가 제안한 간병인이 없습니다.</div>
                    </td>
                  </tr>
                ) : (
                  offerMateList?.map((e) => (
                    <tr key={e.mate_resume_id}>
                      <td>{e.mate_resume_id}</td>
                      <td>{e.name}</td>
                      <td>{genderToKo(e.gender)}성</td>
                      <td> 만 {calAge(e.birthday)}세</td>
                      <td>{e.mainservice}</td>
                      <td>{e.status === 'P' ? '검토중' : '예약 확정'}</td>
                      <td>
                        <button type='button' onClick={() => handleOfferMateDetailClick(e.mate_resume_id)}>
                          상세정보 보기
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {isModalVisible && (
              <>
                {selectedModal === 'PatientDetail' && (
                  <PatientDetailModal modalData={modalData} closeModal={closeModal} />
                )}
                {selectedModal === 'RecruitmentDetail' && (
                  <RecruitmentDetailModal reModalData={reModalData} closeModal={closeModal} />
                )}
                {selectedModal === 'OfferMateDetail' && (
                  <MateDetailModal modalData={maModalData} closeModal={closeModal} />
                )}
              </>
            )}
          </div>

          <h3>지원한 간병인 리스트</h3>
          <div className={tablestyles.ManageTable}>
            <table className={cardstyles.table_margin}>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>성명</th>
                  <th>성별</th>
                  <th>나이</th>
                  <th>주요 서비스</th>
                  <th>간병인 상세정보</th>
                  <th>간병 확정</th>
                </tr>
              </thead>
              <tbody>
                {applyMateList?.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className='error'>아직 지원한 간병인이 없습니다.</div>
                    </td>
                  </tr>
                ) : (
                  applyMateList?.map((e) => (
                    <tr key={e.mate_resume_id}>
                      <td>{e.mate_resume_id}</td>
                      <td>{e.name}</td>
                      <td>{genderToKo(e.gender)}성</td>
                      <td> 만 {calAge(e.birthday)}세</td>
                      <td>{e.mainservice}</td>
                      <td>
                        <button type='button' onClick={() => handleApplyMateDetailClick(e.mate_resume_id)}>
                          상세정보 보기
                        </button>
                      </td>
                      <td>
                        <button type='button' onClick={handleAccept}>
                          간병 확정하기
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {isModalVisible && (
              <>
                {selectedModal === 'PatientDetail' && (
                  <PatientDetailModal modalData={modalData} closeModal={closeModal} />
                )}
                {selectedModal === 'RecruitmentDetail' && (
                  <RecruitmentDetailModal reModalData={reModalData} closeModal={closeModal} />
                )}
                {selectedModal === 'ApplyMateDetail' && (
                  <MateDetailModal modalData={maModalData} closeModal={closeModal} />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <div className='no_result'>정보를 확인할 간병 공고를 선택하세요.</div>
      )}
    </div>
  );
};

export default PendingReservation;
