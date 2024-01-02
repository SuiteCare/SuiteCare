import React from 'react';
import { useRouter } from 'next/router';

import FamilyAddPatient from '@/components/Family/FamilyAddPatient/FamilyAddPatient';
import Header from '@/components/Family/FamilyHeader/FamilyHeader';

const ModifyPatient = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className='title_wrapper'>
        <h1>환자 정보 수정하기</h1>
        <span>환자 정보를 수정할 수 있습니다.</span>
      </div>
      <FamilyAddPatient idQuery={router.query.id} />
    </>
  );
};

export default ModifyPatient;
