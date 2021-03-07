import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import './member.css';
import MemberChildren from './member-card-children';

const Members = () => {
  const [members, setMembers] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [memberId, setMemberId] = useState('');

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
  }
  
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleMemberId = (id) => {
    setMemberId(id);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName })
    }

    fetch(`http://localhost:3500/create/${memberId}`, init)
      .then(res => res.json())
      .then(data => setMembers(members.concat(data)));

    setFirstName('');
    setLastName('');
  }

  const handleDelete = (e) => {
    // e.preventDefault();

    console.log('Deleted!');

    const init = {
      method: 'DELETE',
    }

    fetch(`http://localhost:3500/delete/${memberId}`, init)
      .then(res => res.json())
      .then(() => setMembers(members.filter(member => member.id !== memberId)));
  }

  return (
    <div>
      { 
        members.map((member, index) => {
          return (
            <motion.div key={index} className='family__container'>
              <MemberChildren
                key={member.id+index}
                member={member}
                index={index}
                onSubmit={onSubmit}
                handleChangeFirstName={handleChangeFirstName}
                handleChangeLastName={handleChangeLastName}
                firstName={firstName}
                lastName={lastName}
                addMemberId={handleMemberId.bind(this)}
                handleDelete={handleDelete}
              />
            </motion.div>
          )
        })
      }
    </div>
  )
}

export default Members;

// style={{ 'marginLeft': '25px', 'marginTop': '10px' }}