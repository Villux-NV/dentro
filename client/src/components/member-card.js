import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import './member.css';
import MemberChildren from './member-card-children';

const Members = () => {
  const [members, setMembers] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [memberId, setMemberId] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    async function getMembers () {
      await fetch('http://localhost:3500/membertree')
      .then(res => res.json())
      .then(data => setMembers([data]));
    }

    getMembers();
  }, []);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
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
      body: JSON.stringify({ firstName, lastName })
    }

    const initPut = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName })
    }

    if (value === 'Child') {
      fetch(`http://localhost:3500/create/child/${memberId}`, initPost)
        .then(res => res.json())
        .then(data => setMembers(members.concat(data)));
    } else if (value === 'Parent') {
      fetch(`http://localhost:3500/create/parent/${memberId}`, initPost)
        .then(res => res.json())
        .then(data => setMembers(members.concat(data)));
    } else {
      fetch(`http://localhost:3500/edit/${memberId}`, initPut)
        .then(res => res.json())
        .then(data => members.filter((member) => member.id === data.id).concat(data));
    }

    setFirstName('');
    setLastName('');
  };

  const handleDelete = (e) => {
    // e.preventDefault();

    fetch(`http://localhost:3500/delete/${memberId}`, { method: 'DELETE'})
      .then(res => res.json())
      .then(() => setMembers(members.filter(member => member.id !== memberId)));
  };

  return (
    <div>
      { 
        members.map((member, index) => {
          return (
            <div key={index} className='family__container'>
              <MemberChildren
                key={member.id+index}
                member={member}
                index={index}
                handleSubmit={handleSubmit}
                handleChangeFirstName={handleChangeFirstName}
                handleChangeLastName={handleChangeLastName}
                handleValue={handleValue}
                handleDelete={handleDelete}
                firstName={firstName}
                lastName={lastName}
                addMemberId={handleMemberId.bind(this)}
                value={value}
              />
            </div>
          )
        })
      }
    </div>
  )
};

export default Members;
