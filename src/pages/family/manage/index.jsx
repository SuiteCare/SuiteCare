import { useRouter } from 'next/router';
import { useEffect } from 'react';

import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';

const FamilyManagePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./manage/reservation');
  }, []);

  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar />
      </div>
    </>
  );
};

export default FamilyManagePage;
