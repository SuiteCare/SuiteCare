import React from 'react';
import styles from './FamilyManageTable.module.css';
import { calAge } from '@/utils/calculators';
import { useRouter } from 'next/router';

const PatientList = ({ data }) => {
  const navigator = useRouter();

  return (
    <div className={styles.FamilyManageTable}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>성함</th>
            <th>성별</th>
            <th>생년월일/나이</th>
            <th>키</th>
            <th>몸무게</th>
            <th>진단명</th>
            <th>상세정보 보기</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <br />
                등록한 환자가 없습니다.
                <br /> <br />
                <button onClick={() => navigator.push('/family/addPatient')}>환자 등록하기</button>
                <br /> <br />
              </td>
            </tr>
          ) : (
            data.map((e, index) => (
              <tr key={index}>
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
                  <button>상세정보 보기</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
