import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import './member.css';
import MemberStart from './member-start-card';
import MemberChildren from './member-card-children';
import { AuthContext } from './auth';

const MemberCard = ({ members, value, getMembers, handleFamilyNameId, handleValue, addMemberId, memberId, familyNameId, familyTest }) => {
  const BASE_URL = 'http://localhost:3500/';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);

    const initPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, birthday, familyNameId })
    }

    const initPut = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, birthday })
    }

    if (value === 'Child') {
      fetch(`${BASE_URL}create/child/${memberId}/${userId}`, initPost)
        .then(res => res.json())
        .then(data => getMembers(data.FamilyId));
    } else if (value === 'Parent') {
      fetch(`${BASE_URL}create/parent/${memberId}/${userId}`, initPost)
        .then(res => res.json())
        .then(data => getMembers(data.FamilyId));
    } else if (value === 'Edit') {
      fetch(`${BASE_URL}edit/${memberId}`, initPut)
        .then(res => res.json())
        .then(data => {
          getMembers(data.FamilyId);
        });
    } else if (value === 'Start') {
      fetch(`${BASE_URL}create/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, birthday })
      }).then(res => res.json())
        .then(data => {
          getMembers(data.FamilyId);
          handleFamilyNameId(data.FamilyId);
        });
    }

    setFirstName('');
    setLastName('');
    setBirthday('');
  };

  const handleDeleteMember = (e) => {
    fetch(`${BASE_URL}delete/${memberId}`, { method: 'DELETE'})
      .then(res => res.json())
      .then(() => getMembers(familyNameId));
  };

  return (
    <div>
      <div>
        { members.length === 0 &&
          <motion.div
            layout
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <div>
              { familyTest &&
                <h2 className='d-flex justify-content-center'>Select your tree! Or</h2>
              }
            </div>
            <h2 className='d-flex justify-content-center'>Start a New Tree!</h2>
            <MemberStart
              handleSubmit={handleSubmit}
              handleFirstName={handleFirstName}
              handleLastName={handleLastName}
              handleBirthday={handleBirthday}
              handleValue={handleValue}
              firstName={firstName}
              lastName={lastName}
              birthday={birthday}
            />
          </motion.div>
        }
        { members &&
          members.map((member, index) => {
            return (
              <div key={index} className='family__container'>
                <MemberChildren
                  key={member.id+index}
                  member={member}
                  index={index}
                  handleSubmit={handleSubmit}
                  handleFirstName={handleFirstName}
                  handleLastName={handleLastName}
                  handleBirthday={handleBirthday}
                  handleValue={handleValue}
                  handleDeleteMember={handleDeleteMember}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                  addMemberId={addMemberId}
                  value={value}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default MemberCard;
