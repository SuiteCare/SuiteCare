import React, { useEffect, useState } from 'react';

import useAlert from '@/hooks/useAlert';

import TimePicker from '@/utils/TimePicker';
import { calAge, genderToKo, minWage } from '@/utils/calculators';

const UserInfo = ({ styles, data, formData, setFormData, setChangedData }) => {
  const { openAlert, alertComponent } = useAlert();

  const handleContactTimeChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      contact_time_start: type === 'start' ? value : prevData.contact_time_start,
      contact_time_end: type === 'end' ? value : prevData.contact_time_end,
    }));
    if (type === 'start') {
      setChangedData((prevData) => ({
        ...prevData,
        contact_time_start: value,
      }));
    }
    if (type === 'end') {
      setChangedData((prevData) => ({
        ...prevData,
        contact_time_end: value,
      }));
    }
  };

  const [wordCnt, setWordCnt] = useState((data.resume?.basicResumeDTO?.introduction || '').length || 0);
  const handlerTextChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      introduction: value,
    }));
    setWordCnt(value.length);
    setChangedData((prevFormData) => ({
      ...prevFormData,
      introduction: value,
    }));
  };

  const [isWageInputDisabled, setIsWageInputDisabled] = useState(false);

  useEffect(() => {
    setIsWageInputDisabled(data.resume?.basicResumeDTO?.desired_wage === -1);
  }, [data]);

  const handleWageCheckbox = (e) => {
    const isChecked = e.target.checked;
    const newDesiredWage = isChecked ? -1 : minWage;

    setIsWageInputDisabled(isChecked);

    setFormData((prevData) => ({
      ...prevData,
      desired_wage: newDesiredWage,
    }));

    setChangedData((prevData) => ({
      ...prevData,
      desired_wage: newDesiredWage,
    }));
  };

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (formData.profile_picture_filename) {
      const file = formData.profile_picture_filename;
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Invalid file type.');
      }
    } else {
      setImagePreview(null);
    }
  }, [formData.profile_picture_filename]);

  const handleFileChange = ($event) => {
    const file = $event.target.files[0];
    const maxSize = 1024 * 1024; // 1MB

    if (file instanceof Blob) {
      if (file.size <= maxSize) {
        setFormData((prevData) => ({
          ...prevData,
          profile_picture_filename: file.name,
        }));
        setChangedData((prevData) => ({
          ...prevData,
          profile_picture_filename: file.name,
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.error('File size exceeds the limit.');
        openAlert('파일 사이즈는 1MB 미만이어야 합니다.');
      }
    } else {
      console.error('Invalid file type.');
      openAlert('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  return (
    <>
      {openAlert && alertComponent}
      <h3>기본정보</h3>
      <div className='input_wrapper'>
        <div
          className={styles.img_wrapper}
          style={{
            backgroundImage: `url(${imagePreview || '/default_profile.jpg'})`,
          }}
        />
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

        <input type='file' onChange={handleFileChange} accept='image/*' />
      </div>
      <div>
        <div className={styles.contact}>
          <div className='input_wrapper'>
            <label htmlFor='contact'>연락 가능 시간</label>
            <div className='timepicker_wrapper'>
              <TimePicker
                time={formData?.contact_time_start}
                setTime={(value) => handleContactTimeChange('start', value)}
                start={0}
                end={24}
              />
              ~
              <TimePicker
                time={formData?.contact_time_end}
                setTime={(value) => handleContactTimeChange('end', value)}
                start={0}
                end={24}
              />
            </div>
          </div>
        </div>

        <div className={styles.desired_wage}>
          <div className='input_wrapper'>
            <label>희망 최소 시급</label>
            <div>
              <input
                type='number'
                name='desired_wage'
                min={isWageInputDisabled ? 0 : minWage}
                max={isWageInputDisabled ? 0 : 1000000}
                step={10}
                disabled={isWageInputDisabled}
                value={formData.desired_wage}
                style={isWageInputDisabled ? { color: '#f9f8f7' } : undefined}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    desired_wage: e.target.value,
                  }));
                  setChangedData((prevData) => ({
                    ...prevData,
                    desired_wage: e.target.value,
                  }));
                }}
              />
              원
              <div className='checkbox_wrapper'>
                <input type='checkbox' onChange={(e) => handleWageCheckbox(e)} checked={isWageInputDisabled} />
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
                placeholder='메이트님을 나타내는 소개글을 작성해 주세요.'
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
