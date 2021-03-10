import { useState, useEffect, useContext } from 'react';

import { AuthContext } from './auth';
import MemberCard from './member-card';
import TopNavigation from './top-navigation';
import { storage } from '../firebase';

const MainContent = () => {
  let userId;

  const [members, setMembers] = useState([]);
  const [families, setFamilies] = useState([]);
  const [familyNameId, setFamilyNameId] = useState('');
  const [value, setValue] = useState('');
  const [memberId, setMemberId] = useState('');

  const [familyTest, setFamilyTest] = useState('');

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    userId = currentUser.uid;
  };

  useEffect(() => {
    getFamilies();
  }, []);
  
  async function getFamilies () {
    await fetch(`http://localhost:3500/families/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data) {
          setFamilyTest(false);
          console.log(families);
        } else {
          console.log(data, 'new fam?');
          setFamilyTest(true);
          setFamilies(data);
        }
      });
  };


  async function getMembers (id) {
    await fetch(`http://localhost:3500/membertree/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data === false) {
          setMembers([]);
          getFamilies();
        } else {
          setMembers([data]);
        }
      });
  };

  const handleMemberId = (id) => {
    setMemberId(id);
  };

  const handleFamilyNameId = (id) => {
    setFamilyNameId(id);
    getMembers(id);
    getFamilies();
  };

  const handleValue = (val) => {
    setValue(val);
  };

  const handleNewMembers = () => {
    setMembers([]);
  };

  return (
    <div className='main__container'>
      <TopNavigation
        handleFamilyNameId={handleFamilyNameId}
        handleNewMembers={handleNewMembers}
        families={families}
        familyNameId={familyNameId}
        familyTest={familyTest}
      />

      <div className='member__container'>
        <MemberCard
          members={members}
          value={value}
          getMembers={getMembers}
          familyNameId={familyNameId}
          handleFamilyNameId={handleFamilyNameId}
          handleValue={handleValue}
          addMemberId={handleMemberId.bind(this)}
          memberId={memberId}
          familyTest={familyTest}
        />
      </div>
    </div>
  )
};

export default MainContent;