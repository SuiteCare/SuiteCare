import PaymentCard from './PaymentCard';

const FamilyPaymentList = () => {
  return (
    <div className='FamilyPaymentList'>
      <PaymentCard
        data={[
          {
            create_at: '2023-12-26',
            update_at: '2023-12-30',
            mate_name: '간병인1',
            patient_name: '환자1',
            diagnosis: '치매',
          },
          { date: '2023-12-24', name: '간병인2' },
          { date: '2023-12-20', name: '간병인3' },
        ]}
      />
    </div>
  );
};

export default FamilyPaymentList;
