import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';
import useAlert from '@/hooks/useAlert';

import styles from './Resume.module.css';
import Career from './Career';
import Certificate from './Certificate';
import Location from './Location';
import UserInfo from './UserInfo';
import MainService from './MainService';
import Care from './Care';

import { countWeekdays, minWage } from '@/utils/calculators';

const Resume = ({ data }) => {
  const navigator = useRouter();

  const [formMateResumeData, setFormMateResumeData] = useState({
    profile_picture_filename: '',
    contact_time_start: '09:00',
    contact_time_end: '21:00',
    introduction: '',
    desired_wage: minWage,
  });

  const [formListData, setFormListData] = useState({
    mainServiceList: [],
    locationList: [],
    careerList: [],
    certificateList: [],
    careList: [],
  });

  const [changedListData, setChangedListData] = useState({});
  const [changedMateData, setChangedMateData] = useState({});
  const { openAlert, alertComponent } = useAlert();

  const handleItemChange = (e, index, type) => {
    const { name, value } = e.target;

    setFormListData((prevFormData) => {
      const updatedData = { ...prevFormData };

      switch (type) {
        case 'career':
          updatedData.careerList = prevFormData.careerList.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificateList = prevFormData.certificateList.map((certificateItem, i) =>
            i === index ? { ...certificateItem, [name]: value } : certificateItem,
          );
          break;

        default:
          break;
      }
      return updatedData;
    });
    setChangedListData((prevData) => {
      const updatedData = { ...prevData };

      switch (type) {
        case 'career':
          updatedData.careerList = formListData.careerList?.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificateList = formListData.certificateList?.map((certificateItem, i) =>
            i === index ? { ...certificateItem, [name]: value } : certificateItem,
          );
          break;

        default:
          break;
      }
      return updatedData;
    });
  };

  const handleUpdateResume = async () => {
    if (!formMateResumeData.desired_wage) {
      return openAlert('희망 최소시급을 입력하세요.');
    }

    if (formMateResumeData.desired_wage < minWage && formMateResumeData.desired_wage > 0) {
      setFormMateResumeData((prevData) => ({ ...prevData, desired_wage: minWage }));
      setChangedMateData((prevData) => ({ ...prevData, desired_wage: minWage }));
      return openAlert('희망 최소시급은 정부 공시 최저시급보다 낮을 수 없습니다.');
    }

    const { locationList, mainServiceList, careerList, certificateList } = formListData;

    if (!locationList.length) {
      return openAlert('최소 1개의 활동 지역을 선택하세요.');
    }

    if (locationList.length > 5) {
      return openAlert('활동 지역은 최대 5개까지 선택할 수 있습니다.');
    }

    if (!mainServiceList.length) {
      return openAlert('최소 1개의 주요 서비스를 선택하세요.');
    }

    if (mainServiceList.length > 3) {
      return openAlert('주요 서비스는 최대 3개까지 선택할 수 있습니다.');
    }

    if (
      !careerList.every((e) => {
        const { job_name, name, date_start, date_end } = e;
        if (countWeekdays(date_start, date_end, [0, 1, 2, 3, 4, 5, 6]) <= 0) {
          openAlert('경력 기간이 올바르지 않습니다.');
          return false;
        }
        if (!(!!job_name && !!name && !!date_start && !!date_end)) {
          openAlert('경력 사항의 빈 값을 모두 입력해 주세요.');
          return false;
        }
        return true;
      })
    ) {
      return false;
    }

    if (
      !certificateList.every((e) => {
        const { code, name, expired_date, qualification_date } = e;
        if (countWeekdays(qualification_date, expired_date, [0, 1, 2, 3, 4, 5, 6]) <= 0) {
          openAlert('자격증 기간 설정이 올바르지 않습니다.');
          return false;
        }
        if (!(!!code && !!name && !!qualification_date && !!expired_date)) {
          openAlert('자격증 목록의 빈 값을 모두 입력해 주세요.');
          return false;
        }
        return true;
      })
    ) {
      return false;
    }

    const method = data.resume.basicResumeDTO ? 'patch' : 'post';

    try {
      let requestData = {};
      let body = {};
      if (method === 'post') {
        requestData = {
          basicResumeDTO: { ...formMateResumeData },
          locationList: formListData.locationList.map((e) => ({ name: e })),
          mainServiceList: formListData.mainServiceList.map((e) => ({ name: e })),
        };

        if (formListData.careerList.length > 0) requestData.careerList = formListData.careerList;
        if (formListData.certificateList.length > 0) requestData.certificateList = formListData.certificateList;

        body = requestData;
        console.log('post', body);
      }

      if (method === 'patch') {
        requestData = {
          ...changedListData,
        };

        if (Object.keys(changedMateData).length > 0) requestData.basicResumeDTO = { ...changedMateData };

        if (changedListData.locationList) {
          requestData.locationList = changedListData.locationList.map((e) => ({ name: e }));
        }

        if (changedListData.mainServiceList) {
          requestData.mainServiceList = changedListData.mainServiceList.map((e) => ({ name: e }));
        }

        body = requestData;
        console.log('patch', body);

        if (Object.values(body).length === 0) return openAlert('변경할 데이터가 없습니다.');
      }

      const formData = new FormData();
      formData.append('file', document.querySelector('input[type=file]').files[0]);
      formData.append(
        'resumeData',
        new Blob([JSON.stringify(body)], {
          type: 'application/json',
        }),
      );
      const response = await axiosInstance[method]('/api/v1/mate/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        const { code, httpStatus, msg, count, result } = response.data;

        if (code === 200) {
          openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}이 완료되었습니다.`);
          setChangedListData({});
        } else {
          console.error(code, msg);
          openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}에 실패하였습니다.`);
        }
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}에 실패하였습니다.`);
    }
  };

  const initializeFormData = ($data) => {
    setFormMateResumeData({
      profile_picture_filename: $data.resume?.basicResumeDTO?.profile_picture_filename || 'default_profile.jpg',
      contact_time_start: $data.resume?.basicResumeDTO?.contact_time_start || '09:00',
      contact_time_end: $data.resume?.basicResumeDTO?.contact_time_end || '21:00',
      introduction: $data.resume?.basicResumeDTO?.introduction || '',
      desired_wage: $data.resume?.basicResumeDTO?.desired_wage || minWage,
    });
    setFormListData({
      mainServiceList: $data.resume?.mainServiceList?.map((e) => e.name) || [],
      locationList: $data.resume?.locationList?.map((e) => e.name) || [],
      careerList: $data.resume?.careerList?.map((e) => ({ ...e, orderId: e.id, isDeleted: false })) || [],
      certificateList: $data.resume?.certificateList?.map((e) => ({ ...e, orderId: e.id, isDeleted: false })) || [],
      careList: $data.resume?.careList || [
        { name: 'consciousness_state', value: 'y' },
        { name: 'meal_care_state', value: 'y' },
        { name: 'toilet_care_state', value: 'y' },
        { name: 'paralasys_state', value: 'y' },
        { name: 'behavioral_state', value: 'y' },
        { name: 'bedsore', value: 'y' },
        { name: 'suction', value: 'y' },
        { name: 'outpatient', value: 'y' },
        { name: 'night_care', value: 'y' },
      ],
    });
  };

  useEffect(() => {
    if (data) initializeFormData(data);
  }, [data]);

  return (
    <div className={styles.Resume}>
      {alertComponent}
      <div className={styles.form_wrapper}>
        <form name='resume'>
          <section className={styles.userinfo}>
            <UserInfo
              styles={styles}
              data={data}
              formData={formMateResumeData}
              setFormData={setFormMateResumeData}
              setChangedData={setChangedMateData}
            />
          </section>

          <section className={styles.location}>
            <Location
              styles={styles}
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
            />
          </section>

          <section className={styles.career}>
            <Career
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.certificate}>
            <Certificate
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.mainService}>
            <MainService formData={formListData} setFormData={setFormListData} setChangedData={setChangedListData} />
          </section>

          <section className={styles.care}>
            <Care formData={formListData} setFormData={setFormListData} setChangedData={setChangedListData} />
          </section>

          <div className='button_wrapper'>
            <button type='button' onClick={handleUpdateResume}>
              {data.resume.basicResumeDTO ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;
