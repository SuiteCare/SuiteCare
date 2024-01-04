import styles from './FormList.module.css';

const LocationList = ({ arr, num = 1, onChange }) => {
  return (
    <div
      className={styles.location_wrapper}
      style={{
        gridTemplateColumns: `repeat(${num}, 1fr)`,
      }}
    >
      {arr.map((e) => (
        <div key={e} className={styles.checkbox_wrapper}>
          <input type='checkbox' name='location' id={e} value={e} onChange={onChange} />
          <span>{e}</span>
        </div>
      ))}
    </div>
  );
};

export default LocationList;
