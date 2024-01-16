import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '../axiosInstance';

const usePatientList = () => {
  const [loginId, setLoginId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
    } else {
      // 서버에서는 아무것도 렌더링 하지 않음
      return null;
    }
  }, []);

  const {
    data: patientList,
    isError,
    isLoading,
  } = useQuery(
    ['patientList', loginId],
    async () => {
      const response = await axiosInstance.get('/api/v1/patient', { params: { id: loginId } });
      return response.data;
    },
    {
      enabled: Boolean(loginId),
    },
  );

  return { patientList, isError, isLoading };
};

export default usePatientList;
