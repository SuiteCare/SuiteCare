import Header from '@/components/Mate/MateHeader/MateHeader';
import MateRecruitmentSearch from '@/components/Mate/MateRecruitmentSearch/RecruitmentSearch';

const Search = () => {
  return (
    <div className='Search'>
      <Header />
      <div className='title_wrapper'>
        <h1>간병 공고 검색하기</h1>
        <span>원하는 조건의 간병 일감을 찾아보세요.</span>
      </div>
      <MateRecruitmentSearch />
    </div>
  );
};

export default Search;
