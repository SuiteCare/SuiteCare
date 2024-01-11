import useModal from '@/hooks/useModal.js';

import KakaoMapSearch from './kakaoMapSearch';
import styles from '@/components/Common/Modal/Modal.module.css';
import mapstyles from './kakaomap.module.css';

const KaKaoMapModal = ({ closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={`${styles.Modal} ${mapstyles.Modal}`} onClick={closeModal}>
      <div className={`${styles.modal_wrapper} ${mapstyles.modal_wrapper}`} onClick={handleContentClick}>
        <KakaoMapSearch />
      </div>
    </div>
  );
};

export default KaKaoMapModal;
