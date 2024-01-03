import { useEffect, useState } from 'react';

import usePatientList from '@/hooks/usePatientList';

import styles from './ReservationForm.module.css';

import { PatientInfo } from './PatientInfo';

const ReservationForm = () => {
  const [loginId, setLoginId] = useState(null);
  const patientList = usePatientList(loginId);
  console.log('위에있음', patientList);

  const [patientInfo, setPatientInfo] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
    }
  }, []);

  const handleOnChange = (e) => {
    setPatientInfo(patientList[e.target.value - 1]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`${styles.ReservationForm} content_wrapper`}>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={handleOnChange}>
            <option>환자 선택</option>
            {patientList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.diagnosis_name})
              </option>
            ))}
          </select>
          <button type='button'>새로운 환자 추가하기</button>
        </div>

        {patientInfo ? (
          <>
            <div className={styles.grid_wrapper}>
              <div className={styles.patient_info_wrapper}>
                <PatientInfo patientInfo={patientInfo} styles={styles} />
              </div>

              <div className={styles.reservation_info_wrapper}>
                <div className='input_wrapper'>
                  <label>주소</label>
                  <div>
                    <select>
                      <option value={'hospital'}>병원</option>
                      <option value={'home'}>자택</option>
                    </select>
                    <input type='text' />
                    <button type='button'>주소 검색</button>
                  </div>
                </div>
                <div className='input_wrapper'>
                  <label>간병 기간</label>
                  <div>
                    <input type='date' /> ~
                    <input type='date' />
                  </div>
                </div>
                <div className='input_wrapper'>
                  <label>출퇴근시간</label>
                  <div>
                    <input type='time' /> ~ <input type='time' />
                  </div>
                </div>
                <div className='input_wrapper'>
                  <div>
                    <label>출퇴근요일</label>
                    <div>
                      <input type='checkbox' value={0} />
                      <span>전체 선택</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input type='checkbox' value={0} />
                      <span>일</span>
                    </div>
                    <div>
                      <input type='checkbox' value={1} />
                      <span>월</span>
                    </div>
                    <div>
                      <input type='checkbox' value={2} />
                      <span>화</span>
                    </div>
                    <div>
                      <input type='checkbox' value={3} />
                      <span>수</span>
                    </div>
                    <div>
                      <input type='checkbox' value={4} />
                      <span>목</span>
                    </div>
                    <div>
                      <input type='checkbox' value={5} />
                      <span>금</span>
                    </div>
                    <div>
                      <input type='checkbox' value={6} />
                      <span>토</span>
                    </div>
                  </div>
                </div>
                <div className='input_wrapper'>
                  <label>제시 시급</label>
                  <div>
                    <input type='number' min='9860' max='1000000' value='9860' />원
                  </div>
                </div>
              </div>
            </div>

            <div className='button_wrapper'>
              <button type='submit'>간병 신청하기</button>
            </div>
          </>
        ) : (
          '간병을 받을 환자를 선택하세요.'
        )}
      </form>
    </div>
  );
};

export default ReservationForm;
