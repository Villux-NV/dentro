import { useEffect, useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import './member.css';
import CardMenu from './card-menu';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembers () {
      await fetch('http://localhost:3500/membertree')
      .then(res => res.json())
      .then(data => setMembers([data]));
    }

    getMembers();
  }, []);

  return (
    <div>
      { 
        members.map((member) => {
          return (
            <motion.div className='memberchildren-container'>
              <MemberChildren key={member.id} member={member} />
            </motion.div>
          )
        })
      }
    </div>
  )

}

const MemberChildren = ({ member, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const nestedMembers = (member.Children || []).map((member, index) => {
    return (
      <AnimatePresence>
        <MemberChildren
          key={member.id}
          member={member}
          index={index}
          type='child'
        /> 
      </AnimatePresence>
    )
  })

  return (
    <motion.div className='memberchildren-groups'>
        <motion.div layout className='memberchildren-children'>
          <motion.div layout initial={{ borderRadius: 25 }} className='memberchildren-each'>
            <motion.div layout className='memberchildren-avatar'/>
            <motion.div layout className='memberchildren-names'>{index} { member.firstName } { member.lastName }</motion.div>
          </motion.div>
          <CardMenu />
        { nestedMembers }
      </motion.div>
    </motion.div>
  )
}

export default Members;

// style={{ 'marginLeft': '25px', 'marginTop': '10px' }}