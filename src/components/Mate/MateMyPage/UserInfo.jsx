import React, { useState } from 'react';
import Image from 'next/image';

import TimePicker from '@/utils/TimePicker';
import { calAge, genderToKo, minWage } from '@/utils/calculators';

const UserInfo = ({ styles, data, formData, setFormData }) => {
  const handleContactTimeChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      contactTimeStart: type === 'start' ? value : prevData.contactTimeStart,
      contactTimeEnd: type === 'end' ? value : prevData.contactTimeEnd,
    }));
  };

  const [wordCnt, setWordCnt] = useState((data.resume?.mate?.introduction || '').length || 0);
  const handlerTextChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      introduction: value,
    }));
    setWordCnt(value.length);
  };

  const [isWageInputDisabled, setIsWageInputDisabled] = useState(false);
  const handleWageCheckbox = (e) => {
    if (e.target.checked) {
      setIsWageInputDisabled(true);
      setFormData((prevData) => ({
        ...prevData,
        wage: '무관',
      }));
    } else {
      setIsWageInputDisabled(false);
      setFormData((prevData) => ({
        ...prevData,
        wage: minWage,
      }));
    }
  };

  const handleFileChange = ($event) => {
    const file = $event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePictureFilename: file.name,
    }));
  };

  return (
    <>
      <h3>기본정보</h3>
      <div className='input_wrapper'>
        <div className={styles.img_wrapper}>
          <Image
            src={`/${formData.profilePictureFilename || data.profile_picture_filename || 'default_profile.jpg'}`}
            alt='profile_picture'
            width={200}
            height={150}
          />

          <input type='file' onChange={handleFileChange} />
        </div>
        <div className={styles.basicInfo}>
          <div>
            <h2>{data.mypage.name}</h2>
          </div>
          <div>
            <p>
              {genderToKo(data.mypage.gender)}성 / {data.mypage.birthday} (만 {calAge(data.mypage.birthday)} 세)
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.contact}>
          <div className='input_wrapper'>
            <label htmlFor='contact'>연락 가능 시간</label>
            <div className='timepicker_wrapper'>
              <TimePicker
                time={formData?.contactTimeStart}
                setTime={(value) => handleContactTimeChange('start', value)}
                start={0}
                end={24}
              />
              ~
              <TimePicker
                time={formData?.contactTimeEnd}
                setTime={(value) => handleContactTimeChange('end', value)}
                start={0}
                end={24}
              />
            </div>
          </div>
        </div>

        <div className={styles.wage}>
          <div className='input_wrapper'>
            <label>희망 최소 시급</label>
            <div>
              <input
                type='number'
                min={minWage}
                max={1000000}
                step={10}
                disabled={isWageInputDisabled}
                value={formData.wage}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    wage: e.target.value,
                  }))
                }
              />
              원
              <div className='checkbox_wrapper'>
                <input type='checkbox' onChange={(e) => handleWageCheckbox(e)} />
                <span>무관</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.introduction}>
          <div className='input_wrapper'>
            <label htmlFor='introduction'>한 줄 소개</label>
            <div>
              <textarea
                id='introduction'
                name='introduction'
                rows='1'
                maxLength='100'
                onChange={handlerTextChange}
                defaultValue={formData?.introduction}
              />
              <div className={styles.wordCnt}>
                <span>({wordCnt}/100)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
