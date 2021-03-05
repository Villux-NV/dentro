import { useEffect, useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import './member.css';

const MemberCard = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembers () {
      await fetch('http://localhost:3500/members')
      .then(res => res.json())
      .then(data => setMembers(data));
    }

    getMembers();
  }, []);

  return (
    <AnimateSharedLayout>
      <motion.ul layout initial={{ borderRadius: 25 }}>
        { members.map((member) =>
            <Member key={member.id} firstName={member.firstName} lastName={member.lastName} />
          )
        }
      </motion.ul>
    </AnimateSharedLayout>
  )
};

function Member ({ key, firstName, lastName}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <motion.div className='avatar' layout />
      <AnimatePresence>
        { isOpen &&
            <MemberContent
              key={key}
              firstName={firstName}
              lastName={lastName}
            />
        }
      </AnimatePresence>
    </motion.li>
  )
};

function MemberContent ({ firstName, lastName }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='row'>
        <h3>{ firstName }</h3>
        <h3>{ lastName }</h3>
      </div>
    </motion.div>
  )
};

export default MemberCard;