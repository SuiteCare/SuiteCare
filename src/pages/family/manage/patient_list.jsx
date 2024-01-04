import { useEffect, useState } from 'react';

import usePatientList from '@/hooks/usePatientList';

import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';
import PatientList from '@/components/Family/FamilyManage/PatientList';

const FamilyPatientListPage = () => {
  const [loginId, setLoginId] = useState(null);
  const patientList = usePatientList(loginId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
    }
  }, []);

  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar activeMenu='patient_list' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>내 환자 목록</h1>
            <span>간병 예약을 위해 사용될 환자 정보 목록을 확인하고 관리하세요.</span>
          </div>
          <PatientList data={patientList} />
        </div>
      </div>
    </>
  );
};

export default FamilyPatientListPage;
