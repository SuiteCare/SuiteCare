import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import usePatientList from '@/hooks/usePatientList';

import styles from './ReservationForm.module.css';
import { PatientInfo } from './PatientInfo';

import TimePicker from '@/utils/TimePicker';
import { calTimeDiff } from '@/utils/calculators';

const ReservationForm = () => {
  const navigator = useRouter();

  const [loginId, setLoginId] = useState(null);
  const patientList = usePatientList(loginId);
  const [patientInfo, setPatientInfo] = useState();

  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    family_id: '',
    patient_id: '',
    location: 'hospital',
    address: '',
    address_detail: '',
    start_date: today,
    end_date: today,
    weekday: {
      일: false,
      월: false,
      화: false,
      수: false,
      목: false,
      금: false,
      토: false,
    },
    start_time: '',
    end_time: '',
    wage: '15000',
  });

  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('06:00');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
      setFormData({ ...formData, family_id: loginId });
    }
  }, []);

  const handlePatientSelectChange = (e) => {
    if (e.target.value === 'add') {
      if (window.confirm('입력된 내용이 초기화됩니다. 환자 추가 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/addpatient');
      }
    } else {
      setPatientInfo(patientList[e.target.value - 1]);
      setFormData({ ...formData, patient_id: patientInfo?.id });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxWrapperClick = (e) => {
    const optionValue = e.currentTarget.children[0].value;
    setFormData((prevData) => ({
      ...prevData,
      weekday: {
        ...prevData.weekday,
        [optionValue]: !prevData.weekday[optionValue],
      },
    }));
  };

  const selectAllWeekday = (e) => {
    if (Object.values(formData?.weekday).every((v) => v === true)) {
      e.currentTarget.children[0].checked = false;
      setFormData((prevData) => ({
        ...prevData,
        weekday: {
          일: false,
          월: false,
          화: false,
          수: false,
          목: false,
          금: false,
          토: false,
        },
      }));
    } else {
      e.currentTarget.children[0].checked = true;
      setFormData((prevData) => ({
        ...prevData,
        weekday: {
          일: true,
          월: true,
          화: true,
          수: true,
          목: true,
          금: true,
          토: true,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      family_id: loginId,
      patient_id: patientInfo.id,
      start_time: startTime,
      end_time: endTime,
    }));
    console.log(formData);
  };

  return (
    <div className={`${styles.ReservationForm} content_wrapper`}>
      <form onSubmit={handleSubmit}>
        <div className='input_wrapper'>
          <label>간병받을 환자</label>
          <select onChange={handlePatientSelectChange}>
            <option>환자 선택</option>
            {patientList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.diagnosis_name})
              </option>
            ))}
            <option value='add'>새로운 환자 추가하기</option>
          </select>
        </div>

        <hr />

        {patientInfo ? (
          <>
            <div className={styles.grid_wrapper}>
              <div className={styles.patient_info_wrapper}>
                <PatientInfo patientInfo={patientInfo} styles={styles} navigator={navigator} />
              </div>

              <div className={styles.reservation_info_wrapper}>
                <div className='input_wrapper'>
                  <label>주소</label>
                  <div className={styles.input_with_button}>
                    <span>장소 종류</span>
                    <select name='location' onChange={handleInputChange}>
                      <option value='hospital'>병원</option>
                      <option value='home'>자택</option>
                    </select>
                    <span>기본 주소</span>
                    <input type='text' name='address' onChange={handleInputChange} />
                    <span>상세 주소</span>
                    <input type='text' name='address_detail' onChange={handleInputChange} />
                    <button type='button'>주소 검색</button>
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>간병 기간</label>
                  <div>
                    <input type='date' name='start_date' onChange={handleInputChange} defaultValue={today} /> ~
                    <input type='date' name='end_date' onChange={handleInputChange} defaultValue={today} />
                    <p>
                      (총 {(new Date(formData.end_date) - new Date(formData.start_date)) / (1000 * 3600 * 24) + 1}일)
                    </p>
                  </div>
                </div>

                <div className='input_wrapper'>
                  <div>
                    <label>출퇴근요일</label>
                    <div className={styles.checkbox_wrapper} onClick={selectAllWeekday}>
                      <input type='checkbox' />
                      <span>전체 선택</span>
                    </div>
                  </div>

                  <div className={styles.weekdays}>
                    {['일', '월', '화', '수', '목', '금', '토'].map((v) => {
                      return (
                        <div key={v} className={styles.checkbox_wrapper} onClick={handleCheckboxWrapperClick}>
                          <input type='checkbox' name='weekday' value={v} checked={formData.weekday[v]} />
                          <span>{v}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>출퇴근시간</label>
                  <div>
                    <div className={styles.timepicker_wrapper}>
                      <TimePicker time={startTime} setTime={setStartTime} start={6} end={22} />~
                      <TimePicker time={endTime} setTime={setEndTime} start={6} end={22} />
                    </div>
                    <p>(총 {calTimeDiff(startTime, endTime)}시간)</p>
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>제시 시급</label>
                  <div>
                    <input
                      type='number'
                      min='9860'
                      max='1000000'
                      name='wage'
                      placeholder='15000'
                      onChange={handleInputChange}
                    />
                    원
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className='button_wrapper'>
              <button type='submit'>간병 신청하기</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>간병을 받을 환자를 선택하세요.</div>
        )}
      </form>
    </div>
  );
};

export default ReservationForm;
