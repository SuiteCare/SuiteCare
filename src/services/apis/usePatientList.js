import { useQuery } from 'react-query';

import axiosInstance from '../axiosInstance';

const usePatientList = (id) => {
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

  return { patientList, isError, isLoading };
};

export default usePatientList;
