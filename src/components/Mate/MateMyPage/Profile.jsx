import styles from './Profile.module.css';
import Sidebar from '@/components/Mate/MateMyPage/Sidebar';
import { useState } from 'react';
import { calAge } from '@/utils/calculators';

const Profile = ({ data }) => {
  console.log({ data });
  // console.log(data.mate.name);
  // const [info, setInfo] = useState({
  //   basic: {},
  //   career: [{}],
  //   certificate: [{}],
  //   location: [{}],
  //   mainService: [{}],
  // });
  //   setInfo({
  //       basic: data.mate,
  //       career: data.career,
  //       certificate: data.certificate,
  //       location: data.location,
  //       mainService: data.mainService
  //   });

  const [introduction, setIntroduction] = useState('');

  const [wordCnt, setWordCnt] = useState(0);
  const handlerTextChange = (e) => {
    setIntroduction(e.target.value);
    setWordCnt(e.target.value.length);
  };
  // const age = calAge(data.mate.birthday);
  const [loc, setLoc] = useState();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
  };


  return (
    <div className={styles.wrapper}>
      <Sidebar current='profile' />
      <div className={styles.form_wrapper}>
        <section className={styles.introduce}>
          <div className={styles.img_wrapper}>
            <img></img>
            <input type='file' />
          </div>
        {/*  <div className={styles.basicInfo}>*/}
        {/*    <div><h3>{data.mate.name}</h3></div>*/}
        {/*    <div className={styles.gender}><p>{data.mate.gender === 'M' ? '남' : '여'} / 만 {age} 세</p></div>*/}
        {/*</div>*/}
        <div>
            {/*{repo.map((it) => (<li>{it.id}</li>))}*/}
        </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
