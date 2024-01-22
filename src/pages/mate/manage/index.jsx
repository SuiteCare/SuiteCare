import { useRouter } from 'next/router';
import { useEffect } from 'react';

import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateManagePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./manage/targeting');
  }, []);

  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar />
      </div>
    </>
  );
};

export default MateManagePage;
