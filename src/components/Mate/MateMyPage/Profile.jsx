import styles from './Profile.module.css';
import {useEffect, useState} from 'react';
import { calAge } from '@/utils/calculators';
import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';
import axios from "axios";

const Profile = ({ profile }) => {
  if (profile.length === 0) {
    return <div className={styles.wrapper}></div>;
  } else {

    let mateChange = false;

    const [introduction, setIntroduction] = useState(profile.mate.introduction);
    const [wordCnt, setWordCnt] = useState(profile.mate.introduction.length);

    const handlerTextChange = (e) => {
      setIntroduction(e.target.value);
      setWordCnt(e.target.value.length);
      mateChange = true;
    };

    const age = calAge(profile.mate.birthday);

    const [checkedLoc, setCheckedLoc] = useState(profile.location.map((it, index) => {
      return it.location_name;
    }));
    let locationChange = false;

    const locCheck = () => {
      const checkboxes = document.getElementsByName('location');
      checkboxes.forEach((it) => {
        it.checked = checkedLoc.includes(it.value);
      })
    }

    useEffect(() => {
      locCheck();
    }, []);

    const selectAllLocation = (e) => {
      const allLocationCheckboxes = Array.from(document.getElementsByName('location'));
      const isChecked = allLocationCheckboxes.filter((checkbox) => checkbox.checked === false).length === 0;

      const selectedLocations = isChecked ? [] : allLocationCheckboxes.map((checkbox) => checkbox.value);

      allLocationCheckboxes.forEach((checkbox) => {
        checkbox.checked = !isChecked;
      });

      e.target.checked = !isChecked;

      setCheckedLoc({
        ...checkedLoc,
        location: selectedLocations,
      });

      locationChange = true;
    };

    const handleAllLocationChange = (e) => {
      selectAllLocation(e);
      locationChange = true;
    };

    const handleCheckboxChange = (checked, value) => {
      if(checked) {
        setCheckedLoc([...checkedLoc, value]);
      } else {
        setCheckedLoc(checkedLoc.filter((it) => it !== value));
      }
    };

    const [career, setCareer] = useState(profile.career);
    let careerChange = false;

    function careerDelete(id) {
      setCareer(career.filter((it) => it.id !== id));
      careerChange = true;
    }

    function addCareer() {
      setCareer([...career, {}]);
      careerChange = true;
    }

    const [certificate, setCertificate] = useState(profile.certificate);
    let certificateChange = false;

    function certificateDelete(id) {
      setCertificate(certificate.filter((it) => it.id !== id));
      certificateChange = true;
    }

    function addCertificate() {
      setCertificate([...certificate, {}]);
      certificateChange = true;
    }


    const [mainServiceData, setMainServiceData] = useState(profile.mainService.map((it, index) => {
      return it.main_service_name;
    }));

    const changeHandler = (checked, id) => {
      if (checked) {
        setMainServiceData([...mainServiceData, id]);
      } else {
        setMainServiceData(mainServiceData .filter((it) => it !== id));
      }
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.form_wrapper}>
          <form name='profile'>

            <section>
              <h2>기본정보</h2>
              <div className={styles.introduce}>
                <div className={styles.img_wrapper}>
                  <img></img>
                  {/*<input type='file' />*/}
                </div>
                <div className={styles.basicInfo}>
                  <div>
                    <h3>{profile.mate.name}</h3>
                  </div>
                  <div>
                    <p>
                      {profile.mate.gender === 'M' ? '남' : '여'} / 만 {age} 세
                    </p>
                  </div>
                  <div>
                    <div className={styles.contact}>
                      <label htmlFor='contact'>연락 가능 시간</label>
                      <input type='time' id='contact_start' defaultValue={profile.mate.contact_time_start} onChange={(e) => mateChange = true}/>
                      ~
                      <input type='time' id='contact_end' defaultValue={profile.mate.contact_time_end} onChange={(e) => mateChange = true} />
                    </div>
                    <div className={styles.introduction}>
                      <label htmlFor='introduction'>한줄소개</label>
                      <textarea
                          id='introduction'
                          name='introduction'
                          rows='3'
                          maxLength='100'
                          onChange={handlerTextChange}
                          defaultValue={introduction}
                      ></textarea>
                      <div className={styles.wordCnt}>
                        <span>{wordCnt}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div>
                <div className={styles.location}>
                  <h2>활동 지역</h2>
                  <div className='checkbox_wrapper'>
                      <input type='checkbox' id='all' onChange={handleAllLocationChange} />
                      <label htmlFor='all'>전체 선택</label>

                      <input type='checkbox' value='강남구' />
                  </div>
                  <div className={styles.checkbox_list_wrapper}>
                    <FormLocationList onChange={(e) => handleCheckboxChange(e.currentTarget.checked, e.currentTarget.value)} />
                  </div>
                </div>

              </div>
            </section>
            <section className={styles.career}>
                <h2>경력</h2>
                <div>
                    <button type='button' onClick={addCareer}>+</button>
                </div>
                <div name='careerDiv'>
                {career.length > 0 ?
                    career.map((it, index) => (
                      <div key={index}>
                          <select name='job_name'id='job_name' onChange={(e) => careerDataChange(e)}>
                              {['경력명', '간호사', '호스피스 간호사', '요양보호사', '간병인', '물리치료사', '재활치료사', '사회복지사'].map((job, idx) => (
                                <>
                                  <option value={job} selected={job === it.job_name}>{job}</option>
                                </>
                              ))}
                          </select>
                          <input type='text' id='name' placeholder='상세 경력' value={it.name}/>
                          <span>{it.id}</span>
                          <div>
                              <input type='date' id='date_start' value={it.date_start}/>
                              ~
                              <input type='date' id='date_end' value={it.date_end}/>
                          </div>
                          <button type='button' onClick={() => careerDelete(it.id)}>X</button>
                      </div>
                    )) : <div></div>}
                </div>
            </section>
            <section className={styles.certificate}>
                <h2>자격증</h2>
                <div>
                    <button type='button' onClick={addCertificate}>+</button>
                </div>
                {certificate.length > 0 ?
                    certificate.map((it, index) => (
                        <div key={index}>
                            <input name='certificate_name' type='text' placeholder='자격증명' value={it.certificate_name}/>
                            <input name='certificate_code' type='text' placeholder='자격증 코드' value={it.cerficate_code} />
                            <div>
                              <label htmlFor='qualification_date'>취득일</label>
                              <input type='date' name='qualification_date' value={it.qualification_date}/>
                              <label htmlFor='expired_date'>만료일</label>
                              <input type='date' name='expired_date' value={it.expired_date}/>
                            </div>
                            <button type='button' onClick={() => certificateDelete(it.id)}>X</button>
                        </div>
                    ))
                    : <div></div>
                }
            </section>
            <section className={styles.mainService}>
                <h2>대표서비스</h2>
                <div className={styles.checkbox_list_wrapper}>
                    <div className={styles.checkbox_list_wrapper}>
                        {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((service, idx) => (
                            <div key={idx}>
                              <label>
                                <input type= 'checkbox' name='service' value={service} checked={mainServiceData.includes(service)}
                                 onChange={(e)=>{
                                   changeHandler(e.currentTarget.checked, e.currentTarget.value)
                                 }}
                                />
                                {service}
                              </label>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div>
              <button type='button'>수정하기</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Profile;
