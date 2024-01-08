import FormLocationCheckbox from './FormLocationCheckbox';

const LocationList = ({ onChange }) => {
  return (
    <>
      <div className='location_list'>
        <label>ㄱ</label>
        <FormLocationCheckbox
          arr={['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구']}
          num='2'
          onChange={onChange}
        />
      </div>
      <div className='location_list'>
        <label>ㄴ</label>
        <FormLocationCheckbox arr={['노원구']} onChange={onChange} />
      </div>
      <div className='location_list'>
        <label>ㄷ</label>
        <FormLocationCheckbox arr={['도봉구', '동대문구', '동작구']} onChange={onChange} />
      </div>
      <div className='location_list'>
        <label>ㅅ</label>
        <FormLocationCheckbox arr={['서대문구', '서초구', '성동구', '성북구', '송파구']} onChange={onChange} />
      </div>
      <div className='location_list'>
        <label>ㅇ</label>
        <FormLocationCheckbox arr={['양천구', '영등포구', '용산구', '은평구']} onChange={onChange} />
      </div>
      <div className='location_list'>
        <label>ㅈ</label>
        <FormLocationCheckbox arr={['종로구', '중구', '중랑구']} onChange={onChange} />
      </div>
    </>
  );
};

export default LocationList;
