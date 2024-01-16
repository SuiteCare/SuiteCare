import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import SuggestionTitle from '@/components/Family/FamilySuggestion/SuggestionTitle';

const SuggestionPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='title_wrapper'>
        <h1>간병인 추천받기</h1>
        <span>새로운 간병인을 추천받을 수 있습니다.</span>
        <SuggestionTitle />
      </div>
    </>
  );
};

export default SuggestionPage;
