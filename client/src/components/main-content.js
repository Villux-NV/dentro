import MemberCard from './member-card';
import Members from './test-cards';

function MainContent () {

  return (
    <div className='main-container'>
      <h2 className='d-flex justify-content-center'>Family</h2>
      <div>
        {/* <MemberCard /> */}
        <Members />
      </div>
    </div>
  )
};

export default MainContent;