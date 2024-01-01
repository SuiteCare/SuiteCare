import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from './FamilyManageTable.module.css';
import PatientDetailModal from './PatientDetailModal';
import useModal from '@/components/Common/Modal/useModal';

import { calAge } from '@/utils/calculators';

const PatientList = ({ data }) => {
  const navigator = useRouter();

  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const getPatientDetail = async ($id) => {
    const response = await axios.get(`/api/v1/patient/${$id}`);
    setModalData(response.data);
  };
  const handleDetailClick = (e) => {
    getPatientDetail();
    openModal();
  };

  return (
    <div className={styles.FamilyManageTable}>
      <div style={{ textAlign: 'right' }}>
        <button type='button' onClick={() => navigator.push('/family/addPatient')}>
          환자 등록하기
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>성함</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>키</th>
            <th>몸무게</th>
            <th>진단명</th>
            <th colSpan={2}>환자 정보 관리</th>
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
              <tr key={index} target={e.id}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.gender === 'F' ? '여자' : '남자'}</td>
                <td>
                  {e.birthday} (만 {calAge(e.birthday)}세)
                </td>
                <td>{e.height} cm</td>
                <td>{e.weight} kg</td>
                <td>{e.diagnosis_name}</td>
                <td>
                  <button type='button' onClick={handleDetailClick}>
                    상세정보 보기
                  </button>
                </td>
                <td>
                  <button type='button' className={styles.modify_button}>
                    정보 수정
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
