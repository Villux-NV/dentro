import { useContext, useState } from 'react';

import './member.css';
import MemberStart from './member-start-card';
import MemberChildren from './member-card-children';
import { AuthContext } from './auth';

const MemberCard = ({ members, getMembers, familyNameId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  const [memberId, setMemberId] = useState('');
  const [value, setValue] = useState('');

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

  const handleMemberId = (id) => {
    setMemberId(id);
  };

  const handleValue = (val) => {
    setValue(val);
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
      fetch(`http://localhost:3500/create/child/${memberId}/${userId}`, initPost)
        .then(res => res.json())
        .then(data => getMembers());
    } else if (value === 'Parent') {
      fetch(`http://localhost:3500/create/parent/${memberId}/${userId}`, initPost)
        .then(res => res.json())
        .then(data => getMembers());
    } else if (value === 'Edit') {
      fetch(`http://localhost:3500/edit/${memberId}`, initPut)
        .then(res => res.json())
        .then(data => getMembers());
    } else if (value === 'Start') {
      fetch(`http://localhost:3500/create/${userId}`, initPost)
        .then(res => res.json())
        .then(data => getMembers());
    }

    setFirstName('');
    setLastName('');
    setBirthday('');
  };

  const handleDelete = (e) => {
    fetch(`http://localhost:3500/delete/${memberId}`, { method: 'DELETE'})
      .then(res => res.json())
      .then(() => getMembers());
  };

  return (
    <div>
      <div>
        { !members &&
          <div>
            <h2 className='d-flex justify-content-center'>Start Your Tree!</h2> 
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
          </div>
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
                  handleDelete={handleDelete}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                  addMemberId={handleMemberId.bind(this)}
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
