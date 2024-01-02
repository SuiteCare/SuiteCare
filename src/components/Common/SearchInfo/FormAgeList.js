import styles from './FormList.module.css';

const FormAgeList = ({ onChange }) => {
  return (
    <>
      {[20, 30, 40, 50].map((e) => (
        <div className={styles.checkbox_wrapper} key={e}>
          <input type='checkbox' name='age' value={e} onChange={onChange} />
          <span>{`${e}세 ~ ${e + 9}세`}</span>
        </div>
      ))}
      <div className={styles.checkbox_wrapper}>
        <input type='checkbox' name='age' value='60' onChange={onChange} />
        <span>60세 이상</span>
      </div>
    </>
  );
};

export default FormAgeList;
