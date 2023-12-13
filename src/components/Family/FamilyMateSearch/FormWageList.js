import styles from './SearchForm.module.css';

const FormWageList = ({ onChange }) => {
  return (
    <>
      <div className={styles.checkbox_wrapper} key='0'>
        <input type='checkbox' name='wage' value={'최저시급 (9,860원)'} onChange={onChange} />
        <span>최저시급 (9,860원)</span>
      </div>
      {['15,000원', '20,000원', '25,000원'].map((e, i) => (
        <div className={styles.checkbox_wrapper} key={i + 1}>
          <input type='checkbox' name='wage' value={e} onChange={onChange} />
          <span>{`${e} 이하`}</span>
        </div>
      ))}
      <div className={styles.checkbox_wrapper}>
        <input type='checkbox' name='wage' value={'25,000원 초과'} onChange={onChange} />
        <span>25,000원 초과</span>
      </div>
    </>
  );
};

export default FormWageList;
