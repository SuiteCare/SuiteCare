import React from 'react';
import FamilyAddPatient from '@/components/Family/FamilyAddPatient/FamilyAddPatient';
import Header from '@/components/Family/FamilyHeader/FamilyHeader';

const AddPatient = () => {
  return (
    <>
      <Header />
      <div className='title_wrapper'>
        <h1>환자 등록하기</h1>
        <span>간병 신청을 위해서는 환자 정보를 등록해 두어야 합니다.</span>
      </div>
      <FamilyAddPatient />
    </>
  );
};

export default AddPatient;
