import { useState, useEffect, useContext } from 'react';

import { AuthContext } from './auth';
import MemberCard from './member-card';
import TopNavigation from './top-navigation';

const MainContent = () => {
  let userId;
  const [families, setFamilies] = useState([]);
  const [members, setMembers] = useState([]);
  const [familyNameId, setFamilyNameId] = useState('');

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    userId = currentUser.uid;
  };
  

  useEffect(() => {
    getFamilies(userId);

    getMembers(familyNameId);
  }, []);

  async function getFamilies (id) {
    await fetch(`http://localhost:3500/families/${id}`)
      .then(res => res.json())
      .then(data => setFamilyNameId(data[0].id));
  };

  async function getMembers (id) {
    await fetch(`http://localhost:3500/membertree/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data === false) {
          return;
        } else {
          setMembers([data]);
        }
      });
  };


  const handleFamilies = (data) => {
    setFamilies(data);
  };

  const handleFamilyNameId = (id) => {
    setFamilyNameId(id);
    getMembers(id);
  };

  return (
    <div className='main__container'>
      <TopNavigation
        handleFamilies={handleFamilies}
        handleFamilyNameId={handleFamilyNameId}
        families={families}
      />

      <div className='member__container'>
        <MemberCard
          members={members}
          getMembers={getMembers}
          familyNameId={familyNameId}
        />
      </div>
    </div>
  )
};

export default MainContent;