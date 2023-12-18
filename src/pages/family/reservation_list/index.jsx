import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyCalendar from '@/components/Family/FamilyReservationList/FamilyCalendar';
import FamilyReservationSidebar from '@/components/Family/FamilyReservationList/FamilyReservationSidebar';
import styles from './ReservationList.module.css';

const ReservationList = () => {
  return (
    <>
      <FamilyHeader />
      <div className={styles.ReservationList}>
        <FamilyReservationSidebar />
        <div>
          <div className='title_wrapper'>
            <h1>예약 내역 확인</h1>
          </div>
          <FamilyCalendar />
        </div>
      </div>
    </>
  );
};

export default ReservationList;
