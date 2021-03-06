import MemberCard from './member-card';

function MainContent () {

  return (
    <div className='main-container'>
      <h2 className='d-flex justify-content-center'>Family</h2>
      <div>
        <MemberCard />
      </div>
    </div>
  )
};

export default MainContent;