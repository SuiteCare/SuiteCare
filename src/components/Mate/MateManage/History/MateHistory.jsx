import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import HistoryTable from './HistoryTable';
import Loading from '@/components/Common/Modal/Loading';
import ReservationDetailModal from '@/components/Common/Modal/Detail/ReservationDetailModal';

const MateHistory = () => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState();

  const mutation = useMutation(async ($tab) => {
    const targetURL = {
      0: 'apply/recruitment-list',
      1: 'offer/recruitment-list',
      2: 'reservation/mate',
    };
    try {
      const { data } = await axiosInstance.get(`/api/v1/${targetURL[$tab]}`);
      const { code, result } = data;
      if (code === 200) {
        setTabData(result.reverse());
        return result.reverse();
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      return [];
    } catch (error) {
      const { code } = error.response.data;
      console.error(code);
    }
  });

  useEffect(() => {
    mutation.mutate(activeTab);
  }, [activeTab]);

  const [detailData, setDetailData] = useState();
  const [patientData, setPatientData] = useState();

  const recruitmentDetailMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data: recruitmentDetailResponse } = await axiosInstance.get(
        `/api/v1/recruitment/${$recruitmentId}/detail`,
      );
      const { code, result } = recruitmentDetailResponse;
      if (code === 200) {
        setDetailData({ ...tabData.find((e) => e.recruitment_id === $recruitmentId), ...result[0] });
        return result[0];
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      return {};
    } catch (error) {
      const { code } = error.response.data;
      return code;
    }
  });

  const recruitmentPatientMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data: recruitmentPatientResponse } = await axiosInstance.get(
        `/api/v1/recruitment/${$recruitmentId}/patient`,
      );
      const { code, result } = recruitmentPatientResponse;
      if (code === 200) {
        setPatientData(result[0]);
        return result[0];
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      return {};
    } catch (error) {
      const { code } = error.response.data;
      return code;
    }
  });

  const handleDetailClick = async ($recruitmentId) => {
    try {
      const [detailResult, patientResult] = await Promise.all([
        recruitmentDetailMutation.mutateAsync($recruitmentId),
        recruitmentPatientMutation.mutateAsync($recruitmentId),
      ]);

      if (detailResult && patientResult) {
        openModal();
      } else {
        console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('데이터를 가져오는 데 오류가 발생했습니다.', error);
    }
  };

  return (
    <>
      <div className='MateHistory'>
        {!tabData && <Loading />}
        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            간병 지원 내역
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            간병 제안 내역
          </div>
          <div onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : ''}>
            간병 수행 내역
          </div>
        </div>
        {activeTab === 0 &&
          (tabData && tabData.length > 0 ? (
            <HistoryTable data={tabData} handleDetailClick={handleDetailClick} tabType='apply' />
          ) : (
            <div className='no_result'>간병 지원 내역이 없습니다.</div>
          ))}
        {activeTab === 1 &&
          (tabData && tabData.length > 0 ? (
            <HistoryTable data={tabData} handleDetailClick={handleDetailClick} tabType='offer' />
          ) : (
            <div className='no_result'>간병 제안 수신 내역이 없습니다.</div>
          ))}
        {activeTab === 2 &&
          (tabData && tabData.length > 0 ? (
            <HistoryTable data={tabData} handleDetailClick={handleDetailClick} tabType='reservation' />
          ) : (
            <div className='no_result'>수행한 간병 내역이 없습니다.</div>
          ))}
      </div>
      {isModalVisible && (
        <ReservationDetailModal modalData={{ ...detailData, ...patientData }} closeModal={closeModal} page='mate' />
      )}
    </>
  );
};

export default MateHistory;
