import React, { useEffect, useRef } from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

const DaumSearchModal = ({ closeModal, setAddress }) => {
  const { handleContentClick } = useModal();
  const embedLayerRef = useRef(null);

  const execDaumPostcode = ($target) => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress({
          postcode: data.zonecode,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          detailAddress: '',
        });

        closeModal();
      },
      width: '100%',
      height: '100%',
      maxSuggestItems: 5,
    }).embed($target);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;

    script.onload = () => {
      if (embedLayerRef.current) {
        execDaumPostcode(embedLayerRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} style={{ paddingBottom: '3rem' }} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        <div
          ref={embedLayerRef}
          id='layer'
          style={{
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            height: '600px',
            zIndex: 1,
            WebkitOverflowScrolling: 'touch',
          }}
        />
      </div>
    </div>
  );
};

export default DaumSearchModal;
