import styles from './Profile.module.css';
import Sidebar from '@/components/Mate/MateMyPage/Sidebar';

const Profile = ({ data }) => {
  console.log({ data });
  // console.log(data.mate.name);


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
