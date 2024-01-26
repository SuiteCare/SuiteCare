import { useState, useEffect } from 'react';
import axios from 'axios';

import useLoginInfo from './useLoginInfo';

const usePatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const { token, id } = useLoginInfo();

  useEffect(() => {
    const getPatientList = async () => {
      try {
        const response = await axios.get('/api/v1/patient', {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (id) {
      getPatientList();
    }
  }, [id]);

  return patientList;
};

export default usePatientList;
