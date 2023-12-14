import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyMateSearch from '@/components/Family/FamilyMateSearch/FamilyMateSearch';

const Search = () => {
  return (
    <div className='Search'>
      <Header />
      <div className='title_wrapper'>
        <h1 className='title'>원하는 간병인 찾기</h1>
        <span className='description'>나와 꼭 맞는 조건의 간병인을 검색할 수 있습니다.</span>
      </div>
      <FamilyMateSearch />
    </div>
  );
};

export default Search;
