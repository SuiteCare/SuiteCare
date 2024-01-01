import styles from '@/components/Common/Modal/Modal.module.css';
import useModal from '@/components/Common/Modal/useModal';

const PatientDetailModal = ({ modalData, closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal}></span>
        </div>
        {modalData.diagnosis_name}
      </div>
    </div>
  );
};

export default PatientDetailModal;
