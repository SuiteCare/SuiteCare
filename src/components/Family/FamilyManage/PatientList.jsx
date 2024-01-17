import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import useModal from '@/hooks/useModal';

import styles from './FamilyManageTable.module.css';
import PatientDetailModal from './Reservation/PatientDetailModal';

import { calAge, genderToKo } from '@/utils/calculators';

const PatientList = ({ data }) => {
  const navigator = useRouter();

  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const getPatientDetail = async ($event) => {
    setModalData($event);
    try {
      const patientPromise = axios.get(`/api/v1/patient/${$event.id}`);
      const patientDetailPromise = axios.get(`/api/v1/patientDetail/${$event.id}`);

      const [patientResponse, patientDetailResponse] = await Promise.all([patientPromise, patientDetailPromise]);

      setModalData({
        ...patientResponse.data,
        ...patientDetailResponse.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailClick = ($event) => {
    getPatientDetail($event);
    openModal();
  };

  return (
    <div className={styles.FamilyManageTable}>
      <div style={{ textAlign: 'right' }}>
        <button type='button' onClick={() => navigator.push('/family/addpatient')}>
          환자 등록하기
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>성명</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>키</th>
            <th>몸무게</th>
            <th>진단명</th>
            <th>환자 상세정보</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <br />
                <br />
                <span>등록한 환자가 없습니다.</span>
                <br />
                <br />
                <br />
              </td>
            </tr>
          ) : (
            data.map((e, index) => (
              <tr key={e}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{genderToKo(e.gender)}성</td>
                <td>
                  {e.birthday} (만 {calAge(e.birthday)}세)
                </td>
                <td>{e.height} cm</td>
                <td>{e.weight} kg</td>
                <td>{e.diagnosis_name}</td>
                <td>
                  <button type='button' onClick={() => handleDetailClick(e)}>
                    상세정보 보기
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalVisible && <PatientDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default PatientList;
