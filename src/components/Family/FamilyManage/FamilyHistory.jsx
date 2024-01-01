import { useState } from 'react';

import HistoryTable from './HistoryTable';

const FamilyHistory = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='FamilyHistory'>
      <div style={{ textAlign: 'right' }}>
        <button type='button' onClick={() => navigator.push('/family/reservation')}>
          간병 예약하기
        </button>
      </div>
      <div className='tab_wrapper'>
        <ul>
          <li onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            예약 내역
          </li>
          <li onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            완료 내역
          </li>
        </ul>
      </div>
      {activeTab === 0 && (
        <HistoryTable
          data={[
            {
              reservation_status: '신청 접수됨',
              create_at: '2023-12-26',
              update_at: '2023-12-30',
              mate_name: '간병인1',
              patient_name: '환자1',
              diagnosis: '치매',
              start_date: '2024-01-01',
              end_date: '2024-01-31',
            },
            { date: '2023-12-24', name: '간병인2' },
            { date: '2023-12-20', name: '간병인3' },
          ]}
        />
      )}
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
