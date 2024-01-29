import { useQuery } from 'react-query';

import useLoginInfo from './useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

const usePatientList = () => {
  const { id } = useLoginInfo();

  const {
    data: patientList,
    isError,
    isLoading,
  } = useQuery(
    ['patientList', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/patient', { params: { id } });
      return response.data;
    },
    {
      enabled: Boolean(id),
    },
  );

  return patientList;
};

export default usePatientList;
