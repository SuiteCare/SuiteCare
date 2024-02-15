import { useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';
import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';
import useAlert from '@/hooks/useAlert';

import styles from './ReservationForm.module.css';
import { PatientInfo } from './PatientInfo';
import DaumPostcode from '@/components/Common/Address/DaumPostcode';
import KakaoPostcode from '@/components/Common/Address/KakaoPostcode';

import TimePicker from '@/utils/TimePicker';
import { calTimeDiff, weekdayDic, countWeekdays, minWage } from '@/utils/calculators';

const ReservationForm = () => {
  const navigator = useRouter();
  const { openAlert, alertComponent } = useAlert();

  const { id } = useLoginInfo();

  const { patientList } = usePatientList(id);
  const [patientInfo, setPatientInfo] = useState();

  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    location: '병원', // 병원 or 자택
    start_date: today, // 날짜 형식 YYYY-MM-DD
    end_date: today, // 날짜 형식 YYYY-MM-DD
    wage: '15000',
  });

  const [address, setAddress] = useState({
    postcode: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
  });
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [weekdayBoolean, setWeekdayBoolean] = useState([true, true, true, true, true, true, true]);

  const handlePatientSelectChange = (e) => {
    if (e.target.value === 'add') {
      if (window.confirm('입력된 내용이 초기화됩니다. 환자 추가 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/addpatient');
      }
    } else {
      const selectedPatient = patientList.filter((v) => v.id === +e.target.value)[0];
      setPatientInfo(selectedPatient);
      setFormData((prevData) => ({
        ...prevData,
        patient_id: selectedPatient?.id,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWeekdayCheckboxWrapperClick = (index) => {
    const newArr = [...weekdayBoolean];
    newArr[index] = !newArr[index];

    setWeekdayBoolean(newArr);
  };

  const selectAllWeekday = (e) => {
    if (weekdayBoolean.every((v) => v === true)) {
      e.currentTarget.children[0].checked = false;
      setWeekdayBoolean([false, false, false, false, false, false, false]);
    } else {
      e.currentTarget.children[0].checked = true;
      setWeekdayBoolean([true, true, true, true, true, true, true]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.postcode || !address.roadAddress || !address.jibunAddress || !address.detailAddress)
      return openAlert('주소를 입력하세요.');

    if (
      countWeekdays(
        formData.start_date,
        formData.end_date,
        weekdayBoolean.reduce((acc, v, i) => {
          if (v) acc.push(i);
          return acc;
        }, []),
      ) === 0
    )
      return openAlert('간병 기간 및 출퇴근요일 설정이 올바르지 않습니다.');

    const body = {
      member_id: id,
      patient_id: patientInfo?.id,
      ...formData,
      start_time: startTime,
      end_time: endTime,
      weekday: weekdayBoolean.reduce((acc, v, i) => {
        if (v) acc.push(i);
        return acc;
      }, []),
      postcode: address.postcode,
      road_address: address.roadAddress,
      jibun_address: address.jibunAddress,
      address_detail: address.detailAddress,
    };

    try {
      const response = await axiosInstance.post('/api/v1/reservation', body);
      if (response.data) {
        alert('예약 신청이 완료되었습니다.');
        navigator.push('./main');
      } else {
        alert('예약 신청에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${styles.ReservationForm} content_wrapper`}>
      {alertComponent}
      <form onSubmit={handleSubmit}>
        <div className='input_wrapper'>
          <label>간병받을 환자</label>
          <select onChange={handlePatientSelectChange}>
            <option>환자 선택</option>
            {patientList?.map((e) => (
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
                <PatientInfo
                  patientBasic={patientInfo}
                  styles={styles}
                  navigator={navigator}
                  id={formData.patient_id}
                />
              </div>

              <div className={styles.reservation_info_wrapper}>
                <div className='input_wrapper'>
                  <label>주소</label>
                  <div className={styles.address_section}>
                    <span>장소 종류</span>
                    <select name='location' onChange={handleInputChange}>
                      <option value='병원'>병원</option>
                      <option value='자택'>자택</option>
                    </select>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
                      <span>우편번호</span>
                      <span>도로명주소</span>
                      <span>지번주소</span>
                      <span>상세주소</span>
                    </div>
                    {formData.location === '병원' ? (
                      <KakaoPostcode address={address} setAddress={setAddress} />
                    ) : (
                      <DaumPostcode address={address} setAddress={setAddress} />
                    )}
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>간병 기간</label>
                  <div>
                    <input type='date' name='start_date' onChange={handleInputChange} defaultValue={today} /> ~
                    <input type='date' name='end_date' onChange={handleInputChange} defaultValue={today} />
                    <p>
                      (총{' '}
                      {countWeekdays(
                        formData.start_date,
                        formData.end_date,
                        weekdayBoolean.reduce((acc, v, i) => {
                          if (v) acc.push(i);
                          return acc;
                        }, []),
                      )}
                      일)
                    </p>
                  </div>
                </div>

                <div className='input_wrapper'>
                  <div>
                    <label>출퇴근요일</label>
                    <div className={styles.checkbox_wrapper} onClick={selectAllWeekday}>
                      <input type='checkbox' defaultChecked />
                      <span>전체 선택</span>
                    </div>
                  </div>

                  <div className={styles.weekdays}>
                    {weekdayBoolean.map((v, i) => {
                      return (
                        <div
                          key={weekdayDic[i]}
                          className={styles.checkbox_wrapper}
                          onClick={() => handleWeekdayCheckboxWrapperClick(i)}
                        >
                          <input type='checkbox' name='weekday' value={i} checked={v} onChange={() => ''} />
                          <span>{weekdayDic[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>출퇴근시간</label>
                  <div>
                    <div className='timepicker_wrapper'>
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
                      min={minWage}
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
              {/** handle뭐시기 나온다음에 2면 '이미 지원한 간병예약입니다' 띄우기 */}
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
