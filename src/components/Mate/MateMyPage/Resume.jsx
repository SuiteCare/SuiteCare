import { useEffect, useState } from 'react';

import axiosInstance from '@/services/axiosInstance';
import useAlert from '@/hooks/useAlert';

import styles from './Resume.module.css';
import Career from './Career';
import Certificate from './Certificate';
import Location from './Location';
import UserInfo from './UserInfo';

import { minWage } from '@/utils/calculators';

const Resume = ({ data }) => {
  const [formData, setFormData] = useState({
    profilePictureFilename: '',
    contactTimeStart: '09:00',
    contactTimeEnd: '21:00',
    introduction: '',
    mainServiceData: [],
    checkedLoc: [],
    career: [],
    certificate: [],
    wage: minWage,
  });
  const [changedData, setChangedData] = useState({});

  const { openAlert, alertComponent } = useAlert();

  const handleMainServiceChange = (checked, value) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.mainServiceData = [...prevFormData.mainServiceData, value];
      } else {
        updatedData.mainServiceData = prevFormData.mainServiceData.filter((it) => it !== value);
      }

      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.mainServiceData = [...formData.mainServiceData, value];
      } else {
        updatedData.mainServiceData = formData.mainServiceData.filter((it) => it !== value);
      }

      return updatedData;
    });
  };

  const handleItemChange = (e, index, type) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      switch (type) {
        case 'career':
          updatedData.career = prevFormData.career.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificate = prevFormData.certificate.map((certificateItem, i) =>
            i === index ? { ...certificateItem, [name]: value } : certificateItem,
          );
          break;

        default:
          break;
      }
      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      switch (type) {
        case 'career':
          updatedData.career = formData.career.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificate = formData.certificate.map((certificateItem, i) =>
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
    const { wage, checkedLoc, mainServiceData } = formData;

    if (!wage) {
      alert('희망 최소시급을 입력하세요.');
      return false;
    }

    if (!checkedLoc.length) {
      alert('최소 1개의 활동 지역을 선택하세요.');
      return false;
    }

    if (!mainServiceData.length) {
      alert('최소 1개의 대표서비스를 입력하세요.');
      return false;
    }

    const method = data.resume.mate ? 'patch' : 'post';

    try {
      let body = {};
      if (method === 'post') {
        body = {
          ...formData,
        };
      } else if (method === 'patch') {
        body = {
          ...changedData,
        };
      }

      const response = await axiosInstance[method]('/api/v1/mate/resume', body);
      if (response.data) {
        openAlert('이력서 등록이 완료되었습니다.');
      } else {
        openAlert('이력서 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const initializeFormData = ($data) => {
    setFormData({
      profilePictureFilename: $data.resume?.mate?.profile_picture_filename || 'default_profile.jpg',
      contactTimeStart: $data.resume?.mate?.contact_time_start || '09:00',
      contactTimeEnd: $data.resume?.mate?.contact_time_end || '21:00',
      introduction: $data.resume?.mate?.introduction || '',
      mainServiceData: $data.resume?.mainService?.map((it) => it.name) || [],
      checkedLoc: $data.resume?.location?.map((it) => it.name) || [],
      career: $data.resume?.career || [],
      certificate: $data.resume?.certificate || [],
      wage: $data.resume?.mate?.desired_wage || minWage,
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
              formData={formData}
              setFormData={setFormData}
              setChangedData={setChangedData}
            />
          </section>

          <section className={styles.location}>
            <Location styles={styles} formData={formData} setFormData={setFormData} setChangedData={setChangedData} />
          </section>

          <section className={styles.career}>
            <Career
              formData={formData}
              setFormData={setFormData}
              setChangedData={setChangedData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.certificate}>
            <Certificate
              formData={formData}
              setFormData={setFormData}
              setChangedData={setChangedData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.mainService}>
            <h3>대표서비스</h3>
            <div>
              {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((service) => (
                <div key={service}>
                  <span>
                    <input
                      type='checkbox'
                      name='service'
                      value={service}
                      checked={formData?.mainServiceData?.includes(service)}
                      onChange={(e) => {
                        handleMainServiceChange(e.currentTarget.checked, e.currentTarget.value);
                      }}
                    />
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className='button_wrapper'>
            <button type='button' onClick={handleUpdateResume}>
              {data.resume.mate ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;
