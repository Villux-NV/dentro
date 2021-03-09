import MemberCard from './member-card';

const MainContent = ({ members, getMembers, familyNameId }) => {

  return (
    <div className='main__container'>
      <MemberCard
        members={members}
        getMembers={getMembers}
        familyNameId={familyNameId}
      />
    </div>
  )
};

export default MainContent;