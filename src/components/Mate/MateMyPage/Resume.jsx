import { useEffect, useState } from 'react';

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

  const changeHandler = (checked, id) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.mainServiceData = [...prevFormData.mainServiceData, id];
      } else {
        updatedData.mainServiceData = prevFormData.mainServiceData.filter((it) => it !== id);
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
  };

  const handleUpdateResume = async () => {
    if (!formData.wage) {
      alert('희망 최소시급을 입력하세요.');
      return false;
    }

    if (!formData.checkedLoc.length) {
      alert('최소 1개의 활동 지역을 선택하세요.');
      return false;
    }

    if (!formData.mainServiceData.length) {
      alert('최소 1개의 대표서비스를 입력하세요.');
      return false;
    }

    const method = data.resume.location ? 'patch' : 'post';

    try {
      const body = {
        ...formData,
      };
      console.log('업데이트 완료:', body);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const initializeFormData = ($data) => {
    setFormData({
      profilePictureFilename: $data.resume?.mate?.profile_picture_filename || '',
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
    initializeFormData(data);
  }, [data]);

  return (
    <div className={styles.Resume}>
      <div className={styles.form_wrapper}>
        <form name='resume'>
          <section className={styles.userinfo}>
            <UserInfo styles={styles} data={data} formData={formData} setFormData={setFormData} />
          </section>

          <section className={styles.location}>
            <Location styles={styles} formData={formData} setFormData={setFormData} />
          </section>

          <section className={styles.career}>
            <Career formData={formData} setFormData={setFormData} handleItemChange={handleItemChange} />
          </section>

          <section className={styles.certificate}>
            <Certificate formData={formData} setFormData={setFormData} handleItemChange={handleItemChange} />
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
                        changeHandler(e.currentTarget.checked, e.currentTarget.value);
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
              {data.resume.location ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;
