import { useQuery } from 'react-query';

import useLoginInfo from '@/hooks/useLoginInfo';

import axiosInstance from '../axiosInstance';

const usePatientList = () => {
  const { id } = useLoginInfo();

  const {
    data: patientList,
    isError,
    isLoading,
  } = useQuery(
    ['patientList'],
    async () => {
      const response = await axiosInstance.get('/api/v1/patient');
      return response.data;
    },
    {
      enabled: Boolean(id),
      staleTime: 1000 * 3,
    },
  );

  return { patientList, isError, isLoading };
};

export default usePatientList;
