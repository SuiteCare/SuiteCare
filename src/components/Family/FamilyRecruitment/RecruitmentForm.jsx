import { useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';
import useAlert from '@/hooks/useAlert';

import styles from './RecruitmentForm.module.css';
import { PatientInfo } from './PatientInfo';
import DaumPostcode from '@/components/Common/Address/DaumPostcode';
import KakaoPostcode from '@/components/Common/Address/KakaoPostcode';
import PatientSelector from '../FamilyMateSearch/PatientSelector';

import TimePicker from '@/utils/TimePicker';
import { calTimeDiff, weekdayDic, countWeekdays, minWage } from '@/utils/calculators';

const RecruitmentForm = () => {
  const navigator = useRouter();
  const { openAlert, alertComponent } = useAlert();

  const { id } = useLoginInfo();

  const [patientInfo, setPatientInfo] = useState();

  const afterNday = (date) => {
    const dt = new Date(Date.now() + date * 24 * 60 * 60 * 1000);
    return `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  const [formData, setFormData] = useState({
    location: '병원', // 병원 or 자택
    start_date: afterNday(7), // 날짜 형식 YYYY-MM-DD
    end_date: afterNday(14), // 날짜 형식 YYYY-MM-DD
    wage: '15000',
    expire_at: afterNday(7),
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

  const wageOptions = (min, max, step) => {
    const options = [];

    for (let i = min; i <= max; i += step) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>,
      );
    }

    return options;
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
    ) {
      return openAlert('간병 기간 및 출퇴근요일 설정이 올바르지 않습니다.');
    }

    if (new Date(formData.expire_at) < Date.now()) {
      return openAlert('공고 마감일 설정이 올바르지 않습니다.');
    }

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
      const response = await axiosInstance.post('/api/v1/recruitment', body);
      if (response.data) {
        alert('공고 등록이 완료되었습니다.');
        navigator.push('./main');
      } else {
        return openAlert('공고 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${styles.RecruitmentForm} content_wrapper`}>
      {alertComponent}
      <form onSubmit={handleSubmit}>
        <PatientSelector patientInfo={patientInfo} setPatientInfo={setPatientInfo} setFormData={setFormData} />

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

              <div className={styles.recruitment_info_wrapper}>
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
                    <input type='date' name='start_date' onChange={handleInputChange} defaultValue={afterNday(7)} /> ~
                    <input type='date' name='end_date' onChange={handleInputChange} defaultValue={afterNday(14)} />
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
                    <select name='wage' onChange={handleInputChange}>
                      <option value={minWage}>{minWage}</option>
                      {wageOptions(10000, 30000, 1000)}
                    </select>
                    원
                  </div>
                </div>

                <div className='input_wrapper'>
                  <label>공고 마감일</label>
                  <div>
                    <input type='date' name='expire_at' onChange={handleInputChange} defaultValue={afterNday(4)} />
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

export default RecruitmentForm;
