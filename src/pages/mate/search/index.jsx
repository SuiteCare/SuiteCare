import Header from '@/components/Mate/MateHeader/MateHeader';
import MateJobSearch from '@/components/Mate/MateJobSearch/MateJobSearch';

const Search = () => {
  return (
    <div className='Search'>
      <Header />
      <div className='title_wrapper'>
        <h1>간병 일감 검색하기</h1>
        <span>원하는 조건의 간병 일감을 찾아보세요.</span>
      </div>
      <MateJobSearch />
    </div>
  );
};

export default Search;
