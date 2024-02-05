import { useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import HistoryTable from './HistoryTable';
import Loading from '@/components/Common/Modal/Loading';

const FamilyHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useLoginInfo();

  const {
    data: reservationList,
    isError: isResListError,
    isLoading: isResListLoading,
  } = useQuery(
    ['reservationList', id],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/reservationHistory', { params: { id } });
      return data.reverse();
    },
    {
      enabled: Boolean(id),
    },
  );

  console.log('res:', reservationList);
  console.log('error:', isResListError);

  return (
    <div className='FamilyHistory'>
      {isResListLoading ? <Loading /> : ''}
      <div style={{ textAlign: 'right' }}>
        <button type='button' onClick={() => navigator.push('/family/reservation')}>
          간병 예약하기
        </button>
      </div>
      <div className='tab_wrapper'>
        <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
          예약 내역
        </div>
        <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
          완료 내역
        </div>
      </div>
      {activeTab === 0 && <HistoryTable data={reservationList} />}
      {activeTab === 1 && (
        <HistoryTable
          data={[
            { date: '2023-12-25', name: '간병인4' },
            { date: '2023-12-23', name: '간병인5' },
            { date: '2023-12-19', name: '간병인6' },
          ]}
        />
      )}{' '}
    </div>
  );
};

export default FamilyHistory;
