import styles from '@/pages/main.module.css';

const MainCard = ({ title, onClick, description }) => {
  return (
    <div className={styles.MainCard} onClick={onClick}>
      <p>{title}</p>
      <div className={styles.line} />
      <span>{description}</span>
    </div>
  );
};

export default MainCard;
