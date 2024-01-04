import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatientList = ($id) => {
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    const getPatientList = async () => {
      try {
        const response = await axios.get('/api/v1/patient', { params: { id: $id } });
        setPatientList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if ($id) {
      getPatientList();
    }
  }, [$id]);

  return patientList;
};

export default usePatientList;
